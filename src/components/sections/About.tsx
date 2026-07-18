'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function About() {
  return (
    <section id="about" className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="aspect-[5/4] bg-gradient-to-br from-cream via-beige/40 to-cream relative overflow-hidden"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-sans text-[10px] text-warm-gray/20 uppercase tracking-[0.3em]">Portrait</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-magenta/5 rounded-full blur-3xl" />
            </motion.div>
          </div>

          <div className="lg:col-span-2 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span className="font-sans text-[10px] text-magenta/40 uppercase tracking-[0.3em]">The Story</span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-6">
                A Once-in-a-Lifetime
                <br />
                <span className="italic font-normal">Experience</span>
              </h2>
              <div className="w-10 h-px bg-magenta/30 mt-8" />
              <p className="font-sans text-base md:text-lg text-warm-gray/70 leading-relaxed mt-8">
                Most people think it takes a thousand photos to tell a story. 
                But at Indira Thakur Photography, we know it&apos;s about capturing 
                the right frame at the right moment.
              </p>
              <p className="font-sans text-sm md:text-base text-warm-gray/50 leading-relaxed mt-5">
                An intimate session with your loved ones, the glow of pregnancy, 
                the first tiny fingers and toes — every milestone deserves to be 
                preserved with artistry and heart.
              </p>
              <p className="font-serif text-lg text-rich-black/60 italic mt-8 leading-relaxed">
                &ldquo;Every photograph is a love letter to the moments that matter most.&rdquo;
              </p>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-2 mt-10 font-sans text-[10px] text-magenta/60 uppercase tracking-[0.25em] hover:text-magenta transition-colors duration-500"
              >
                <span className="w-6 h-px bg-magenta/30" />
                View the Portfolio
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
