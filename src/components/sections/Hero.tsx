'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { HiArrowDown } from 'react-icons/hi2';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-warm-ivory">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_30%_20%,_#C9A96E_0%,_transparent_50%),radial-gradient(circle_at_70%_80%,_#8B7355_0%,_transparent_50%)]" />
      
      {/* Decorative Elements */}
      <div className="absolute top-20 right-[10%] w-64 h-64 border border-muted-gold/10 rounded-full" />
      <div className="absolute bottom-40 left-[5%] w-32 h-32 border border-muted-gold/20 rounded-full" />
      <div className="absolute top-1/3 left-[15%] w-2 h-2 bg-muted-gold/30 rounded-full" />
      <div className="absolute bottom-1/4 right-[20%] w-3 h-3 bg-muted-gold/20 rounded-full" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-screen py-32">
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <span className="font-serif-alt italic text-muted-gold text-lg md:text-xl tracking-wide">
                Welcome to the world of
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-warm-black leading-[0.9] tracking-tight"
            >
              Indira
              <br />
              <span className="text-muted-gold italic font-serif-alt">Thakur</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-sans-alt text-lg md:text-xl text-earth-brown/80 leading-relaxed max-w-lg"
            >
              Capturing life&apos;s most precious moments with elegance, emotion, and timeless artistry. Every photograph tells a story worth cherishing forever.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                href="/gallery"
                className="px-8 py-4 bg-warm-black text-soft-white font-sans-alt text-sm font-medium tracking-[0.15em] uppercase hover:bg-earth-brown transition-all duration-500"
              >
                View Portfolio
              </Link>
              <Link
                href="/#contact"
                className="px-8 py-4 border-2 border-warm-black text-warm-black font-sans-alt text-sm font-medium tracking-[0.15em] uppercase hover:bg-warm-black hover:text-soft-white transition-all duration-500"
              >
                Book a Session
              </Link>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex items-center gap-8 pt-8 border-t border-warm-cream/60"
            >
              <div className="text-center">
                <p className="font-serif text-3xl text-warm-black">15+</p>
                <p className="font-sans-alt text-xs text-earth-brown/60 tracking-wider uppercase mt-1">Years Experience</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-warm-black">500+</p>
                <p className="font-sans-alt text-xs text-earth-brown/60 tracking-wider uppercase mt-1">Happy Clients</p>
              </div>
              <div className="text-center">
                <p className="font-serif text-3xl text-warm-black">2K+</p>
                <p className="font-sans-alt text-xs text-earth-brown/60 tracking-wider uppercase mt-1">Photoshoots</p>
              </div>
            </motion.div>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative lg:h-[80vh] min-h-[400px] rounded-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-warm-blush via-cream to-warm-beige" />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-black/20 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-center">
              <p className="font-serif-alt italic text-soft-white/90 text-lg">Every moment tells a story</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans-alt text-[10px] tracking-[0.2em] uppercase text-earth-brown/50">Scroll</span>
          <HiArrowDown className="w-4 h-4 text-earth-brown/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
