import Hero from '@/components/sections/Hero';
import FAQ from '@/components/sections/FAQ';
import GoogleContact from '@/components/sections/GoogleContact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Indira Thakur Photography — professional newborn, maternity, portrait, and event photography in Mumbai, India.',
  openGraph: {
    title: 'Indira Thakur Photography | Capturing Life\'s Precious Moments',
    description: 'Professional photographer specializing in newborn, maternity, portrait, and event photography. Based in Mumbai, India.',
    url: 'https://indirathakurphotography.com',
  },
};

export default function Home() {
  console.log('[Home] render');
  return (
    <>
      <Hero />
      <FAQ />
      <GoogleContact />
    </>
  );
}
