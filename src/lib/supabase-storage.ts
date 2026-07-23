const BUCKET = 'images';

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  return raw.replace(/\/rest\/v1\/?$/, '').replace(/\/+$/, '');
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
  const baseUrl = getBaseUrl();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!baseUrl || !anonKey) throw new Error('Supabase not configured');

  const filename = sanitizeFilename(file.name);
  const path = `${folder}/${filename}`;
  const url = `${baseUrl}/storage/v1/object/${BUCKET}/${path}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Upload failed: ${text.slice(0, 300)}`);
  }

  return {
    url: `${baseUrl}/storage/v1/object/public/${BUCKET}/${path}`,
    publicId: path,
  };
}

export async function deleteFile(publicId: string): Promise<void> {
  const baseUrl = getBaseUrl();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
  if (!baseUrl || !anonKey) return;

  const res = await fetch(`${baseUrl}/storage/v1/object/${BUCKET}`, {
    method: 'DELETE',
    headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ prefixes: [publicId] }),
  });
  if (!res.ok) console.error('[deleteFile] FAILED', await res.text());
}

export function getPublicUrl(path: string): string {
  return `${getBaseUrl()}/storage/v1/object/public/${BUCKET}/${path}`;
}
