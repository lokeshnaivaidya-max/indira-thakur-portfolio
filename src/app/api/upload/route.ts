import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { uploadFile, deleteFile } from '@/lib/supabase-storage';
import { connectToDatabase } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 60;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

// Diagnostic: check Supabase connection
export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'NOT_SET';
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

    const { getSupabase } = await import('@/lib/supabase');
    const supabase = getSupabase();

    // Test 1: list buckets via direct API (avoids SDK path issues)
    const baseUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
    const bucketRes = await fetch(`${baseUrl}/storage/v1/bucket`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    const buckets = bucketRes.ok ? await bucketRes.json() : [];
    const bucketNames = (Array.isArray(buckets) ? buckets : []).map((b: any) => b.name);

    // Try to create the images bucket if missing
    let created = false;
    let createErr: string | null = null;
    if (!bucketNames.includes('images')) {
      // Try with service role key first
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
      const authHeader = serviceKey ? `Bearer ${serviceKey}` : `Bearer ${anonKey}`;
      const createRes = await fetch(`${baseUrl}/storage/v1/bucket`, {
        method: 'POST',
        headers: { apikey: anonKey, Authorization: authHeader, 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 'images', name: 'images', public: true }),
      });
      created = createRes.ok;
      if (!createRes.ok) {
        const text = await createRes.text();
        // Try with SQL via PostgREST
        createErr = text.slice(0, 200);
      }
    }

    const info = {
      supabaseUrl: baseUrl,
      anonKeySet: anonKey.length > 0,
      serviceKeySet: serviceKey.length > 0,
      buckets: bucketNames,
      bucketCreated: created,
      bucketCreateError: createErr,
    };
    return NextResponse.json(info);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = requireAuth(request);
    if (!user) return jsonError('Unauthorized', 401);

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file) return jsonError('No file provided', 400);

    const folder = (formData.get('folder') as string) || 'gallery';
    const category = (formData.get('category') as string) || '';
    const title = (formData.get('title') as string) || '';
    const alt = (formData.get('alt') as string) || '';
    const width = parseInt((formData.get('width') as string) || '0') || 1200;
    const height = parseInt((formData.get('height') as string) || '0') || 1600;
    const featured = formData.get('featured') === 'true';
    const order = parseInt((formData.get('order') as string) || '0') || 0;

    const result = await uploadFile(file, folder);

    await connectToDatabase();
    const GalleryImage = (await import('@/models/GalleryImage')).default;
    const item = await GalleryImage.create({
      src: result.url,
      publicId: result.publicId,
      alt: alt || title || '',
      title: title || '',
      description: (formData.get('description') as string) || '',
      width,
      height,
      category: category || '',
      featured,
      order,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return jsonError(`Upload failed: ${error.message || 'Unknown error'}`, 500);
  }
}

export async function DELETE(request: Request) {
  try {
    let user;
    try {
      user = requireAuth(request);
    } catch {
      return jsonError('You must be logged in to delete images', 401);
    }
    if (!user) {
      return jsonError('You must be logged in to delete images', 401);
    }

    const { searchParams } = new URL(request.url);
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return jsonError('No file identifier provided', 400);
    }

    await deleteFile(publicId);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return jsonError(`Delete failed: ${error.message || 'Unknown error'}`, 500);
  }
}
