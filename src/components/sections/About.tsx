'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="relative">
      <div className="min-h-[90vh] flex items-end">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-beige/30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-transparent z-10" />

        <div className="container-editorial relative z-20 pb-16 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-3 aspect-[4/3] lg:aspect-auto lg:h-[70vh]">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 }}
                className="w-full h-full bg-gradient-to-br from-amber-50/80 via-cream to-rose-50/40"
              />
            </div>

            <div className="lg:col-span-2 flex items-end pb-8 lg:pb-16 pl-0 lg:pl-12 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">The Story</span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-4 max-w-sm">
                  A Once-in-a-Lifetime
                  <br />
                  <span className="italic font-normal text-rich-black/50">Experience</span>
                </h2>
                <div className="w-6 h-px bg-magenta/25 mt-6" />
                <p className="font-sans text-sm text-warm-gray/50 mt-6 max-w-xs leading-relaxed">
                  Most people think it takes a thousand photos to tell a story.
                </p>
                <p className="font-sans text-sm text-warm-gray/40 mt-3 max-w-xs leading-relaxed">
                  Every milestone deserves to be preserved with artistry and heart.
                </p>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-2 mt-8 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.25em] hover:text-magenta transition-colors duration-500"
                >
                  <span className="w-4 h-px bg-magenta/25" />
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
