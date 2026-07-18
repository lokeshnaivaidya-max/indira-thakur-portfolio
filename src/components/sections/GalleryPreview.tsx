'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function GalleryPreview() {
  const { config } = useSiteConfig();

  const gp = config?.galleryPreview || {
    eyebrow: 'Portfolio',
    heading: 'Featured Work',
    featuredImages: [],
    ctaText: 'View Full Gallery',
    ctaLink: '/gallery',
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  const defaultGradients = [
    'from-amber-50/70 via-cream to-rose-50/30',
    'from-cream via-beige/30 to-amber-50/40',
    'from-rose-50/30 via-cream to-amber-50/50',
    'from-cream via-amber-50/30 to-beige/20',
  ];

  const images = (gp.featuredImages || []).length > 0
    ? gp.featuredImages
    : [
        { url: '', alt: '' },
        { url: '', alt: '' },
        { url: '', alt: '' },
        { url: '', alt: '' },
      ];

  const heights = ['h-[60vh] md:h-[75vh]', 'h-[35vh] md:h-[45vh]', 'h-[35vh] md:h-[45vh]', 'h-[50vh] md:h-[60vh]'];
  const sizes = ['full', 'half', 'half', 'full'];

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="container-editorial mb-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">{gp.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">{gp.heading}</h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          {images.map((img: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
              className={`${sizes[i] === 'full' ? 'w-full' : 'w-full md:w-[calc(50%-8px)] inline-block'} ${heights[i] || 'h-[40vh]'}`}
            >
              {hasImage(img.url) ? (
                <img
                  src={img.url}
                  alt={img.alt || `Featured ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${defaultGradients[i % defaultGradients.length]}`} />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href={gp.ctaLink || '/gallery'}
          className="inline-flex items-center gap-3 group"
        >
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-700" />
          <span className="font-sans text-[9px] text-magenta/50 uppercase tracking-[0.3em] group-hover:text-magenta transition-colors duration-500">
            {gp.ctaText || 'View Full Gallery'}
          </span>
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-700" />
        </Link>
      </div>
    </section>
  );
}
