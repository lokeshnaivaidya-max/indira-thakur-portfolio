import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { requireAuth } from '@/lib/auth';
import { getSupabase } from '@/lib/supabase';
import { deleteFile, getPublicUrl } from '@/lib/supabase-storage';

export const dynamic = 'force-dynamic';

const BUCKET = 'images';

export async function GET(request: Request) {
  try {
    const user = requireAuth(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const folder = searchParams.get('folder') || 'uploads';

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

    const supabase0 = getSupabase();
    const { data: storageFiles, error } = await supabase0.storage
      .from(BUCKET)
      .list(folder, { limit: 200, sortBy: { column: 'created_at', order: 'desc' } });

    if (!error && storageFiles) {
      for (const item of storageFiles) {
        const path = `${folder}/${item.name}`;
        const url = getPublicUrl(path);
        if (!fileMap.has(url)) {
          fileMap.set(url, {
            id: path,
            url,
            publicId: path,
            filename: item.name,
            originalName: item.name,
            size: item.metadata?.size || 0,
            type: item.metadata?.mimetype || 'application/octet-stream',
            folder,
            createdAt: item.created_at,
            updatedAt: item.updated_at,
          });
        }
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

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const folder = (formData.get('folder') as string) || 'uploads';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const path = `${folder}/${timestamp}-${safeName}`;

    const supabase1 = getSupabase();
    const { data, error } = await supabase1.storage
      .from(BUCKET)
      .upload(path, file, { cacheControl: '3600', upsert: false });

    if (error) {
      return NextResponse.json({ error: `Upload failed: ${error.message}` }, { status: 500 });
    }

    const url = getPublicUrl(data.path);

    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    await FileRecord.create({
      url,
      publicId: data.path,
      filename: safeName,
      originalName: file.name,
      size: file.size,
      type: file.type,
      folder,
    });

    return NextResponse.json({
      url,
      publicId: data.path,
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
    const publicId = searchParams.get('publicId');

    if (!publicId) {
      return NextResponse.json({ error: 'Missing file identifier' }, { status: 400 });
    }

    await deleteFile(publicId);

    await connectToDatabase();
    const FileRecord = (await import('@/models/FileRecord')).default;
    await FileRecord.deleteOne({ publicId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('File delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}
