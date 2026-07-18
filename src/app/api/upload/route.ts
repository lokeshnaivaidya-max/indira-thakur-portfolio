import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

export async function POST(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File type not allowed' }, { status: 400 });
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isImage = IMAGE_TYPES.includes(file.type);

    if (isImage && process.env.CLOUDINARY_CLOUD_NAME) {
      const { uploadImageBuffer } = await import('@/lib/cloudinary');
      const result = await uploadImageBuffer(buffer, `indira-thakur/${folder}`);
      return NextResponse.json({
        url: result.url,
        publicId: result.publicId,
        filename: file.name,
        size: file.size,
        type: file.type,
      });
    }

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const { put } = await import('@vercel/blob');
      const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
      const blob = await put(filename, buffer, {
        access: 'public',
        addRandomSuffix: true,
      });
      return NextResponse.json({
        url: blob.url,
        publicId: blob.pathname,
        filename: file.name,
        size: file.size,
        type: file.type,
      });
    }

    return NextResponse.json({ error: 'No upload provider configured. Set CLOUDINARY or BLOB_READ_WRITE_TOKEN.' }, { status: 500 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const publicId = searchParams.get('publicId');
    const isImage = searchParams.get('isImage') === 'true';

    if (!url && !publicId) {
      return NextResponse.json({ error: 'Missing file identifier' }, { status: 400 });
    }

    if (isImage && publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      const { deleteImage } = await import('@/lib/cloudinary');
      await deleteImage(publicId);
    } else if (!isImage && url && process.env.BLOB_READ_WRITE_TOKEN) {
      const { del } = await import('@vercel/blob');
      await del(url);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
