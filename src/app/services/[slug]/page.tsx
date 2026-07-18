'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import { HiArrowLeft } from 'react-icons/hi2';

const servicesData: Record<string, { title: string; description: string; heroGradient: string }> = {};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="pt-20 md:pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-warm-black mb-4">Service details coming soon</h1>
          <Link href="/#services" className="text-muted-gold underline font-sans-alt">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 md:pt-24">
      <section className={`py-16 md:py-24 bg-gradient-to-br ${service.heroGradient}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <Link href="/#services" className="inline-flex items-center gap-2 text-warm-brown/60 hover:text-warm-black font-sans-alt text-sm transition-colors mb-6">
            <HiArrowLeft className="w-4 h-4" /> Back to Services
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-warm-black leading-tight">{service.title}</h1>
          <p className="mt-4 max-w-2xl text-warm-brown/80 font-sans-alt text-lg">{service.description}</p>
          <div className="mt-8"><Button href="/#contact">Book This Session</Button></div>
        </div>
      </section>
    </div>
  );
}
