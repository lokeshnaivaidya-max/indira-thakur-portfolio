'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function ServicesPageClient() {
  const { config } = useSiteConfig();

  const servicesData = config?.services || {
    eyebrow: 'What I Offer',
    heading: 'Services',
    services: [
      { title: 'Newborn Photography', subtitle: '01', description: '', gradient: 'from-[#1A1110] via-[#2C1810] to-[#1A1A1A]', image: { url: '', alt: '' } },
      { title: 'Maternity Photography', subtitle: '02', description: '', gradient: 'from-[#2C1810] via-[#3D2C25] to-[#1A1110]', image: { url: '', alt: '' } },
      { title: 'Portrait Photography', subtitle: '03', description: '', gradient: 'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]', image: { url: '', alt: '' } },
      { title: 'Events & Brand Collaborations', subtitle: '04', description: '', gradient: 'from-[#3D2C25] via-[#2C1810] to-[#2C2C2C]', image: { url: '', alt: '' } },
    ],
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <div className="pt-36 pb-20">
      <div className="container-editorial mb-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <span className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.3em]">{servicesData.eyebrow}</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-3">{servicesData.heading}</h1>
        </motion.div>
      </div>

      <div className="space-y-1">
        {servicesData.services?.map((service: any, i: number) => {
          const isLast = i === (servicesData.services?.length || 4) - 1;
          return (
            <motion.div
              key={service.title || i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {i % 2 === 0 ? (
                <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
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
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 via-transparent to-black/30" />
                    </div>
                  )}
                  <div className="absolute bottom-12 md:bottom-20 left-8 md:left-16 lg:left-24 max-w-lg">
                    <p className="font-mono text-[11px] text-white/40 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-2 leading-[1.05]">{service.title}</h2>
                    {service.description && (
                      <p className="font-sans text-sm text-white/60 mt-4 leading-relaxed max-w-md">{service.description}</p>
                    )}
                    <Link href="/contact" className="min-h-[44px] inline-flex items-center gap-2 mt-6 font-sans text-[11px] text-white/60 uppercase tracking-[0.2em] hover:text-white transition-colors">
                      <span className="w-4 h-px bg-white/30" />Enquire
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className={`h-[40vh] lg:h-[65vh] ${hasImage(service.image?.url) ? '' : `bg-gradient-to-br ${service.gradient}`}`}>
                    {hasImage(service.image?.url) && (
                      <PolaroidImage
                        src={service.image.url}
                        alt={service.image.alt || service.title}
                        fill
                        sizes="100vw"
                        className="!w-full !h-full"
                        containerClassName="!w-full !h-full"
                      />
                    )}
                  </div>
                  <div className="flex items-center px-8 md:px-16 py-12 lg:py-0">
                    <div className="max-w-sm">
                      <p className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                      <h2 className="font-serif text-3xl md:text-4xl text-rich-black mt-2">{service.title}</h2>
                      <div className="w-6 h-px bg-magenta/25 mt-5" />
                      {service.description && (
                        <p className="font-sans text-sm text-warm-gray/60 mt-5 leading-relaxed">{service.description}</p>
                      )}
                      <Link href="/contact" className="min-h-[44px] inline-flex items-center gap-2 mt-6 font-sans text-[11px] text-magenta/60 uppercase tracking-[0.2em] hover:text-magenta transition-colors">
                        <span className="w-4 h-px bg-magenta/25" />Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
