'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center bg-cream">
      {/* Warm background image area */}
      <div className="absolute inset-0 bg-gradient-to-br from-cream via-warm-white to-soft-cream" />
      <div className="absolute inset-0 bg-gradient-to-t from-warm-black/10 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans-alt text-sm md:text-base text-muted-gold tracking-wider uppercase mb-4"
          >
            Welcome to the world of
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-black leading-[1.1]"
          >
            Indira <span className="text-muted-gold">Thakur</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-warm-brown/80 font-sans-alt leading-relaxed max-w-xl"
          >
            Capturing life&apos;s most precious moments with warmth, emotion, and timeless artistry.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link href="/gallery" className="btn-primary">
              View Portfolio
            </Link>
            <Link href="/#contact" className="btn-outline">
              Book a Session
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
