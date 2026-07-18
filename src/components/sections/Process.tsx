'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';

const steps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'We sit down (virtually or in person) to discuss your vision, preferences, and what you want to capture. This is where your story begins to take shape.',
  },
  {
    number: '02',
    title: 'Preparation',
    description: 'I provide expert guidance on wardrobe, styling, locations, and everything you need to feel confident and prepared for your session.',
  },
  {
    number: '03',
    title: 'The Session',
    description: 'This is the fun part! A relaxed, enjoyable experience where I capture genuine emotions and beautiful moments without any awkwardness.',
  },
  {
    number: '04',
    title: 'The Reveal',
    description: 'After careful editing with artistic precision, your beautifully curated gallery is delivered, ready to be cherished for a lifetime.',
  },
];

export default function Process() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-soft-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="How It Works"
          title="The Experience"
          description="From our first conversation to receiving your beautiful photographs, every step is designed to be seamless and enjoyable."
        />

        <div ref={ref} className="relative">
          {/* Connecting Line */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-[1px] bg-warm-beige/60" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="relative text-center"
              >
                <div className="relative z-10">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warm-blush/50 flex items-center justify-center">
                    <span className="font-serif-alt text-2xl text-muted-gold">{step.number}</span>
                  </div>
                  <h3 className="font-serif text-xl text-warm-black mb-3">{step.title}</h3>
                  <p className="text-earth-brown/70 font-sans-alt text-sm leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
