'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
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

  const images = (gp.featuredImages || []).length > 0
    ? gp.featuredImages
    : [
        { url: '', alt: '' },
        { url: '', alt: '' },
        { url: '', alt: '' },
        { url: '', alt: '' },
      ];

  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="container-editorial mb-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">{gp.eyebrow}</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">{gp.heading}</h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto columns-2 md:columns-3 gap-4 space-y-4">
          {images.map((img: any, i: number) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.08 }}
              className="break-inside-avoid"
            >
              {hasImage(img.url) ? (
                <PolaroidImage
                  src={img.url}
                  alt={img.alt || `Featured ${i + 1}`}
                  fill
                  objectFit="cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="!w-full"
                  containerClassName="relative w-full"
                  style={{
                    aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/3' : '1/1',
                  }}
                />
              ) : (
                <ImagePlaceholder
                  aspect={
                    i % 3 === 0 ? 'aspect-[3/4]' : i % 3 === 1 ? 'aspect-[4/3]' : 'aspect-square'
                  }
                  label={`Featured ${i + 1}`}
                  icon={i % 2 === 0 ? 'camera' : 'portrait'}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href={gp.ctaLink || '/gallery'}
          className="group inline-flex items-center gap-3"
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
