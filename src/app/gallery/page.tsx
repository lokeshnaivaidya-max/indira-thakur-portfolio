import type { Metadata } from 'next';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Explore the photography portfolio of Indira Thakur — newborn, maternity, portrait, and event photography.',
  openGraph: {
    title: 'Gallery | Indira Thakur Photography',
    description: 'Explore the photography portfolio of Indira Thakur — newborn, maternity, portrait, and event photography.',
    url: 'https://indirathakurphotography.com/gallery',
  },
};

export default function GalleryPage() {
  console.log('[GalleryPage] render');
  return <GalleryClient />;
}
