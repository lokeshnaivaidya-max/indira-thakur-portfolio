import FAQSection from '@/components/sections/FAQ';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about photography sessions with Indira Thakur.',
};

export default function FAQPage() {
  return (
    <div className="pt-16">
      <FAQSection />
    </div>
  );
}
