import { getSupabase } from '@/lib/supabase';

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
  folder: string = 'general'
): Promise<UploadResult> {
  const supabase = getSupabase();
  const filename = sanitizeFilename(file.name);
  const path = `${folder}/${filename}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  const { data: urlData } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(data.path);

  return {
    url: urlData.publicUrl,
    publicId: data.path,
  };
}

export async function deleteFile(publicId: string): Promise<void> {
  const supabase = getSupabase();
  const { error } = await supabase.storage
    .from(BUCKET)
    .remove([publicId]);

  if (error) {
    console.error('[Supabase] Delete error:', error.message);
  }
}

export function getPublicUrl(path: string): string {
  const supabase = getSupabase();
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path);
  return data.publicUrl;
}

export function getTransformUrl(path: string, width: number, quality: number = 80): string {
  const supabase = getSupabase();
  const { data } = supabase.storage
    .from(BUCKET)
    .getPublicUrl(path, {
      transform: {
        width,
        quality,
        resize: 'cover',
      },
    });
  return data.publicUrl;
}

export function isTransformUrl(url: string): boolean {
  return url.includes('/render/image/');
}

export function getOriginalUrl(transformUrl: string): string {
  return transformUrl.replace('/render/image/', '/object/').replace(/\?.*$/, '');
}
