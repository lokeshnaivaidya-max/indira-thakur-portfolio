'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section-spacing">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="aspect-[4/3] bg-gradient-to-br from-cream via-beige/50 to-cream overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-mono text-[10px] text-warm-gray/30 uppercase tracking-[0.2em]">Photography</span>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">About</p>
              <h2 className="heading-lg mt-6">
                A Once-in-a-Lifetime
                <br />
                <span className="italic font-normal">Experience</span>
              </h2>
              <div className="divider-line mt-8" />
              <p className="body-lg mt-8 text-warm-gray/80">
                Most people think it takes a thousand photos to tell a story. But at Indira Thakur Photography, 
                we know it&apos;s about capturing the right frame at the right moment.
              </p>
              <p className="body-md mt-6 text-warm-gray/60">
                An intimate session with your loved ones, the glow of pregnancy, the first tiny fingers and toes — 
                every milestone deserves to be preserved with artistry and heart.
              </p>
              <p className="font-serif text-lg text-rich-black/60 italic mt-8">
                &ldquo;Every photograph is a love letter to the moments that matter most.&rdquo;
              </p>
              <p className="font-sans text-xs text-rich-black/40 mt-4 tracking-[0.1em]">
                — INDIRA THAKUR
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
