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

    // Test 1: list buckets
    const { data: buckets, error: bucketErr } = await supabase.storage.listBuckets();
    const bucketNames = buckets?.map((b: any) => b.name) || [];

    // Test 2: list files in images bucket
    const { data: files, error: listErr } = await supabase.storage
      .from('images')
      .list('gallery');

    const info = {
      supabaseUrl,
      anonKeySet: anonKey.length > 0,
      anonKeyPrefix: anonKey.substring(0, 15),
      serviceKeySet: serviceKey.length > 0,
      serviceKeyPrefix: serviceKey.substring(0, 15),
      buckets: bucketNames,
      bucketListError: bucketErr?.message || null,
      galleryFiles: files?.length || 0,
      listError: listErr?.message || null,
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
