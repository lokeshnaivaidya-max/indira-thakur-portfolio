'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-ivory">
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-ivory via-cream to-ivory" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-cream/60 via-ivory to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-5xl mx-auto"
        >
          <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em] mb-6 block">
            Indira Thakur Photography
          </span>
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-rich-black leading-[1.05] tracking-tight">
            Every Frame
            <br />
            <span className="italic font-normal text-rich-black/70">Tells a Story</span>
          </h1>
          <p className="font-sans text-base md:text-lg text-warm-gray/50 mt-6 max-w-md mx-auto leading-relaxed">
            Newborn &middot; Maternity &middot; Portrait &middot; Events
          </p>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#contact"
              className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden"
            >
              <span className="absolute inset-0 bg-rich-black transition-all duration-700 ease-out group-hover:bg-charcoal" />
              <span className="relative font-sans text-[11px] text-white uppercase tracking-[0.2em] font-medium">
                Begin Your Journey
              </span>
            </Link>
            <Link
              href="/gallery"
              className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden"
            >
              <span className="absolute inset-0 border border-rich-black/15 transition-all duration-700 ease-out group-hover:border-rich-black/30 bg-white/50" />
              <span className="relative font-sans text-[11px] text-rich-black uppercase tracking-[0.2em] font-medium">
                View Portfolio
              </span>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-[8px] text-warm-gray/30 uppercase tracking-[0.4em]">Discover</span>
          <div className="w-px h-10 bg-gradient-to-b from-warm-gray/20 to-transparent" />
        </div>
      </div>
    </section>
  );
}
