'use client';

import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-cream via-ivory to-beige/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ivory/60 via-transparent to-ivory/40" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-4">
            <span className="inline-block font-sans text-[10px] text-magenta/50 uppercase tracking-[0.3em]">Welcome</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-rich-black leading-[1.08] tracking-tight">
            Capturing Life&apos;s
            <br />
            <span className="italic font-normal text-magenta/80">Precious Moments</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-warm-gray/60 mt-6 max-w-lg mx-auto leading-relaxed">
            Newborn &middot; Maternity &middot; Portrait &middot; Events &mdash; based in Bangalore
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href="/#contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-rich-black text-white font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:bg-charcoal"
            >
              Book Your Session
            </Link>
            <Link
              href="/gallery"
              className="inline-flex items-center justify-center px-10 py-4 border border-rich-black/15 text-rich-black font-sans text-xs font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:border-rich-black/40 bg-white/50 backdrop-blur-sm"
            >
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <span className="font-sans text-[9px] text-warm-gray/30 uppercase tracking-[0.3em]">Scroll</span>
      </div>
    </section>
  );
}
