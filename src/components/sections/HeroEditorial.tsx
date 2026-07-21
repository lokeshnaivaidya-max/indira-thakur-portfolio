'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function HeroEditorial() {
  const { config } = useSiteConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  const homeConfig = config?.home || (config as any)?.hero;

  const heroData = {
    tagline: homeConfig?.tagline || 'INDIRA THAKUR · FINE ART PHOTOGRAPHY',
    heading: homeConfig?.heading || 'CAPTURING LIFE IN ITS',
    headingItalic: homeConfig?.headingItalic || 'Purest Emotion',
    categories: homeConfig?.categories?.length
      ? homeConfig.categories
      : ['Newborn', 'Maternity', 'Family & Legacy', 'Fine Art Portraits'],
    ctaText: homeConfig?.ctaText || 'Commission Session',
    ctaLink: homeConfig?.ctaLink || '/contact',
    secondaryCtaText: homeConfig?.secondaryCtaText || 'Explore Portfolio',
    secondaryCtaLink: homeConfig?.secondaryCtaLink || '/gallery',
  };

  const rawImages = homeConfig?.heroImages;
  const images = Array.isArray(rawImages)
    ? rawImages.filter((img: any) => img && typeof img.url === 'string' && img.url.trim().length > 0)
    : [];

  const nextSlide = useCallback(() => {
    if (images.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [images.length, nextSlide]);

  const currentImg = images.length > 0 ? images[currentIndex] : null;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1C1817] text-white">
      {/* Background Layer: CMS Photos or Clean Luxury Fallback */}
      <div className="absolute inset-0 z-0 bg-[#1C1817]">
        {currentImg ? (
          <AnimatePresence mode="popLayout">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center bg-[#1C1817]"
            >
              {/* Performant Full Uncropped Photograph */}
              <img
                src={currentImg.url}
                alt={currentImg.alt || 'Indira Thakur Photography'}
                referrerPolicy="no-referrer"
                loading="eager"
                decoding="async"
                className="relative z-10 w-full h-full object-contain object-center"
              />
              {/* Subtle Luxury Gradient Overlays */}
              <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#1C1817]/95 via-[#1C1817]/30 to-[#1C1817]/40 pointer-events-none" />
              <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#1C1817]/70 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        ) : (
          /* Luxury Fallback Frame when no images uploaded in CMS */
          <div className="absolute inset-0 w-full h-full bg-[#1C1817] flex items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(195,158,150,0.12)_0%,transparent_70%)] pointer-events-none" />
            <div className="w-72 h-72 rounded-full border border-white/5 flex items-center justify-center opacity-30 animate-pulse pointer-events-none">
              <span className="font-serif text-3xl italic text-white/40">IT</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1817] via-transparent to-[#1C1817]/60 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Hero Content Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between px-6 sm:px-12 lg:px-24 pt-32 pb-12 md:pb-20 max-w-[1500px] mx-auto w-full pointer-events-none">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <span className="w-8 h-px bg-white/40" />
          <p className="font-mono text-[11px] text-white/80 uppercase tracking-[0.35em] font-medium">
            {heroData.tagline}
          </p>
        </motion.div>

        {/* Main Title & CTAs */}
        <div className="max-w-4xl pointer-events-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] text-white leading-[1.02] tracking-tight"
          >
            {heroData.heading}
            <br />
            <span className="italic font-normal text-white/50">
              {heroData.headingItalic}
            </span>
          </motion.h1>

          {/* Categories */}
          {heroData.categories && heroData.categories.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3"
            >
              {heroData.categories.map((cat: string) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-2 font-mono text-[10px] text-white/90 uppercase tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C39E96]" />
                  {cat}
                </span>
              ))}
            </motion.div>
          )}

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              href={heroData.ctaLink || '/contact'}
              className="group relative inline-flex items-center justify-center px-9 py-4 bg-white text-[#2B2625] font-sans text-[11px] uppercase tracking-[0.25em] font-semibold transition-all duration-300 hover:bg-[#FAF6F3] shadow-lg hover:shadow-xl"
            >
              <span>{heroData.ctaText}</span>
              <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
            <Link
              href={heroData.secondaryCtaLink || '/gallery'}
              className="group inline-flex items-center gap-3 py-3 font-sans text-[11px] text-white/80 uppercase tracking-[0.25em] hover:text-white transition-colors duration-300"
            >
              <span className="w-6 h-px bg-white/30 group-hover:w-10 transition-all duration-300" />
              <span>{heroData.secondaryCtaText}</span>
            </Link>
          </motion.div>
        </div>

        {/* Carousel Slide Indicators */}
        <div className="flex items-center justify-between pointer-events-auto pt-4">
          {images.length > 1 ? (
            <div className="flex items-center gap-3">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="h-11 flex items-center gap-2 group cursor-pointer"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span
                    className="h-1 rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: i === currentIndex ? 32 : 12,
                      backgroundColor: i === currentIndex ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                    }}
                  />
                  <span className="font-mono text-[9px] text-white/40 uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </section>
  );
}
