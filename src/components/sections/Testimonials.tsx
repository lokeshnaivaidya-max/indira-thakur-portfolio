'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.",
    author: 'Ananya Sharma',
  },
  {
    quote: "Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime. It couldn't be any better. More than the pictures, we are really happy with the involvement, response, and service.",
    author: 'Priya Mehta',
  },
  {
    quote: "It was a pleasure to be at your studio. You had a great selection of dresses and props that compliment each other. For the short time we had, we captured so many beautiful moments. Truly a magical experience.",
    author: 'Rhea Kapoor',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black/80 leading-relaxed italic text-center max-w-3xl mx-auto">
                &ldquo;{testimonials[current].quote}&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3 mt-10">
                <span className="w-px h-6 bg-magenta/30" />
                <p className="font-serif text-sm text-rich-black/60">{testimonials[current].author}</p>
                <span className="w-px h-6 bg-magenta/30" />
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-px transition-all duration-700 ${
                  i === current ? 'w-12 bg-magenta/50' : 'w-6 bg-beige/60 hover:bg-beige'
                }`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
