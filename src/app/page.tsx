import HeroEditorial from '@/components/sections/HeroEditorial';
import EditorialAbout from '@/components/sections/EditorialAbout';
import EditorialGallery from '@/components/sections/EditorialGallery';
import EditorialServices from '@/components/sections/EditorialServices';
import EditorialTestimonials from '@/components/sections/EditorialTestimonials';
import EditorialFAQ from '@/components/sections/EditorialFAQ';
import EditorialContact from '@/components/sections/EditorialContact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indira Thakur Photography | Fine Art & Editorial Photography',
  description: 'Indira Thakur Photography — Luxury newborn, maternity, portrait, and event storytelling in Bangalore.',
  openGraph: {
    title: 'Indira Thakur Photography | Fine Art & Editorial',
    description: 'Specializing in newborn, maternity, portrait, and family storytelling in Bangalore.',
    url: 'https://indirathakurphotography.com',
  },
};

export default function Home() {
  return (
    <>
      <HeroEditorial />
      <EditorialAbout />
      <EditorialGallery isPreview />
      <EditorialServices />
      <EditorialTestimonials />
      <EditorialFAQ />
      <EditorialContact />
    </>
  );
}
