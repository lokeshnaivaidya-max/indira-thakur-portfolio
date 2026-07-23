'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

interface TestimonialItem {
  id?: string;
  name: string;
  role?: string;
  quote: string;
  sessionType?: string;
  avatarUrl?: string;
}

function cleanCategory(raw?: string): string {
  if (!raw) return '';
  const lower = raw.toLowerCase().trim();
  if (lower.includes('newborn')) return 'Newborn';
  if (lower.includes('maternity')) return 'Maternity';
  if (lower.includes('family')) return 'Family';
  if (lower.includes('portrait')) return 'Portrait';
  if (lower.includes('wedding')) return 'Wedding';
  if (lower.includes('event')) return 'Event';
  if (lower.includes('brand')) return 'Brand Collaboration';
  if (lower.includes('couple')) return 'Couple';
  if (lower.includes('engagement')) return 'Engagement';
  return raw;
}

export default function EditorialTestimonials() {
  const { config } = useSiteConfig();
  const [dbTestimonials, setDbTestimonials] = useState<TestimonialItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchDbTestimonials() {
      try {
        const res = await fetch('/api/testimonials');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            const mapped: TestimonialItem[] = data
              .map((t: any) => ({
                id: t._id || t.id,
                name: t.name || t.author || 'Valued Client',
                role: t.role || '',
                quote: t.content || t.quote || t.message || '',
                sessionType: t.role || '',
                avatarUrl: t.image || t.avatarUrl || '',
              }))
              .filter((t: TestimonialItem) => t.quote && t.quote.trim().length > 0);
            setDbTestimonials(mapped);
          }
        }
      } catch (err) {
        console.error('Error fetching DB testimonials:', err);
      }
    }
    fetchDbTestimonials();
  }, []);

  const testimonialsData: any = config?.testimonials || {};
  const rawCmsList = testimonialsData.testimonials || testimonialsData.items || testimonialsData.reviews || [];

  const mappedCmsReviews: TestimonialItem[] = Array.isArray(rawCmsList)
    ? rawCmsList
        .map((t: any) => ({
          id: t.id || t._id,
          name: t.name || t.author || t.clientName || 'Valued Client',
          role: t.role || t.sessionType || '',
          quote: t.quote || t.message || t.text || t.content || '',
          sessionType: t.role || t.sessionType || '',
          avatarUrl: t.avatarUrl || t.avatar?.url || t.image?.url || (typeof t.avatar === 'string' ? t.avatar : ''),
        }))
        .filter((t: TestimonialItem) => t.quote && t.quote.trim().length > 0)
    : [];

  const combinedList = [...dbTestimonials, ...mappedCmsReviews].filter(
    (item, index, self) =>
      item.quote.trim().length > 0 && self.findIndex((o) => o.quote === item.quote) === index
  );

  const reviewsList = combinedList.slice(0, 6);

  useEffect(() => {
    if (reviewsList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reviewsList.length]);

  const current = reviewsList[activeIndex] || reviewsList[0];

  if (!current || !current.quote || current.quote.trim().length === 0) {
    return null;
  }

  const displayCategory = cleanCategory(current.sessionType || current.role);

  return (
    <section className="py-16 md:py-24 bg-white text-[#2B2625] relative overflow-hidden">
      <div className="container-editorial max-w-4xl mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {testimonialsData.eyebrow && (
            <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block mb-3 font-medium">
              {testimonialsData.eyebrow}
            </span>
          )}
          {testimonialsData.heading && (
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2625] leading-tight">
              {testimonialsData.heading}
            </h2>
          )}
          <div className="w-12 h-px bg-[#C39E96]/40 mx-auto my-6" />
        </motion.div>

        <div className="relative min-h-[200px] flex items-center justify-center my-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col items-center max-w-2xl mx-auto"
            >
              <span className="font-serif text-4xl text-[#C39E96]/40 font-normal leading-none mb-2">“</span>
              <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#2B2625] leading-relaxed font-normal px-4">
                {current.quote.trim()}
              </p>

              <div className="mt-8 flex items-center gap-4">
                {current.avatarUrl ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-[#E7DDD2] bg-[#FAF6F3] shrink-0">
                    <img
                      src={current.avatarUrl}
                      alt={current.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full border border-[#C39E96]/30 bg-[#C39E96]/10 flex items-center justify-center font-serif text-lg text-[#C39E96] font-semibold shrink-0">
                    {current.name ? current.name.charAt(0) : 'I'}
                  </div>
                )}
                <div className="text-left">
                  <h3 className="font-sans text-sm md:text-base font-semibold text-[#2B2625] tracking-wide">
                    {current.name}
                  </h3>
                  {displayCategory && (
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C39E96]">
                      {displayCategory}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {reviewsList.length > 1 && (
          <div className="flex items-center justify-center gap-3 mt-10">
            {reviewsList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to review ${idx + 1}`}
                className="h-10 flex items-center cursor-pointer px-1"
              >
                <span
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: activeIndex === idx ? 28 : 10,
                    backgroundColor: activeIndex === idx ? '#C39E96' : '#E7DDD2',
                  }}
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
