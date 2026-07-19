'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';

const kenBurnsKeyframes = `
@keyframes kb0 { from { transform: scale(1); } to { transform: scale(1.12); } }
@keyframes kb1 { from { transform: scale(1.12); } to { transform: scale(1); } }
@keyframes kb2 { from { transform: scale(1.05) translateX(-2%); } to { transform: scale(1.05) translateX(2%); } }
@keyframes kb3 { from { transform: scale(1.05) translateX(2%); } to { transform: scale(1.05) translateX(-2%); } }
@keyframes kb4 { from { transform: scale(1.08) translateY(1%); } to { transform: scale(1.08) translateY(-1%); } }
@keyframes kb5 { from { transform: scale(1.08) translateY(-1%); } to { transform: scale(1.08) translateY(1%); } }
`;

export default function Hero() {
  const { config } = useSiteConfig();

  const hero: any = config?.home || {};
  const heading = hero.heading || 'Every Frame';
  const headingItalic = hero.headingItalic || 'Tells a Story';
  const tagline = hero.tagline || '';
  const categories = hero.categories || ['Newborn', 'Maternity', 'Portrait', 'Events'];
  const ctaText = hero.ctaText || 'Book Now';
  const ctaLink = hero.ctaLink || '/contact';
  const secondaryCtaText = hero.secondaryCtaText || 'Portfolio';
  const secondaryCtaLink = hero.secondaryCtaLink || '/gallery';
  const slideshowDuration = hero.slideshowDuration || 8;
  const transitionDuration = hero.transitionDuration || 2;
  const kenBurnsEnabled = hero.kenBurnsEnabled !== false;
  const overlayIntensity = hero.overlayIntensity ?? 0.7;

  const images = useMemo(() => {
    const heroImages = hero.heroImages?.filter((img: any) => img?.url) || [];
    if (heroImages.length > 0) return heroImages;
    const legacy = [
      hero.images?.heroMain,
      hero.images?.heroSecondary,
      hero.images?.background,
    ].filter((img: any) => img?.url);
    return legacy;
  }, [hero.heroImages, hero.images]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  

  useEffect(() => {
    setMounted(true);
  }, []);

  // Per-image duration support
  useEffect(() => {
    if (images.length <= 1) return;
    const currentImage = images[currentIndex] as any;
    const duration = currentImage?.duration || slideshowDuration;
    const total = (duration + transitionDuration) * 1000;
    const timer = setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, total);
    return () => clearTimeout(timer);
  }, [currentIndex, images, slideshowDuration, transitionDuration]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const hasImages = images.length > 0;

  return (
    <section
      className="relative h-screen min-h-[100dvh] w-full overflow-hidden bg-rich-black"
      aria-label="Hero section"
    >
      <style dangerouslySetInnerHTML={{ __html: kenBurnsKeyframes }} />

      {hasImages ? (
        <>
          {images.map((img: any, i: number) => {
            const isActive = i === currentIndex;
            const imgDuration = img.duration || slideshowDuration;
            const totalDuration = imgDuration + transitionDuration;

            // Per-image animation or auto-cyclic
            let animName = 'none';
            if (mounted && isActive && kenBurnsEnabled) {
              const anim = img.animation || 'auto';
              if (anim === 'auto') {
                animName = `kb${i % 6}`;
              } else {
                const animMap: Record<string, string> = {
                  'zoom-in': 'kb0',
                  'zoom-out': 'kb1',
                  'pan-left': 'kb2',
                  'pan-right': 'kb3',
                  'drift-up': 'kb4',
                  'drift-down': 'kb5',
                };
                animName = animMap[anim] || `kb${i % 6}`;
              }
            }

            return (
              <div
                key={`${img.url}-${i}`}
                className="absolute inset-0"
                style={{
                  opacity: mounted && isActive ? 1 : 0,
                  transition: `opacity ${transitionDuration}s cubic-bezier(0.4, 0, 0.2, 1)`,
                  zIndex: isActive ? 1 : 0,
                  willChange: 'opacity',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    animation: mounted && isActive && kenBurnsEnabled
                      ? `${animName} ${totalDuration}s ease-in-out forwards`
                      : 'none',
                    willChange: 'transform',
                  }}
                >
                  <img
                    src={img.url}
                    alt={img.alt || ''}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                      willChange: 'transform',
                    }}
                    {...(i === 0 ? { fetchPriority: 'high' } : {})}
                  />
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div
          className="w-full h-full"
          style={{
            background: hero.backgroundGradient || 'linear-gradient(135deg, #1A1110 0%, #2C1810 40%, #111111 100%)',
          }}
        />
      )}

      {/* Layered dark overlays */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: overlayIntensity }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-rich-black via-rich-black/30 to-rich-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-rich-black/50 via-transparent to-rich-black/20" />
      </div>

      {/* Cinematic vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.5) 100%)',
        }}
      />

      {/* Subtle film grain */}
      <div
        className="absolute inset-0 z-10 pointer-events-none opacity-[0.025] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-16 md:pb-24">
        {tagline && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="font-mono text-[11px] text-white/50 uppercase tracking-[0.3em] mb-4"
          >
            {tagline}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-[7rem] text-white leading-[1.02] tracking-tight max-w-4xl"
        >
          {heading}
          <br />
          <span className="italic font-normal text-white/35">{headingItalic}</span>
        </motion.h1>

        {/* Category labels — inside hero, not overlapping navbar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
        >
          {categories.map((cat: string) => (
            <span
              key={cat}
              className="font-mono text-[11px] text-white/50 uppercase tracking-[0.3em]"
            >
              {cat}
            </span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex items-center gap-6"
        >
          <Link
            href={ctaLink}
            className="inline-flex items-center justify-center px-8 py-3.5 min-h-[44px] bg-white text-rich-black font-sans text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-700 hover:bg-ivory"
          >
            {ctaText}
          </Link>
          <Link
            href={secondaryCtaLink}
            className="group inline-flex items-center gap-3 py-2 min-h-[44px] font-sans text-[11px] text-white/50 uppercase tracking-[0.25em] hover:text-white/60 transition-colors duration-500"
          >
            <span className="w-4 h-px bg-white/20 group-hover:w-7 transition-all duration-500" />
            {secondaryCtaText}
          </Link>
        </motion.div>

        {/* Slide indicators */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-8 flex items-center gap-2"
          >
            {images.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className="h-2 rounded-full transition-all duration-700 ease-out min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Go to slide ${i + 1}`}
              >
                <span
                  className="h-[3px] rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: i === currentIndex ? 24 : 12,
                    backgroundColor: i === currentIndex ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.15)',
                  }}
                />
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Mobile categories — bottom right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-16 right-8 md:hidden z-20"
      >
        <p className="font-mono text-[11px] text-white/50 uppercase tracking-[0.3em] leading-[2.2] text-right">
          {categories.join(' · ')}
        </p>
      </motion.div>
    </section>
  );
}
