export type ImageType = 'hero' | 'logo' | 'favicon' | 'gallery' | 'general' | 'about' | 'services' | 'testimonials' | 'contact';

export interface ImageSpec {
  label: string;
  aspectRatio: string;
  recommendedResolution: string;
  accept: string;
  maxSizeMB: number;
}

export const IMAGE_SPECS: Record<string, ImageSpec> = {
  hero: {
    label: 'Hero Banner',
    aspectRatio: '16:9',
    recommendedResolution: '1920 × 1080 px (or higher)',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  about: {
    label: 'About Section',
    aspectRatio: '4:5',
    recommendedResolution: '1200 × 1500 px',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  services: {
    label: 'Services',
    aspectRatio: '4:5',
    recommendedResolution: '1200 × 1500 px',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  gallery: {
    label: 'Gallery',
    aspectRatio: 'Flexible (4:5 portrait, 1:1 square, 3:2 landscape)',
    recommendedResolution: '1200 × 1500 px (portrait) / 1200 × 1200 px (square) / 1500 × 1000 px (landscape)',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  testimonials: {
    label: 'Testimonials',
    aspectRatio: '1:1',
    recommendedResolution: '1000 × 1000 px',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  contact: {
    label: 'Contact Section',
    aspectRatio: '4:5',
    recommendedResolution: '1200 × 1500 px',
    accept: 'image/jpeg,image/png,image/webp',
    maxSizeMB: 10,
  },
  logo: {
    label: 'Logo',
    aspectRatio: 'Flexible',
    recommendedResolution: 'Transparent PNG or SVG recommended',
    accept: 'image/jpeg,image/png,image/webp,image/svg+xml',
    maxSizeMB: 10,
  },
  favicon: {
    label: 'Favicon',
    aspectRatio: '1:1',
    recommendedResolution: 'Square image recommended',
    accept: 'image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon',
    maxSizeMB: 10,
  },
};

export const VIDEO_SPEC = {
  label: 'Film / Video',
  acceptedFormats: 'MP4 (H.264)',
  recommendedResolution: '1920 × 1080 (1080p)',
  aspectRatio: '16:9',
  frameRate: '24fps or 30fps',
  audio: 'AAC',
  recommendedDuration: '30 seconds – 3 minutes',
  maxDuration: '5 minutes',
  recommendedFileSize: '20 MB – 80 MB',
  maxFileSize: '150 MB',
  absoluteUploadLimit: '200 MB',
  accept: 'video/mp4',
  maxSizeMB: 200,
};

export const IMAGE_ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const VIDEO_ALLOWED_TYPES = ['video/mp4'];
export const IMAGE_MAX_SIZE = 10 * 1024 * 1024;
export const VIDEO_MAX_SIZE = 200 * 1024 * 1024;

export function getImageAspectRatio(file: File): Promise<number> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const ratio = img.width / img.height;
      URL.revokeObjectURL(url);
      resolve(ratio);
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image'));
    };
    img.src = url;
  });
}

export function validateImageFile(file: File): { valid: boolean; error: string | null } {
  if (!IMAGE_ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: `Unsupported file type: ${file.type || 'unknown'}. Allowed: JPG, PNG, WebP.` };
  }
  if (file.size > IMAGE_MAX_SIZE) {
    return { valid: false, error: `File too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum size is 10 MB.` };
  }
  return { valid: true, error: null };
}

export function validateVideoFile(file: File): { valid: boolean; error: string | null } {
  if (!VIDEO_ALLOWED_TYPES.includes(file.type)) {
    return { valid: false, error: `Unsupported file type: ${file.type || 'unknown'}. Only MP4 (H.264) is allowed.` };
  }
  if (file.size > VIDEO_MAX_SIZE) {
    return { valid: false, error: `File too large (${(file.size / (1024 * 1024)).toFixed(1)} MB). Maximum size is 200 MB.` };
  }
  return { valid: true, error: null };
}

export function getImageTypeAccept(type: ImageType): string {
  return IMAGE_SPECS[type]?.accept || IMAGE_SPECS.general.accept;
}

export function validateHeroImage(aspectRatio: number): { valid: boolean; warning: string | null } {
  if (aspectRatio < 0.75 || aspectRatio > 1.5) {
    return { valid: true, warning: null };
  }
  return {
    valid: true,
    warning: 'This image appears to be a logo or square image. Hero backgrounds work best with landscape photographs.',
  };
}
