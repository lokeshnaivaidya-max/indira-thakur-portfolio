import { NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
export const maxDuration = 30;

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE = 15 * 1024 * 1024;

function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  try {
    let user;
    try {
      user = requireAuth(request);
    } catch {
      return jsonError('You must be logged in to upload images', 401);
    }
    if (!user) {
      return jsonError('You must be logged in to upload images', 401);
    }

    let formData: FormData;
    try {
      formData = await request.formData();
    } catch (formDataError: any) {
      const msg = formDataError?.message || '';
      if (msg.includes('Entity') || msg.includes('too large') || msg.includes('413')) {
        return jsonError(
          'The image file is too large for the server. Please use a smaller image or compress it before uploading.',
          413
        );
      }
      return jsonError(
        `Could not read the upload data: ${msg || 'unknown error'}. Please try again with a smaller file.`,
        400
      );
    }

    const file = formData.get('file') as File | null;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file || !(file instanceof File)) {
      return jsonError('No file was selected. Please choose an image to upload.', 400);
    }

    if (!file.type.startsWith('image/')) {
      return jsonError(
        `Invalid file type "${file.type}". Please upload an image (JPEG, PNG, WebP, or GIF).`,
        400
      );
    }

    if (file.size > MAX_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      return jsonError(
        `File is too large (${sizeMB} MB). Maximum upload size is 15 MB.`,
        400
      );
    }

    if (file.size === 0) {
      return jsonError('The uploaded file is empty. Please select a valid image.', 400);
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isImage = IMAGE_TYPES.includes(file.type);

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
        return jsonError(
          `Cloud upload failed: ${cloudinaryError.message || 'Unknown error'}. Please try again.`,
          500
        );
      }
    }

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
        return jsonError(
          `Cloud upload failed: ${blobError.message || 'Unknown error'}. Please try again.`,
          500
        );
      }
    }

    return jsonError(
      'No cloud storage is configured. Please set CLOUDINARY_CLOUD_NAME or BLOB_READ_WRITE_TOKEN in your environment variables.',
      500
    );
  } catch (error: any) {
    console.error('Upload error:', error);
    return jsonError(
      `Upload failed: ${error.message || 'An unexpected error occurred'}. Please try again.`,
      500
    );
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
    const url = searchParams.get('url');
    const publicId = searchParams.get('publicId');
    const isImage = searchParams.get('isImage') === 'true';

    if (!url && !publicId) {
      return jsonError('No file identifier provided', 400);
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
    return jsonError(`Delete failed: ${error.message || 'Unknown error'}`, 500);
  }
}
