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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">Coming Soon</p>
            <h1 className="heading-md mt-6">This service page is being crafted</h1>
            <p className="body-md mt-4 max-w-md mx-auto">Each service is a unique experience. We&apos;re putting the finishing touches on this one.</p>
            <Link
              href="/#services"
              className="btn-outline mt-10 inline-flex items-center gap-2"
            >
              <HiArrowLeft className="w-4 h-4" /> Back to Services
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36">
      <section className={`min-h-[60vh] bg-gradient-to-br ${service.heroGradient} flex items-center`}>
        <div className="container-editorial w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              href="/#services"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white font-sans text-xs tracking-[0.1em] uppercase transition-colors duration-500 mb-8"
            >
              <HiArrowLeft className="w-3 h-3" /> All Services
            </Link>
            <h1 className="heading-xl text-white max-w-3xl">{service.title}</h1>
            <p className="body-lg text-white/60 mt-6 max-w-2xl">{service.description}</p>
            <a
              href="/#contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-rich-black font-sans text-xs font-medium tracking-[0.15em] uppercase transition-all duration-700 hover:bg-white/90 mt-10"
            >
              Book This Session
            </a>
          </motion.div>
        </div>
      </section>

      {service.details && service.details.length > 0 && (
        <section className="section-spacing">
          <div className="container-editorial">
            <div className="max-w-3xl mx-auto">
              <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">The Experience</p>
              <h2 className="heading-md mt-6">What to Expect</h2>
              <div className="divider-line mt-8" />
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
                    <span className="font-mono text-[10px] text-magenta/40 mt-1">{String(i + 1).padStart(2, '0')}</span>
                    <p className="body-md text-warm-gray/70">{detail}</p>
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
