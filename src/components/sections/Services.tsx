'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function Services() {
  const { config } = useSiteConfig();

  const servicesData = config?.services || {
    eyebrow: 'What I Offer',
    services: [
      { title: 'Newborn', subtitle: '01', description: '', gradient: 'from-[#1A1110] via-[#2C1810] to-[#1A1A1A]', image: { url: '', alt: '' } },
      { title: 'Maternity', subtitle: '02', description: '', gradient: 'from-[#2C1810] via-[#3D2C25] to-[#1A1110]', image: { url: '', alt: '' } },
      { title: 'Portrait & Events', subtitle: '03', description: '', gradient: 'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]', image: { url: '', alt: '' } },
    ],
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <section id="services" className="bg-rich-black">
      {servicesData.services?.map((service: any, i: number) => {
        const isLast = i === (servicesData.services?.length || 3) - 1;
        return (
          <motion.div
            key={service.title || i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="relative w-full border-t border-white/[0.03] first:border-t-0"
          >
            <div className="relative h-[70vh] md:h-[85vh]">
              {hasImage(service.image?.url) ? (
                <PolaroidImage
                  src={service.image.url}
                  alt={service.image.alt || service.title}
                  fill
                  sizes="100vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full !absolute !inset-0"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${service.gradient}`} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/40 via-transparent to-transparent" />
            </div>

            <div className={`absolute bottom-14 ${isLast ? 'right-8 md:right-16 lg:right-24 text-right' : 'left-8 md:left-16 lg:left-24'}`}>
              <p className="font-mono text-[8px] text-white/30 uppercase tracking-[0.35em]">{service.subtitle}</p>
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-1 leading-[1.05]">{service.title}</h3>
              {service.description && (
                <p className="font-sans text-sm text-white/40 mt-3 max-w-sm leading-relaxed">{service.description}</p>
              )}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mt-5 font-sans text-[9px] text-white/40 uppercase tracking-[0.3em] hover:text-white/70 transition-colors duration-500"
              >
                <span className="w-4 h-px bg-white/20" />
                Enquire
              </Link>
            </div>
          </motion.div>
        );
      })}
    </section>
  );
}
