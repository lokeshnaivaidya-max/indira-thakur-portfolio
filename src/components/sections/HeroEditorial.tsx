'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function HeroEditorial() {
  const { config } = useSiteConfig();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [layoutMode, setLayoutMode] = useState<'split' | 'full'>('split');

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
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [images.length, nextSlide]);

  const currentImg = images.length > 0 ? images[currentIndex] : null;

  return (
    <section className="relative min-h-screen w-full bg-[#1C1817] text-white overflow-hidden pt-20 lg:pt-0">
      {/* Dynamic Layout: Adaptive Split vs Full Canvas */}
      {layoutMode === 'split' ? (
        <div className="relative w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-stretch">
          {/* LEFT COLUMN: Editorial Typography & Actions (Safe Safe-Zone, No Photo Overlap) */}
          <div className="w-full lg:w-[42%] xl:w-[38%] flex flex-col justify-between p-6 sm:p-10 lg:p-12 xl:p-16 lg:pt-32 z-20 bg-[#1C1817] border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
            <div className="space-y-6">
              {/* Eyebrow Tagline */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <span className="w-6 h-px bg-[#C39E96]" />
                <p className="font-mono text-[10px] text-[#C39E96] uppercase tracking-[0.35em] font-medium">
                  {heroData.tagline}
                </p>
              </motion.div>

              {/* Main Headline */}
              <motion.h1
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl text-white leading-[1.08] tracking-tight"
              >
                {heroData.heading}
                <br />
                <span className="italic font-normal text-white/50 block mt-1">
                  {heroData.headingItalic}
                </span>
              </motion.h1>

              {/* Category Tags */}
              {heroData.categories && heroData.categories.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                  className="flex flex-wrap items-center gap-2 pt-2"
                >
                  {heroData.categories.map((cat: string) => (
                    <span
                      key={cat}
                      className="inline-flex items-center gap-1.5 font-mono text-[9px] text-white/80 uppercase tracking-[0.25em] bg-white/5 px-3 py-1 rounded-full border border-white/10"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#C39E96]" />
                      {cat}
                    </span>
                  ))}
                </motion.div>
              )}
            </div>

            {/* CTAs & Controls */}
            <div className="mt-8 lg:mt-12 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href={heroData.ctaLink || '/contact'}
                  className="group inline-flex items-center justify-center px-8 py-3.5 bg-white text-[#2B2625] font-sans text-[11px] uppercase tracking-[0.2em] font-semibold transition-all duration-300 hover:bg-[#FAF6F3] shadow-md"
                >
                  <span>{heroData.ctaText}</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
                <Link
                  href={heroData.secondaryCtaLink || '/gallery'}
                  className="group inline-flex items-center gap-2 py-3 font-sans text-[11px] text-white/70 uppercase tracking-[0.2em] hover:text-white transition-colors duration-300"
                >
                  <span className="w-5 h-px bg-white/30 group-hover:w-8 transition-all duration-300" />
                  <span>{heroData.secondaryCtaText}</span>
                </Link>
              </motion.div>

              {/* Carousel Navigation Dots */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                {images.length > 1 ? (
                  <div className="flex items-center gap-2.5">
                    {images.map((_: any, i: number) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className="h-8 flex items-center gap-1.5 group cursor-pointer"
                        aria-label={`Go to photo ${i + 1}`}
                      >
                        <span
                          className="h-1 rounded-full transition-all duration-300"
                          style={{
                            width: i === currentIndex ? 24 : 8,
                            backgroundColor: i === currentIndex ? '#C39E96' : 'rgba(255,255,255,0.2)',
                          }}
                        />
                      </button>
                    ))}
                    <span className="font-mono text-[10px] text-white/40 uppercase ml-2">
                      0{currentIndex + 1} / 0{images.length}
                    </span>
                  </div>
                ) : (
                  <div />
                )}

                {/* Viewport View Toggle */}
                <button
                  onClick={() => setLayoutMode(prev => prev === 'split' ? 'full' : 'split')}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors px-2 py-1 rounded border border-white/10"
                  title="Toggle Layout View"
                >
                  {layoutMode === 'split' ? 'Full Frame Photo' : 'Split Editorial'}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Dedicated Photograph Showcase (100% Unblocked Subject View) */}
          <div className="w-full lg:w-[58%] xl:w-[62%] h-[60vh] sm:h-[70vh] lg:h-full relative bg-[#151211] overflow-hidden flex items-center justify-center">
            {currentImg ? (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                >
                  {/* Soft Blurred Ambient Backdrop for non-standard aspect ratios */}
                  <img
                    src={currentImg.url}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110 pointer-events-none"
                  />
                  
                  {/* Crisp Uncropped Photograph Center View */}
                  <img
                    src={currentImg.url}
                    alt={currentImg.alt || 'Indira Thakur Fine Art Photography'}
                    referrerPolicy="no-referrer"
                    loading="eager"
                    decoding="async"
                    className="relative z-10 w-full h-full object-contain p-2 md:p-6 lg:p-8"
                  />

                  {/* Gentle Frame Edges */}
                  <div className="absolute inset-0 z-20 pointer-events-none border border-white/5" />
                </motion.div>
              </AnimatePresence>
            ) : (
              /* Studio Fallback Frame when no images uploaded in CMS */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center bg-[#181413]">
                <div className="w-24 h-24 rounded-full border border-[#C39E96]/20 flex items-center justify-center mb-4">
                  <span className="font-serif text-2xl text-[#C39E96]/60 italic">IT</span>
                </div>
                <p className="font-mono text-xs text-white/40 uppercase tracking-[0.25em]">
                  Indira Thakur Photography Studio
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* FULL CANVAS MODE: Floating Safe Docked Editorial Card */
        <div className="relative h-screen w-full flex items-center justify-center bg-[#151211]">
          {currentImg && (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full flex items-center justify-center"
              >
                <img
                  src={currentImg.url}
                  alt={currentImg.alt || 'Indira Thakur Photography'}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain p-4 md:p-12"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {/* Floating Docked Safe Card at Bottom Left */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-lg z-30 bg-[#1C1817]/85 backdrop-blur-xl p-6 sm:p-8 rounded-xl border border-white/10 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] text-[#C39E96] uppercase tracking-[0.3em]">
                {heroData.tagline}
              </span>
              <button
                onClick={() => setLayoutMode('split')}
                className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/50 hover:text-white"
              >
                Split View ✕
              </button>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl text-white leading-tight">
              {heroData.heading} <span className="italic text-white/60 font-normal">{heroData.headingItalic}</span>
            </h2>
            <div className="flex items-center gap-4 pt-2">
              <Link
                href={heroData.ctaLink || '/contact'}
                className="px-6 py-2.5 bg-white text-[#2B2625] font-sans text-[10px] uppercase tracking-[0.2em] font-semibold hover:bg-[#FAF6F3]"
              >
                {heroData.ctaText}
              </Link>
              <Link
                href={heroData.secondaryCtaLink || '/gallery'}
                className="text-white/70 hover:text-white font-sans text-[10px] uppercase tracking-[0.2em]"
              >
                {heroData.secondaryCtaText}
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
