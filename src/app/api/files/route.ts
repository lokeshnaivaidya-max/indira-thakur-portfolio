import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { put, list, del } from '@vercel/blob';

export async function GET(request: Request) {
  const user = requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'uploads';

    // List from Vercel Blob
    const blobFiles = await list({ prefix: folder + '/' });
    
    // For Cloudinary images, we'd need to list from Cloudinary API
    // For now, we'll also track files in MongoDB
    
    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    const dbFiles = await FileRecord.find({ folder: new RegExp(`^${folder}`) }).sort({ createdAt: -1 }).lean();

    // Combine and deduplicate
    const fileMap = new Map();
    
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
          type: (blob as any).contentType || 'application/octet-stream',
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
  const user = requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = formData.get('folder') as string || 'uploads';

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

    // Save to database
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
  const user = requireAuth(request);
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const publicId = searchParams.get('publicId');

    if (!url && !publicId) {
      return NextResponse.json({ error: 'Missing file identifier' }, { status: 400 });
    }

    if (url) {
      await del(url);
    }

    // Remove from database
    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    await FileRecord.deleteOne({ $or: [{ url }, { publicId }] });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('File delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}