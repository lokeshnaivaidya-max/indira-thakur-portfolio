'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="section-padding bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative">
            <div className="aspect-4-5 rounded-sm bg-cream overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-cream to-soft-cream" />
            </div>
          </div>
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase"
            >
              About Me
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title mt-3"
            >
              A Story Told Through Light & Emotion
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-6 space-y-4 text-warm-brown/80 font-sans-alt leading-relaxed"
            >
              <p className="italic text-muted-gold font-serif text-lg">
                &ldquo;Photography is not just about taking pictures. It&apos;s about capturing feelings, freezing moments of pure emotion.&rdquo;
              </p>
              <p>
                I&apos;m Indira Thakur, a photographer who believes that every moment holds a story waiting to be told. My approach is simple — create a space where you feel completely yourself, and let the magic happen naturally.
              </p>
              <p>
                When you&apos;re comfortable, your true beauty shines through. I don&apos;t just take photos; I create an experience that you&apos;ll treasure forever.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
