'use client';

import Link from 'next/link';
import Footer from '@/components/layout/Footer';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiArrowRight } from 'react-icons/hi2';

const allServices = [
  { title: 'Newborn Photography', slug: 'newborn', gradient: 'from-soft-rose to-warm-blush', description: 'Gentle, artistic newborn photography capturing the precious first days of your little one.' },
  { title: 'Maternity Photography', slug: 'maternity', gradient: 'from-warm-blush to-cream', description: 'Elegant maternity sessions celebrating the beauty and glow of motherhood.' },
  { title: 'Portrait Photography', slug: 'portrait', gradient: 'from-cream to-beige', description: 'Timeless portraits that capture your unique personality and natural beauty.' },
  { title: 'Personal Events', slug: 'events', gradient: 'from-warm-cream to-beige', description: 'Cinematic coverage of your most cherished personal celebrations.' },
  { title: 'Corporate Events', slug: 'corporate', gradient: 'from-cream to-warm-cream', description: 'Professional event photography that elevates your brand presence.' },
  { title: 'Brand Collaborations', slug: 'brand', gradient: 'from-warm-beige to-cream', description: 'Creative visual content that tells your brand\'s unique story.' },
];

export default function ServicesPage() {
  return (
    <>
      <div className="pt-24 md:pt-32 section-padding">
        <SectionHeading
          subtitle="What I Offer"
          title="All Services"
          description="Every session is a unique experience designed to capture your most cherished moments."
        />
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {allServices.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group block">
              <div className={`aspect-4-3 rounded-sm bg-gradient-to-br ${s.gradient} mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="font-serif text-2xl text-warm-black group-hover:text-muted-gold transition-colors duration-500">{s.title}</h3>
              <p className="mt-2 text-earth-brown/70 font-sans-alt text-sm leading-relaxed">{s.description}</p>
              <span className="inline-flex items-center gap-2 mt-4 text-muted-gold font-sans-alt text-xs tracking-[0.15em] uppercase">
                Learn More <HiArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
