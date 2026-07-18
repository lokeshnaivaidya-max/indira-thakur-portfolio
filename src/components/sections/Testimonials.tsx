'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi2';

const testimonials = [
  {
    quote: "The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience. Until next time... Can't wait to work with you again.",
    author: 'Ananya Sharma',
    role: 'Newborn & Maternity Session',
  },
  {
    quote: "Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime. It couldn't be any better. More than the pictures, we are really happy with the involvement, response, and service.",
    author: 'Priya Mehta',
    role: 'Family Portrait Session',
  },
  {
    quote: "It was a pleasure to be at your studio. You had a great selection of dresses and props that compliment each other. For the short time we had, we were able to capture so many beautiful moments. Truly a magical experience.",
    author: 'Rhea Kapoor',
    role: 'Maternity Session',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const goNext = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const goPrev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section className="section-spacing">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">Kind Words</p>
          <h2 className="heading-lg mt-6">What Families Say</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto text-center relative">
          <div className="min-h-[200px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="absolute max-w-2xl"
              >
                <p className="font-serif text-2xl md:text-3xl text-rich-black/80 leading-relaxed italic">
                  &ldquo;{testimonials[current].quote}&rdquo;
                </p>
                <div className="divider-line mx-auto mt-8" />
                <p className="font-sans text-sm text-rich-black/60 mt-6 tracking-[0.05em]">
                  {testimonials[current].author}
                </p>
                <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em] mt-1">
                  {testimonials[current].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={goPrev}
              className="w-10 h-10 border border-beige/60 flex items-center justify-center text-warm-gray/50 hover:text-magenta hover:border-magenta/30 transition-all duration-500"
              aria-label="Previous testimonial"
            >
              <HiChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === current ? 'bg-magenta/60 w-6' : 'bg-beige/60 hover:bg-beige'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={goNext}
              className="w-10 h-10 border border-beige/60 flex items-center justify-center text-warm-gray/50 hover:text-magenta hover:border-magenta/30 transition-all duration-500"
              aria-label="Next testimonial"
            >
              <HiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
