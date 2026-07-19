import TestimonialsSection from '@/components/sections/Testimonials';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Testimonials',
  description: 'Read what families say about their photography experience with Indira Thakur.',
};

export default function TestimonialsPage() {
  return (
    <div className="pt-16">
      <TestimonialsSection />
    </div>
  );
}
