import EditorialGallery from '@/components/sections/EditorialGallery';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio Gallery | Indira Thakur Photography',
  description: 'Explore the fine art collection of newborn, maternity, portrait, and event photography.',
};

export default function GalleryPage() {
  return (
    <div className="pt-24 bg-[#FAF6F3]">
      <EditorialGallery />
    </div>
  );
}
