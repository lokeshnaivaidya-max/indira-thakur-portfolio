import { NextRequest, NextResponse } from 'next/server';
import { getAuthUser } from '@/lib/auth';
import { connectToDatabase } from '@/lib/mongodb';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

const BUCKET = 'images';
const BATCH_SIZE = 3;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

function isAuthorized(request: NextRequest): boolean {
  // Regular auth via cookie
  const user = getAuthUser(request);
  if (user) return true;
  // Fallback: migration key passed as header or query param
  const migrationKey = process.env.MIGRATION_KEY || '';
  const headerKey = request.headers.get('x-migration-key') || '';
  const queryKey = request.nextUrl.searchParams.get('key') || '';
  const headerMatch = migrationKey && headerKey === migrationKey;
  const queryMatch = migrationKey && queryKey === migrationKey;
  console.log('[Migrate auth] hasMigrationKey:', !!migrationKey, 'headerMatch:', headerMatch, 'queryMatch:', queryMatch);
  return headerMatch || queryMatch;
}

// ── Status endpoint ────────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    if (!isAuthorized(request)) return jsonError('Unauthorized', 401);

    await connectToDatabase();
    const GalleryImage = (await import('@/models/GalleryImage')).default;

    const all = await GalleryImage.find({}, 'src').lean();
    const total = all.length;
    const cloudinary = all.filter((d: any) => (d.src || '').includes('res.cloudinary.com')).length;
    const supabase = all.filter((d: any) => (d.src || '').includes('supabase') || (d.src || '').includes('storage')).length;
    const unknown = total - cloudinary - supabase;

    return NextResponse.json({ total, cloudinary, supabase, unknown });
  } catch (error: any) {
    console.error('Migration status error:', error);
    return jsonError(error.message || 'Failed to check migration status', 500);
  }
}

// ── Migration endpoint (processes BATCH_SIZE images per call) ────────────

export async function POST(request: NextRequest) {
  try {
    if (!isAuthorized(request)) return jsonError('Unauthorized', 401);

    await connectToDatabase();
    const GalleryImage = (await import('@/models/GalleryImage')).default;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !supabaseKey) {
      return jsonError('Supabase not configured', 500);
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Find next batch of Cloudinary records
    const toMigrate = await GalleryImage.find({
      src: /res\.cloudinary\.com/,
    })
      .sort({ order: 1, createdAt: -1 })
      .limit(BATCH_SIZE)
      .lean();

    if (toMigrate.length === 0) {
      return NextResponse.json({ done: true, message: 'All images migrated' });
    }

    const results: Array<{ id: string; status: string; error?: string }> = [];

    for (const doc of toMigrate as any[]) {
      const id = String(doc._id);
      const originalSrc: string = doc.src || '';

      try {
        console.log(`[Migrate ${id.slice(-6)}] Downloading: ${originalSrc.substring(0, 80)}...`);

        // Download from Cloudinary
        const response = await fetch(originalSrc, { signal: AbortSignal.timeout(30_000) });
        if (!response.ok) throw new Error(`Download failed: ${response.status}`);
        const buffer = await response.arrayBuffer();

        // Sanitize filename
        const parts = originalSrc.split('/');
        const rawName = parts[parts.length - 1]?.split('?')[0] || 'image.jpg';
        const ext = rawName.split('.').pop() || 'jpg';
        const base = rawName.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60);
        const path = `gallery/${Date.now()}-${base}.${ext}`;

        console.log(`[Migrate ${id.slice(-6)}] Uploading to Supabase...`);

        // Upload to Supabase
        const blob = new Blob([buffer], { type: 'image/jpeg' });
        const { data, error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(path, blob, { cacheControl: '3600', upsert: false, contentType: 'image/jpeg' });

        if (uploadError) throw new Error(`Supabase upload: ${uploadError.message}`);

        const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
        const newUrl: string = urlData.publicUrl;

        console.log(`[Migrate ${id.slice(-6)}] Verifying...`);

        // Verify
        const verifyRes = await fetch(newUrl, { method: 'HEAD', signal: AbortSignal.timeout(10_000) });
        if (!verifyRes.ok) throw new Error('Verification failed — URL not accessible');

        console.log(`[Migrate ${id.slice(-6)}] Updating MongoDB...`);

        // Update MongoDB
        await GalleryImage.findByIdAndUpdate(id, { src: newUrl, publicId: data.path });

        results.push({ id, status: 'success' });
        console.log(`[Migrate ${id.slice(-6)}] SUCCESS`);
      } catch (err: any) {
        console.error(`[Migrate ${id.slice(-6)}] FAILED: ${err.message}`);
        results.push({ id, status: 'failed', error: err.message });
      }
    }

    // Check if done
    const remaining = await GalleryImage.countDocuments({ src: /res\.cloudinary\.com/ });

    return NextResponse.json({
      done: remaining === 0,
      processed: results.length,
      succeeded: results.filter((r) => r.status === 'success').length,
      failed: results.filter((r) => r.status === 'failed').length,
      remaining,
      results,
    });
  } catch (error: any) {
    console.error('Migration error:', error);
    return jsonError(error.message || 'Migration failed', 500);
  }
}
