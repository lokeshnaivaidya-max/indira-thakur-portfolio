'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-rich-black">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-[#1A1110] via-[#2C1810] to-rich-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory/[0.04] via-transparent to-black/20" />
      </div>

      <div className="absolute top-10 left-10 md:top-14 md:left-16 lg:left-24 z-20">
        <span className="font-serif text-lg md:text-xl text-white/90 italic">Indira Thakur</span>
      </div>

      <div className="absolute bottom-14 md:bottom-20 left-10 md:left-16 lg:left-24 z-20 max-w-2xl">
        <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[1.05] tracking-tight">
          Every Frame
          <br />
          <span className="italic font-normal text-white/60">Tells a Story</span>
        </h1>
        <div className="mt-10 flex items-center gap-6">
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-7 py-3 bg-white text-rich-black font-sans text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-700 hover:bg-white/90"
          >
            Book Now
          </Link>
          <Link
            href="/gallery"
            className="font-sans text-[10px] text-white/40 uppercase tracking-[0.25em] hover:text-white/70 transition-colors duration-500"
          >
            Portfolio
          </Link>
        </div>
      </div>

      <div className="absolute top-10 right-10 md:top-14 md:right-16 lg:right-24 z-20 text-right">
        <p className="font-sans text-[9px] text-white/30 uppercase tracking-[0.3em] leading-loose">
          Newborn<br />Maternity<br />Portrait<br />Events
        </p>
      </div>
    </section>
  );
}
