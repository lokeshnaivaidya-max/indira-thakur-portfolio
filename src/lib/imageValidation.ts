export type ImageType = 'hero' | 'logo' | 'favicon' | 'gallery' | 'general';

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

export function validateHeroImage(aspectRatio: number): {
  valid: boolean;
  warning: string | null;
} {
  if (aspectRatio < 0.75 || aspectRatio > 1.5) {
    return { valid: true, warning: null };
  }

  return {
    valid: true,
    warning:
      'This image appears to be a logo or square image. Hero backgrounds work best with landscape photographs.',
  };
}

export function getImageTypeAccept(type: ImageType): string {
  switch (type) {
    case 'hero':
      return 'image/jpeg,image/png,image/webp';
    case 'logo':
      return 'image/jpeg,image/png,image/webp,image/svg+xml';
    case 'favicon':
      return 'image/jpeg,image/png,image/webp,image/svg+xml,image/x-icon';
    case 'gallery':
      return 'image/jpeg,image/png,image/webp,image/gif';
    case 'general':
      return 'image/jpeg,image/png,image/webp,image/gif';
  }
}
