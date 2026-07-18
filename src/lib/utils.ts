import { type ClassValue } from 'react';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
}

export function getImageUrl(path: string, options?: { width?: number; height?: number; quality?: number }): string {
  if (!path) return '/placeholder.svg';
  if (path.startsWith('http')) return path;
  return path;
}

export function shimmerBlurDataUrl(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWYwZWIiLz48L3N2Zz4=';
}

export function generateMetadata(title: string, description: string, image?: string) {
  return {
    title: `${title} | Indira Thakur Photography`,
    description,
    openGraph: {
      title: `${title} | Indira Thakur Photography`,
      description,
      images: image ? [{ url: image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Indira Thakur Photography`,
      description,
      images: image ? [image] : [],
    },
  };
}
