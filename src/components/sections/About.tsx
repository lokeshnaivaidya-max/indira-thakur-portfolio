'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-32 md:py-40">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="aspect-[4/3] bg-gradient-to-br from-cream via-beige/30 to-cream relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-[10px] text-warm-gray/20 uppercase tracking-[0.3em]">About</span>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-magenta/[0.03] rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="lg:col-span-5 lg:pl-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">The Story</span>
              <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-5">
                A Once-in-a-Lifetime
                <br />
                <span className="italic font-normal text-rich-black/60">Experience</span>
              </h2>
              <div className="w-8 h-px bg-magenta/25 mt-8" />
              <p className="font-sans text-base md:text-lg text-warm-gray/60 leading-relaxed mt-8">
                Most people think it takes a thousand photos to tell a story. 
                But at Indira Thakur Photography, we know it&apos;s about capturing 
                the right frame at the right moment.
              </p>
              <p className="font-sans text-sm md:text-base text-warm-gray/50 leading-relaxed mt-5">
                An intimate session with your loved ones, the glow of pregnancy, 
                the first tiny fingers and toes — every milestone deserves to be 
                preserved with artistry and heart.
              </p>
              <p className="font-serif text-lg text-rich-black/50 italic mt-8 leading-relaxed">
                &ldquo;Every photograph is a love letter to the moments that matter most.&rdquo;
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 mt-10 group"
              >
                <span className="font-sans text-[10px] text-magenta/50 uppercase tracking-[0.25em] group-hover:text-magenta transition-colors duration-500">
                  View the Portfolio
                </span>
                <span className="w-6 h-px bg-magenta/25 group-hover:bg-magenta/50 group-hover:w-8 transition-all duration-500" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
