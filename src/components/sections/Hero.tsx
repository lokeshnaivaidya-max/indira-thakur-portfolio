'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-rose-900/30 to-rich-black" />
      <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-rich-black/40 via-transparent to-rich-black/20" />
      <div className="w-full h-full bg-gradient-to-br from-[#2C1810] via-[#1A1A1A] to-rich-black" />

      <div className="absolute top-8 left-8 md:top-12 md:left-16 lg:left-24 z-20">
        <span className="font-serif text-lg md:text-xl text-white/90 italic tracking-tight">Indira Thakur</span>
      </div>

      <div className="absolute bottom-16 md:bottom-24 left-8 md:left-16 lg:left-24 z-20 max-w-xl">
        <p className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight">
          Every Frame
          <br />
          <span className="italic font-normal text-white/70">Tells a Story</span>
        </p>
        <div className="mt-10">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-rich-black font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-700 hover:bg-white/90"
          >
            Begin Your Journey
          </Link>
        </div>
      </div>

      <div className="absolute bottom-16 md:bottom-24 right-8 md:right-16 lg:right-24 z-20">
        <p className="font-sans text-[10px] text-white/40 uppercase tracking-[0.25em] text-right leading-relaxed">
          Newborn<br />Maternity<br />Portrait<br />Events
        </p>
      </div>
    </section>
  );
}
