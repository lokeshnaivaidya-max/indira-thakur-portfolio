export interface TransformOptions {
  width?: number;
  height?: number;
  crop?: 'fill' | 'fit' | 'scale' | 'pad' | 'thumb';
  gravity?: 'auto' | 'center' | 'face' | 'faces';
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  dpr?: 'auto' | number;
}

const CLOUD_NAME = typeof process !== 'undefined' ? process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || '' : '';

const DEFAULT_THUMBNAIL: TransformOptions = {
  width: 400,
  height: 500,
  crop: 'fill',
  gravity: 'auto',
  quality: 'auto',
  format: 'auto',
  dpr: 'auto',
};

export function buildCloudinaryUrl(publicId: string, opts: TransformOptions = {}): string {
  if (!publicId || !CLOUD_NAME) return '';
  const { width, height, crop, gravity, quality, format, dpr } = { ...DEFAULT_THUMBNAIL, ...opts };
  const parts: string[] = [];
  if (width) parts.push(`w_${width}`);
  if (height) parts.push(`h_${height}`);
  if (crop) parts.push(`c_${crop}`);
  if (gravity) parts.push(`g_${gravity}`);
  if (quality) parts.push(`q_${quality}`);
  if (format) parts.push(`f_${format}`);
  if (dpr) parts.push(`dpr_${dpr}`);
  const segment = parts.length > 0 ? `${parts.join(',')}/` : '';
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${segment}${publicId}`;
}

export function getThumbnailUrl(src: string, publicId?: string): string {
  if (publicId && CLOUD_NAME) {
    return buildCloudinaryUrl(publicId);
  }
  if (src?.includes('res.cloudinary.com') && src.includes('/upload/')) {
    const parts = src.split('/upload/');
    if (parts.length === 2) {
      return `${parts[0]}/upload/f_auto,q_auto,c_fill,g_auto,w_400,h_500,dpr_auto/${parts[1].split('/').slice(1).join('/')}`;
    }
  }
  return src || '';
}

export function getPreviewUrl(src: string, publicId?: string, maxWidth = 1200): string {
  if (publicId) {
    return buildCloudinaryUrl(publicId, { width: maxWidth, quality: 'auto', format: 'auto' });
  }
  return src;
}
