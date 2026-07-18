'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig, type SiteConfigData } from '@/hooks/useSiteConfig';

type TestimonialItem = NonNullable<SiteConfigData['testimonials']['testimonials']>[number];

const FALLBACK_ITEMS: TestimonialItem[] = [
  { quote: 'The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.', author: 'Ananya Sharma', role: '', avatar: { url: '', alt: '' } },
  { quote: 'Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime.', author: 'Priya Mehta', role: '', avatar: { url: '', alt: '' } },
  { quote: 'We captured so many beautiful moments in such a short time. Truly a magical experience.', author: 'Rhea Kapoor', role: '', avatar: { url: '', alt: '' } },
];

export default function Testimonials() {
  const { config } = useSiteConfig();
  const [current, setCurrent] = useState(0);

  const items: TestimonialItem[] = (config?.testimonials?.testimonials && config.testimonials.testimonials.length > 0)
    ? config.testimonials.testimonials
    : FALLBACK_ITEMS;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % items.length), 5000);
    return () => clearInterval(timer);
  }, [items.length]);

  const hasImage = (url: string) => url && url.trim() !== '';

  const bgImage = config?.testimonials?.backgroundImage?.url || '';

  return (
    <section className={`relative py-28 md:py-36 ${bgImage ? '' : 'bg-ivory'}`}>
      {bgImage && (
        <img
          src={bgImage}
          alt={config?.testimonials?.backgroundImage?.alt || 'Testimonials background'}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-ivory/85" />
      <div className="container-editorial relative">
        <div className="max-w-3xl mx-auto text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
            >
              {hasImage(items[current]?.avatar?.url) && (
                <div className="mb-6">
                  <img
                    src={items[current].avatar.url}
                    alt={items[current].avatar.alt || items[current].author}
                    className="w-16 h-16 rounded-full object-cover mx-auto border-2 border-cream/40"
                  />
                </div>
              )}
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black/65 leading-relaxed italic">
                &ldquo;{items[current]?.quote}&rdquo;
              </p>
              <div className="w-4 h-px bg-magenta/15 mx-auto mt-8 mb-4" />
              <p className="font-sans text-[11px] text-rich-black/40 uppercase tracking-[0.15em]">
                {items[current]?.author}
              </p>
              {items[current]?.role && (
                <p className="font-sans text-[10px] text-rich-black/25 mt-1">
                  {items[current].role}
                </p>
              )}
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
