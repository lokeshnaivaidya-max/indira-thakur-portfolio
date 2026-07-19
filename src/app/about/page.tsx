import AboutSection from '@/components/sections/About';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Meet Indira Thakur — passionate storyteller and professional photographer specializing in newborn, maternity, and family photography.',
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      <AboutSection />
    </div>
  );
}
