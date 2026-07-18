'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="relative bg-ivory">
      <div className="min-h-[85vh] flex items-end">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-beige/20" />

        <div className="container-editorial relative z-10 w-full pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 lg:h-[80vh]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                className="w-full h-full bg-gradient-to-br from-amber-50/60 via-cream to-rose-50/30"
              />
            </div>

            <div className="lg:col-span-5 flex items-end pb-12 md:pb-20 pl-0 lg:pl-14 pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">The Story</span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-4 max-w-sm">
                  A Once-in-a-Lifetime Experience
                </h2>
                <div className="w-5 h-px bg-magenta/25 mt-6" />
                <p className="font-sans text-sm text-warm-gray/50 mt-5 max-w-xs leading-relaxed">
                  Every milestone deserves to be preserved with artistry and heart.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 mt-6 font-sans text-[9px] text-magenta/50 uppercase tracking-[0.3em] hover:text-magenta transition-colors duration-500"
                >
                  <span className="w-3 h-px bg-magenta/25" />
                  View Portfolio
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
