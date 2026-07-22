import { upload } from '@vercel/blob/client';
import { MAX_IMAGE_UPLOAD_SIZE, MAX_IMAGE_UPLOAD_SIZE_MB, IMAGE_UPLOAD_ERROR } from '@/lib/uploadConstants';
import { compressImage, CLOUDINARY_UPLOAD_LIMIT } from '@/lib/compressImage';

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

  let uploadFile = file;
  let compressed = false;
  if (file.size > CLOUDINARY_UPLOAD_LIMIT) {
    try {
      const result = await compressImage(file, { quality: 0.85, maxWidth: 3840, outputType: 'image/jpeg' });
      if (result.compressedSize < file.size) {
        uploadFile = result.file;
        compressed = true;
      }
    } catch {
      // compression failed — upload original and let Cloudinary reject if needed
    }
  }

  // 1. Fetch server configuration and signature/token
  let configResponse: Response;
  try {
    configResponse = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        action: 'prepare',
        folder,
        filename: file.name,
        fileType: file.type,
      }),
    });
  } catch (netErr) {
    throw new Error('Network error connecting to the server. Please check your internet connection.');
  }

  if (!configResponse.ok) {
    let errMsg = 'Failed to initialize upload';
    try {
      const errJSON = await configResponse.json();
      errMsg = errJSON.error || errMsg;
    } catch {
      if (configResponse.status === 413) {
        errMsg = 'Request is too large for the server (413).';
      } else {
        errMsg = `Server error ${configResponse.status}`;
      }
    }
    throw new Error(errMsg);
  }

  const config = await configResponse.json();

  if (config.provider === 'cloudinary') {
    // Direct signed upload to Cloudinary using XMLHttpRequest for real progress tracking
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();

      formData.append('file', uploadFile);
      formData.append('api_key', config.apiKey);
      formData.append('timestamp', String(config.timestamp));
      formData.append('signature', config.signature);
      formData.append('folder', config.folder);

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      });

      xhr.addEventListener('load', () => {
        let responseJson: any;
        try {
          responseJson = JSON.parse(xhr.responseText);
        } catch {
          reject(new Error(`Cloudinary returned an invalid response (${xhr.status}).`));
          return;
        }

        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            url: responseJson.secure_url,
            publicId: responseJson.public_id,
            width: responseJson.width,
            height: responseJson.height,
          });
        } else {
          const rawMsg = responseJson.error?.message || '';
          if (rawMsg.toLowerCase().includes('file size too large') || rawMsg.toLowerCase().includes('maximum upload')) {
            reject(new Error(`The image is too large for Cloudinary's plan limit (max 10 MB). ${compressed ? 'Compression was applied but could not reduce the file enough.' : 'Automatic compression was skipped. Please try a smaller image.'} If you need higher limits, upgrade your Cloudinary account.`));
          } else {
            reject(new Error(rawMsg || `Upload failed with status ${xhr.status}.`));
          }
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload to cloud storage.'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload was cancelled.'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${config.cloudName}/image/upload`);
      xhr.send(formData);
    });
  } else if (config.provider === 'vercel-blob') {
    // Direct upload to Vercel Blob
    try {
      const blob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/upload',
        onUploadProgress: (progressEvent) => {
          if (onProgress) {
            onProgress(progressEvent.percentage);
          }
        },
      });
      return {
        url: blob.url,
        publicId: blob.pathname,
      };
    } catch (err: any) {
      throw new Error(err.message || 'Upload to Vercel Blob failed.');
    }
  } else {
    throw new Error('No cloud storage configuration found on the server.');
  }
}
