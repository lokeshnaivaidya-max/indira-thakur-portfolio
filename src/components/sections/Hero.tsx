'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function Hero() {
  const { config } = useSiteConfig();

  const hero = config?.home || {
    heading: 'Every Frame',
    headingItalic: 'Tells a Story',
    categories: ['Newborn', 'Maternity', 'Portrait', 'Events'],
    ctaText: 'Book Now',
    ctaLink: '/#contact',
    secondaryCtaText: 'Portfolio',
    secondaryCtaLink: '/gallery',
    backgroundGradient: '',
    images: {
      heroMain: { url: '', alt: '' },
      heroSecondary: { url: '', alt: '' },
      background: { url: '', alt: '' },
    },
  };

  const bgUrl = hero.images?.heroMain?.url || hero.images?.background?.url || '';
  const bgAlt = hero.images?.heroMain?.alt || hero.images?.background?.alt || '';

  return (
    <section className="relative h-screen w-full overflow-hidden bg-rich-black -mt-20 pt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        {bgUrl ? (
          <PolaroidImage
            src={bgUrl}
            alt={bgAlt}
            fill
            objectFit="cover"
            priority
            sizes="100vw"
            className="!w-full !h-full"
            containerClassName="!w-full !h-full !absolute !inset-0"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{
              background: hero.backgroundGradient || 'linear-gradient(135deg, #1A1110 0%, #2C1810 40%, #111111 100%)',
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/30 to-rich-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-rich-black/60 via-transparent to-rich-black/20" />
      </div>

      {/* Top bar: photographer name + categories */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute top-0 left-0 right-0 z-20 flex items-start justify-between px-8 md:px-16 lg:px-24 pt-8 md:pt-12"
      >
        <span className="font-serif text-base md:text-lg text-white/80 italic tracking-wide">
          {config?.home?.tagline || 'Indira Thakur'}
        </span>

        <div className="hidden md:block text-right">
          <p className="font-mono text-[8px] text-white/25 uppercase tracking-[0.4em] leading-[2.2]">
            {(hero.categories || []).map((cat, i) => (
              <span key={i}>
                {cat}
                {i < (hero.categories || []).length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </motion.div>

      {/* Bottom content: heading + CTAs */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-8 md:px-16 lg:px-24 pb-12 md:pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] text-white leading-[1.02] tracking-tight max-w-4xl"
        >
          {hero.heading}
          <br />
          <span className="italic font-normal text-white/45">{hero.headingItalic}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <Link
            href={hero.ctaLink || '/#contact'}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-rich-black font-sans text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-700 hover:bg-ivory"
          >
            {hero.ctaText || 'Book Now'}
          </Link>
          <Link
            href={hero.secondaryCtaLink || '/gallery'}
            className="group inline-flex items-center gap-3 font-sans text-[10px] text-white/35 uppercase tracking-[0.25em] hover:text-white/70 transition-colors duration-500"
          >
            <span className="w-4 h-px bg-white/20 group-hover:w-7 transition-all duration-500" />
            {hero.secondaryCtaText || 'Portfolio'}
          </Link>
        </motion.div>
      </div>

      {/* Mobile categories */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-12 right-8 md:hidden z-20"
      >
        <p className="font-mono text-[7px] text-white/20 uppercase tracking-[0.35em] leading-[2] text-right">
          {(hero.categories || []).join(' · ')}
        </p>
      </motion.div>
    </section>
  );
}
