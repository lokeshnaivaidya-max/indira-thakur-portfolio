'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.",
    author: 'Ananya Sharma',
  },
  {
    quote: "Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime. It couldn't be any better.",
    author: 'Priya Mehta',
  },
  {
    quote: "It was a pleasure to be at your studio. You had a great selection of props and backdrops. For the short time we had, we captured so many beautiful moments.",
    author: 'Rhea Kapoor',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32 md:py-40 bg-ivory">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Kind Words</span>
            <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4 mb-16">What Families Say</h2>
          </motion.div>

          <div className="relative min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <svg className="w-6 h-6 text-magenta/20 mb-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <p className="font-serif text-xl md:text-2xl lg:text-3xl text-rich-black/70 leading-relaxed italic max-w-2xl">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="w-6 h-px bg-magenta/20 mt-8 mb-4" />
                <p className="font-sans text-sm text-rich-black/50">
                  {testimonials[current].author}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`transition-all duration-700 ${
                  i === current ? 'w-8 h-px bg-magenta/50' : 'w-4 h-px bg-beige/60 hover:bg-beige'
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
