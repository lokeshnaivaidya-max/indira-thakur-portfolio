import ContactSection from '@/components/sections/Contact';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Indira Thakur Photography. Book your session today.',
  openGraph: {
    title: 'Contact | Indira Thakur Photography',
    description: 'Get in touch with Indira Thakur Photography. Book your session today.',
    url: 'https://indirathakurphotography.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <ContactSection />
    </div>
  );
}
