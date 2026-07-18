'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!parallaxRef.current) return;
      parallaxRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-rich-black">
      <div ref={parallaxRef} className="absolute inset-0 will-change-transform">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-ivory/10 z-10" />
        <div className="w-full h-[120%] bg-gradient-to-br from-[#1A1A1A] via-[#2C2C2C] to-rich-black" />
      </div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="font-serif text-sm md:text-base text-white/40 italic tracking-wider">Indira Thakur</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight">
            Every Frame
            <br />
            <span className="italic font-normal">Tells a Story</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-white/50 mt-6 max-w-md mx-auto leading-relaxed">
            Newborn &middot; Maternity &middot; Portrait &middot; Events
          </p>
          <div className="mt-12">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center justify-center px-12 py-5 overflow-hidden"
            >
              <span className="absolute inset-0 bg-white transition-transform duration-700 ease-out group-hover:scale-105" />
              <span className="relative font-sans text-[11px] text-rich-black uppercase tracking-[0.2em] font-medium">
                Begin Your Journey
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[9px] text-white/20 uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
