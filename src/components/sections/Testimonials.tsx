'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig, type SiteConfigData } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

type TestimonialItem = NonNullable<SiteConfigData['testimonials']['testimonials']>[number];

const FALLBACK_ITEMS: TestimonialItem[] = [
  { quote: 'The photos are amazing and everyone in my family are in awe of all your shots. You made my maternity and baby shoot a very emotional and unforgettable experience.', author: 'Ananya Sharma', role: '', rating: 5, avatar: { url: '', alt: '' } },
  { quote: 'Thank you so much for the lovely photos! These pictures are going to be treasured and cherished in our lifetime.', author: 'Priya Mehta', role: '', rating: 5, avatar: { url: '', alt: '' } },
  { quote: 'We captured so many beautiful moments in such a short time. Truly a magical experience.', author: 'Rhea Kapoor', role: '', rating: 5, avatar: { url: '', alt: '' } },
];

export default function Testimonials() {
  const { config } = useSiteConfig();
  const [current, setCurrent] = useState(0);

  const items: TestimonialItem[] =
    config?.testimonials?.testimonials && config.testimonials.testimonials.length > 0
      ? config.testimonials.testimonials
      : FALLBACK_ITEMS;

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    const timer = setInterval(advance, 5000);
    return () => clearInterval(timer);
  }, [advance]);

  const hasImage = (url: string) => url && url.trim() !== '';
  const bgImage = config?.testimonials?.backgroundImage?.url || '';

  return (
    <section className={`relative py-28 md:py-36 ${bgImage ? '' : 'bg-ivory'}`} aria-label="Testimonials">
      {bgImage && (
        <PolaroidImage
          src={bgImage}
          alt={config?.testimonials?.backgroundImage?.alt || 'Testimonials background'}
          fill
          objectFit="cover"
          sizes="100vw"
          priority={false}
          className="!w-full !h-full"
          containerClassName="!w-full !h-full !absolute !inset-0"
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
                  <PolaroidImage
                    src={items[current].avatar.url}
                    alt={items[current].avatar.alt || items[current].author}
                    width={64}
                    height={64}
                    objectFit="contain"
                    bgColor="bg-transparent"
                    containerClassName="!w-16 !h-16 !rounded-full !mx-auto !border-2 !border-cream/40 !bg-cream/30"
                  />
                </div>
              )}
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black/65 leading-relaxed italic" aria-live="polite">
                &ldquo;{items[current]?.quote}&rdquo;
              </p>
              <div className="w-4 h-px bg-magenta/15 mx-auto mt-8 mb-4" />
              <p className="font-sans text-[11px] text-rich-black/40 uppercase tracking-[0.15em]">
                {items[current]?.author}
              </p>
              {items[current]?.role && (
                <p className="font-sans text-[11px] text-rich-black/40 mt-1">{items[current].role}</p>
              )}
              {items[current]?.rating && items[current].rating > 0 && (
                <div className="flex items-center justify-center gap-0.5 mt-3">
                  {[1,2,3,4,5].map((star) => (
                    <svg key={star} className="w-3.5 h-3.5" fill={(items[current].rating || 0) >= star ? '#C2186A' : 'none'} stroke={(items[current].rating || 0) >= star ? '#C2186A' : '#6E655D'} strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-10">
            {items.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className="h-2 rounded-full transition-all duration-700 ease-out min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label={`Testimonial ${i + 1}`}
              >
                <span
                  className="h-[3px] rounded-full transition-all duration-700 ease-out"
                  style={{
                    width: i === current ? 24 : 12,
                    backgroundColor: i === current ? 'rgba(180,80,120,0.5)' : 'rgba(219,206,178,0.6)',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
