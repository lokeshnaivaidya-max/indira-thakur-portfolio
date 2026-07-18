import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to upload images' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file was selected. Please choose an image to upload.' }, { status: 400 });
    }

    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: `Invalid file type "${file.type}". Please upload an image (JPEG, PNG, WebP, or GIF).` },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return NextResponse.json(
        { error: `File is too large (${sizeMB} MB). Maximum allowed size is 10 MB.` },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isImage = IMAGE_TYPES.includes(file.type);

    // Try Cloudinary first
    if (isImage && process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
      try {
        const { uploadImageBuffer } = await import('@/lib/cloudinary');
        const result = await uploadImageBuffer(buffer, `indira-thakur/${folder}`);
        return NextResponse.json({
          url: result.url,
          publicId: result.publicId,
          filename: file.name,
          size: file.size,
          type: file.type,
          width: result.width,
          height: result.height,
        });
      } catch (cloudinaryError: any) {
        console.error('Cloudinary upload error:', cloudinaryError);
        return NextResponse.json(
          { error: `Cloud upload failed: ${cloudinaryError.message || 'Unknown error'}. Please try again.` },
          { status: 500 }
        );
      }
    }

    // Try Vercel Blob second
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
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
      } catch (blobError: any) {
        console.error('Vercel Blob upload error:', blobError);
        return NextResponse.json(
          { error: `Cloud upload failed: ${blobError.message || 'Unknown error'}. Please try again.` },
          { status: 500 }
        );
      }
    }

    // No upload provider configured
    return NextResponse.json(
      {
        error: 'No cloud storage is configured. Please set CLOUDINARY_CLOUD_NAME or BLOB_READ_WRITE_TOKEN in your environment variables.',
        details: {
          hasCloudinary: !!(process.env.CLOUDINARY_CLOUD_NAME),
          hasBlob: !!(process.env.BLOB_READ_WRITE_TOKEN),
        }
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: `Upload failed: ${error.message || 'An unexpected error occurred'}. Please try again.` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'You must be logged in to delete images' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const publicId = searchParams.get('publicId');
    const isImage = searchParams.get('isImage') === 'true';

    if (!url && !publicId) {
      return NextResponse.json({ error: 'No file identifier provided' }, { status: 400 });
    }

    if (isImage && publicId && process.env.CLOUDINARY_CLOUD_NAME) {
      const { deleteImage } = await import('@/lib/cloudinary');
      await deleteImage(publicId);
    } else if (!isImage && url && process.env.BLOB_READ_WRITE_TOKEN) {
      const { del } = await import('@vercel/blob');
      await del(url);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: `Delete failed: ${error.message || 'Unknown error'}` }, { status: 500 });
  }
}
