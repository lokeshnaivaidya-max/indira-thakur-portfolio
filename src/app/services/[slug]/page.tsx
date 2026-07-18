'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HiArrowLeft } from 'react-icons/hi2';

const servicesData: Record<string, { title: string; description: string; heroGradient: string; details: string[] }> = {};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Coming Soon</span>
            <h1 className="font-serif text-3xl md:text-4xl text-rich-black mt-4">This service page is being crafted</h1>
            <p className="font-sans text-sm text-warm-gray/50 mt-4 max-w-md mx-auto">Each service is a unique experience. We&apos;re putting the finishing touches on this one.</p>
            <Link href="/#services" className="inline-flex items-center gap-2 mt-8 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
              <HiArrowLeft className="w-3 h-3" /> Back to Services
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-40">
      <section className={`min-h-[60vh] bg-gradient-to-br ${service.heroGradient} flex items-center`}>
        <div className="container-editorial w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link href="/#services" className="inline-flex items-center gap-2 text-white/40 hover:text-white font-sans text-[10px] tracking-[0.2em] uppercase transition-colors duration-500 mb-8">
              <HiArrowLeft className="w-3 h-3" /> All Services
            </Link>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white max-w-3xl leading-[1.1]">{service.title}</h1>
            <p className="font-sans text-base md:text-lg text-white/50 mt-6 max-w-2xl leading-relaxed">{service.description}</p>
            <a href="/#contact" className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden mt-10">
              <span className="absolute inset-0 bg-white transition-all duration-700 ease-out group-hover:bg-white/90" />
              <span className="relative font-sans text-[11px] text-rich-black uppercase tracking-[0.2em] font-medium">Book This Session</span>
            </a>
          </motion.div>
        </div>
      </section>

      {service.details && service.details.length > 0 && (
        <section className="py-32 md:py-40">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto">
              <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">The Experience</span>
              <h2 className="font-serif text-3xl md:text-4xl text-rich-black mt-4">What to Expect</h2>
              <div className="w-8 h-px bg-magenta/25 mt-8" />
              <ul className="mt-10 space-y-6">
                {service.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="flex gap-4 items-start"
                  >
                    <span className="font-mono text-[9px] text-magenta/30 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <p className="font-sans text-sm text-warm-gray/60 leading-relaxed">{detail}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
