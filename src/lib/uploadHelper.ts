import { MAX_IMAGE_UPLOAD_SIZE, MAX_IMAGE_UPLOAD_SIZE_MB } from '@/lib/uploadConstants';
import { uploadFile as uploadToSupabase } from '@/lib/supabase-storage';

export interface UploadProgressCallback {
  (progress: number): void;
}

export interface UploadResult {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
}

export async function uploadImageDirect(
  file: File,
  folder: string = 'gallery',
  onProgress?: UploadProgressCallback
): Promise<UploadResult> {
  if (file.size > MAX_IMAGE_UPLOAD_SIZE) {
    throw new Error(`File is too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum upload size is ${MAX_IMAGE_UPLOAD_SIZE_MB} MB.`);
  }

  const result = await uploadToSupabase(file, folder);

  if (onProgress) {
    onProgress(100);
  }

  return result;
}
