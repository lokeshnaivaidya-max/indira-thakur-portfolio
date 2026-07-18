'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function Testimonials() {
  const { config } = useSiteConfig();
  const [current, setCurrent] = useState(0);

  const testimonialsData = config?.testimonials || {
    testimonials: [
      { quote: 'The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.', author: 'Ananya Sharma', role: '' },
      { quote: 'Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime.', author: 'Priya Mehta', role: '' },
      { quote: 'We captured so many beautiful moments in such a short time. Truly a magical experience.', author: 'Rhea Kapoor', role: '' },
    ],
  };

  const items = testimonialsData.testimonials?.length > 0
    ? testimonialsData.testimonials
    : [
        { quote: 'The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.', author: 'Ananya Sharma', role: '' },
        { quote: 'Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime.', author: 'Priya Mehta', role: '' },
        { quote: 'We captured so many beautiful moments in such a short time. Truly a magical experience.', author: 'Rhea Kapoor', role: '' },
      ];

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % items.length), 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <section className="py-28 md:py-36 bg-ivory">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black/65 leading-relaxed italic">
                &ldquo;{items[current]?.quote}&rdquo;
              </p>
              <div className="w-4 h-px bg-magenta/15 mx-auto mt-8 mb-4" />
              <p className="font-sans text-[11px] text-rich-black/40 uppercase tracking-[0.15em]">
                {items[current]?.author}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-10">
            {items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-700 h-px ${i === current ? 'w-6 bg-magenta/50' : 'w-3 bg-beige/60'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
