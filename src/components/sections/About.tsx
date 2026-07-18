'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="about" className="section-padding bg-soft-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative aspect-4-5 rounded-sm overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-warm-blush via-cream to-beige" />
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/30 via-transparent to-transparent" />
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 w-full h-full border border-muted-gold/30 rounded-sm -z-10" />
            <div className="absolute -bottom-4 -right-4 w-full h-full border border-warm-beige/50 rounded-sm -z-10" />
            {/* Gold accent */}
            <div className="absolute top-8 right-8 w-16 h-16 border border-muted-gold/20 rounded-full" />
          </motion.div>

          {/* Text Side */}
          <div className="space-y-8">
            <SectionHeading
              subtitle="About Me"
              title="A Story Told Through Light & Emotion"
              description=""
              align="left"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="space-y-6"
            >
              <p className="text-earth-brown/70 font-sans-alt leading-relaxed">
                About section content coming soon.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="pt-4"
            >
              <Button href="/#contact">Let&apos;s Create Together</Button>
            </motion.div>


          </div>
        </div>
      </div>
    </section>
  );
}
