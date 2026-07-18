import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'uploads';

    let blobFiles: { blobs: Array<{ url: string; pathname: string; size: number; uploadedAt: Date }> } = { blobs: [] };

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { list } = await import('@vercel/blob');
        blobFiles = await list({ prefix: folder + '/' });
      } catch {
        blobFiles = { blobs: [] };
      }
    }

    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    const dbFiles = await FileRecord.find({ folder: new RegExp(`^${folder}`) }).sort({ createdAt: -1 }).lean();

    const fileMap = new Map<string, Record<string, unknown>>();

    for (const file of dbFiles) {
      fileMap.set(file.url, {
        _id: file._id.toString(),
        id: file._id.toString(),
        url: file.url,
        publicId: file.publicId,
        filename: file.filename,
        originalName: file.originalName,
        size: file.size,
        type: file.type,
        folder: file.folder,
        createdAt: file.createdAt,
        updatedAt: file.updatedAt,
      });
    }

    for (const blob of blobFiles.blobs) {
      if (!fileMap.has(blob.url)) {
        fileMap.set(blob.url, {
          id: blob.pathname,
          url: blob.url,
          publicId: blob.pathname,
          filename: blob.pathname.split('/').pop() || '',
          originalName: blob.pathname.split('/').pop() || '',
          size: blob.size,
          type: 'application/octet-stream',
          folder: folder,
          createdAt: blob.uploadedAt,
          updatedAt: blob.uploadedAt,
        });
      }
    }

    return NextResponse.json({ files: Array.from(fileMap.values()) });
  } catch (error) {
    console.error('Files list error:', error);
    return NextResponse.json({ error: 'Failed to list files' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json({ error: 'BLOB_READ_WRITE_TOKEN not configured' }, { status: 500 });
    }

    const { put } = await import('@vercel/blob');
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const filename = `${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const blob = await put(filename, buffer, {
      access: 'public',
      addRandomSuffix: true,
    });

    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    await FileRecord.create({
      url: blob.url,
      publicId: blob.pathname,
      filename: blob.pathname.split('/').pop(),
      originalName: file.name,
      size: file.size,
      type: file.type,
      folder: folder,
    });

    return NextResponse.json({
      url: blob.url,
      publicId: blob.pathname,
      filename: file.name,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    console.error('File upload error:', error);
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

    if (!url && !publicId) {
      return NextResponse.json({ error: 'Missing file identifier' }, { status: 400 });
    }

    if (url && process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { del } = await import('@vercel/blob');
        await del(url);
      } catch {
        // continue even if blob delete fails
      }
    }

    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    await FileRecord.deleteOne({ $or: [{ url }, { publicId }] });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('File delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
