import { getSupabaseAdmin } from '@/lib/supabase';

const BUCKET = 'images';

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

function sanitizeFilename(name: string): string {
  const timestamp = Date.now();
  const ext = name.split('.').pop() || 'jpg';
  const base = name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 60);
  return `${timestamp}-${base}.${ext}`;
}

export async function uploadFile(
  file: File,
  folder: string = 'gallery'
): Promise<UploadResult> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) {
    throw new Error('Supabase not configured');
  }

  const filename = sanitizeFilename(file.name);
  const path = `${folder}/${filename}`;
  const storageUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/${BUCKET}/${path}`;

  console.log(`[uploadFile] BUCKET=${BUCKET} path=${path} url=${storageUrl}`);

  const response = await fetch(storageUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!response.ok) {
    const text = await response.text();
    console.error(`[uploadFile] FAILED status=${response.status} body=${text}`);
    throw new Error(`Upload failed: ${text.slice(0, 200)}`);
  }

  const baseUrl = supabaseUrl.replace(/\/$/, '');
  const publicUrl = `${baseUrl}/storage/v1/object/public/${BUCKET}/${path}`;

  return {
    url: publicUrl,
    publicId: path,
  };
}

export async function deleteFile(publicId: string): Promise<void> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
  if (!supabaseUrl || !serviceKey) return;

  const storageUrl = `${supabaseUrl.replace(/\/$/, '')}/storage/v1/object/${BUCKET}`;

  const response = await fetch(storageUrl, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prefixes: [publicId] }),
  });

  if (!response.ok) {
    console.error('[deleteFile] FAILED', await response.text());
  }
}

export function getPublicUrl(path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const baseUrl = supabaseUrl.replace(/\/$/, '');
  return `${baseUrl}/storage/v1/object/public/${BUCKET}/${path}`;
}

export function isTransformUrl(url: string): boolean {
  return url.includes('/render/image/');
}

export function getOriginalUrl(transformUrl: string): string {
  return transformUrl.replace('/render/image/', '/object/').replace(/\?.*$/, '');
}
