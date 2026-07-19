'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi2';

const servicesData: Record<string, { title: string; description: string; heroGradient: string }> = {};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center px-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">Coming Soon</span>
            <h1 className="font-serif text-3xl md:text-4xl text-rich-black mt-4">This service page is being crafted</h1>
            <p className="font-sans text-sm text-warm-gray/50 mt-4">Each service is a unique experience. We&apos;re putting the finishing touches on this one.</p>
            <Link href="/services" className="inline-flex items-center gap-2 mt-8 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors">
              <HiArrowLeft className="w-3 h-3" /> Back to Services
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-0">
      <section className={`min-h-[80vh] bg-gradient-to-br ${service.heroGradient} flex items-end relative`}>
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 via-transparent to-black/30" />
        <div className="container-editorial relative z-10 pb-16 md:pb-24">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-sans text-[10px] tracking-[0.2em] uppercase transition-colors mb-8">
            <HiArrowLeft className="w-3 h-3" /> All Services
          </Link>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-[1.1]">{service.title}</h1>
          <p className="font-sans text-sm md:text-base text-white/50 mt-4 max-w-xl leading-relaxed">{service.description}</p>
          <a href="/contact" className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-rich-black font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:bg-white/90 mt-8">
            Book This Session
          </a>
        </div>
      </section>
    </div>
  );
}
