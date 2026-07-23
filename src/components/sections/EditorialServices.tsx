'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function EditorialServices() {
  const { config } = useSiteConfig();

  const servicesData: any = config?.services || {};
  const servicesList = servicesData.services && servicesData.services.length > 0
    ? servicesData.services
    : [];

  const hasImage = (url?: string) => url && url.trim() !== '';

  useEffect(() => {
    if (servicesList && servicesList.length > 0) {
      servicesList.forEach((s: any) => {
        if (s?.image?.url) {
          const preloader = new Image();
          preloader.src = s.image.url;
        }
      });
    }
  }, [servicesList]);

  if (!servicesList.length) return null;

  return (
    <section className="py-28 bg-white text-[#2B2625]">
      <div className="container-editorial mb-20 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {servicesData.eyebrow && (
            <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block font-medium">
              {servicesData.eyebrow}
            </span>
          )}
          {servicesData.heading && (
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B2625] leading-[1.05] mt-3">
              {servicesData.heading}
            </h2>
          )}
          <div className="w-8 h-px bg-[#C39E96]/30 mx-auto my-6" />
          {servicesData.description && (
            <p className="font-sans text-sm md:text-base text-[#7C706D] leading-relaxed">
              {servicesData.description}
            </p>
          )}
        </motion.div>
      </div>

      <div className="space-y-24 md:space-y-36 max-w-[1500px] mx-auto px-6 md:px-12">
        {servicesList.map((service: any, i: number) => {
          const isEven = i % 2 === 0;
          return (
            <div key={service.title || i}>
              {i > 0 && (
                <div className="flex items-center gap-4 mb-16 md:mb-24">
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C39E96]/20 to-transparent" />
                  <span className="font-mono text-[10px] text-[#C39E96]/40 uppercase tracking-[0.4em]">✦</span>
                  <span className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C39E96]/20 to-transparent" />
                </div>
              )}
              <motion.div
                initial={{ opacity: 0.95 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center p-10 md:p-16 bg-white border border-[#E7DDD2]/60 shadow-[0_10px_40px_rgba(0,0,0,0.02)] ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
              <div className={`lg:col-span-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="relative min-h-[380px] md:min-h-[520px] overflow-hidden rounded-sm group bg-[#FAF6F3]">
                  {hasImage(service.image?.url) ? (
                    <PolaroidImage
                      src={service.image.url}
                      alt={service.image.alt || service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      objectFit="contain"
                      className="!w-full !h-full transition-transform duration-1000 group-hover:scale-[1.02]"
                      containerClassName="!w-full !h-full"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${service.gradient || 'from-[#2C1810] to-[#1A1110]'} flex items-center justify-center p-8 relative`}>
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10 text-center">
                        <span className="font-serif text-5xl md:text-7xl text-white/20 block font-normal">
                          0{i + 1}
                        </span>
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/60 block mt-2">
                          Indira Thakur Portfolio
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className={`lg:col-span-6 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col justify-center`}>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-[#C39E96] uppercase tracking-[0.3em] font-medium">
                    0{i + 1} / Bespoke Feature
                  </span>
                  <span className="w-6 h-px bg-[#C39E96]/30" />
                </div>

                <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#2B2625] mt-3 leading-[1.1]">
                  {service.title}
                </h3>

                {service.tagline && (
                  <p className="font-serif italic text-lg text-[#7C706D] mt-2">
                    {service.tagline}
                  </p>
                )}

                <div className="w-8 h-px bg-[#C39E96]/30 my-5" />

                <p className="font-sans text-sm md:text-base text-[#7C706D] leading-relaxed">
                  {service.description || ''}
                </p>

                {service.features && service.features.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[#E7DDD2]">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#7C706D]/60 mb-3">
                      Experience Highlights
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-2 font-sans text-xs text-[#2B2625]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C39E96] flex-shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-8 flex items-center gap-6">
                  <Link
                    href={`/contact?service=${encodeURIComponent(service.title.toLowerCase())}`}
                    className="inline-flex items-center justify-center px-8 py-3.5 bg-[#2B2625] text-white font-sans text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#3D3534] transition-all duration-500 shadow-sm"
                  >
                    Inquire For Session
                  </Link>
                  <Link
                    href="/gallery"
                    className="font-sans text-[11px] text-[#C39E96] uppercase tracking-[0.25em] hover:text-[#2B2625] transition-colors"
                  >
                    View Works →
                  </Link>
                </div>
              </div>
            </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
