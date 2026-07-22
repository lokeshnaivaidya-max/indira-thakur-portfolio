import type { Metadata } from 'next';
import ServicesPageClient from '@/components/sections/ServicesPage';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional photography services by Indira Thakur — newborn, maternity, portrait, and event photography in Mumbai, India.',
  openGraph: {
    title: 'Services | Indira Thakur Photography',
    description: 'Newborn, maternity, portrait, and event photography services.',
  },
};

export default function ServicesPage() {
  console.log('[ServicesPage] render');
  return <ServicesPageClient />;
}
