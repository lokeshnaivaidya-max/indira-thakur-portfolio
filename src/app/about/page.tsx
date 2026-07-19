import AboutSection from '@/components/sections/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Indira Thakur — passionate storyteller and professional photographer specializing in newborn, maternity, and family photography.',
  openGraph: {
    title: 'About | Indira Thakur Photography',
    description: 'Meet Indira Thakur — passionate storyteller and professional photographer specializing in newborn, maternity, and family photography.',
    url: 'https://indirathakurphotography.com/about',
  },
};

export default function AboutPage() {
  console.log('[AboutPage] render');
  return (
    <div className="pt-16">
      <AboutSection />
    </div>
  );
}
