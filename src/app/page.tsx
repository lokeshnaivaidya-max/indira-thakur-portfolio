import HeroEditorial from '@/components/sections/HeroEditorial';
import EditorialAbout from '@/components/sections/EditorialAbout';
import EditorialGallery from '@/components/sections/EditorialGallery';
import EditorialServices from '@/components/sections/EditorialServices';
import EditorialFilms from '@/components/sections/EditorialFilms';
import EditorialTestimonials from '@/components/sections/EditorialTestimonials';
import EditorialFAQ from '@/components/sections/EditorialFAQ';
import EditorialContact from '@/components/sections/EditorialContact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Indira Thakur Photography | Fine Art, Editorial & Films',
  description: 'Indira Thakur Photography — Luxury newborn, maternity, portrait, event storytelling, and films in Mumbai & Bangalore.',
  openGraph: {
    title: 'Indira Thakur Photography | Fine Art & Editorial Films',
    description: 'Specializing in newborn, maternity, portrait, family storytelling, and films.',
    url: 'https://indirathakurphotography.com',
  },
};

export default function Home() {
  return (
    <>
      <HeroEditorial />
      <div className="h-16 md:h-24" />
      <EditorialAbout />
      <div className="h-16 md:h-24" />
      <EditorialGallery isPreview />
      <div className="h-16 md:h-24" />
      <EditorialServices />
      <div className="h-16 md:h-24" />
      <EditorialFilms />
      <div className="h-16 md:h-24" />
      <EditorialTestimonials />
      <div className="h-16 md:h-24" />
      <EditorialFAQ />
      <div className="h-16 md:h-24" />
      <EditorialContact />
    </>
  );
}
