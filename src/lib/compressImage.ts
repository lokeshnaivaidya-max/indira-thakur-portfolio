export interface CompressOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  outputType?: 'image/jpeg' | 'image/webp' | 'image/png';
}

export interface CompressResult {
  blob: Blob;
  file: File;
  originalSize: number;
  compressedSize: number;
  width: number;
  height: number;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<CompressResult> {
  const {
    maxWidth = 1920,
    maxHeight = 1080,
    quality = 0.82,
    outputType = 'image/jpeg',
  } = options;

  const url = URL.createObjectURL(file);
  try {
    const img = await loadImage(url);
    let { width, height } = img;

    if (width > maxWidth || height > maxHeight) {
      const ratio = Math.min(maxWidth / width, maxHeight / height);
      width = Math.round(width * ratio);
      height = Math.round(height * ratio);
    }

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d')!;
    ctx.drawImage(img, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (b) => {
          if (b) resolve(b);
          else reject(new Error('Canvas toBlob failed'));
        },
        outputType,
        quality
      );
    });

    const ext = outputType.split('/')[1];
    const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, `.${ext}`), {
      type: outputType,
      lastModified: Date.now(),
    });

    return {
      blob,
      file: compressedFile,
      originalSize: file.size,
      compressedSize: blob.size,
      width,
      height,
    };
  } finally {
    URL.revokeObjectURL(url);
  }
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

export function getCompressionRecommendation(fileSize: number): {
  shouldCompress: boolean;
  targetQuality: number;
  targetMaxWidth: number;
} {
  if (fileSize < 500 * 1024) {
    return { shouldCompress: false, targetQuality: 0.85, targetMaxWidth: 1920 };
  }
  if (fileSize < 1.5 * 1024 * 1024) {
    return { shouldCompress: true, targetQuality: 0.8, targetMaxWidth: 1600 };
  }
  if (fileSize < 3 * 1024 * 1024) {
    return { shouldCompress: true, targetQuality: 0.72, targetMaxWidth: 1280 };
  }
  return { shouldCompress: true, targetQuality: 0.65, targetMaxWidth: 1024 };
}
