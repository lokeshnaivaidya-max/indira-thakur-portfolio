'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      const scrolled = window.scrollY;
      parallaxRef.current.style.transform = `translateY(${scrolled * 0.35}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 will-change-transform"
      >
        <div
          className="absolute inset-0 bg-gradient-to-br from-charcoal/60 via-rich-black/50 to-rich-black/70 z-10"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent z-10"
        />
        <div
          className="w-full h-[120%] bg-gradient-to-br from-[#2C2C2C] via-[#1A1A1A] to-[#111111]"
        />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="max-w-4xl mx-auto">
          <p className="font-mono text-[11px] md:text-xs text-white/50 uppercase tracking-[0.25em] animate-fade-in">
            Award-Winning Photographer
          </p>
          <h1 className="heading-xl text-white mt-6 md:mt-8 leading-[1.05]">
            Capturing Life&apos;s
            <br />
            <span className="italic font-normal">Most Beautiful Moments</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-white/60 mt-6 max-w-lg mx-auto leading-relaxed">
            Newborn &bull; Maternity &bull; Portrait &bull; Events
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-white text-rich-black font-sans text-xs font-medium tracking-[0.15em] uppercase transition-all duration-700 hover:bg-white/90 hover:-translate-y-0.5"
            >
              Book Your Session
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/80 font-sans text-xs font-medium tracking-[0.15em] uppercase transition-all duration-700 hover:border-white/50 hover:text-white"
            >
              View Gallery
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent mx-auto animate-float" />
      </div>
    </section>
  );
}
