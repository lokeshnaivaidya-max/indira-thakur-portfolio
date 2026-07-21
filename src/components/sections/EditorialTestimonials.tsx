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

const defaultTestimonials: TestimonialItem[] = [
  {
    name: 'Ananya & Rohan Sharma',
    role: 'Maternity & Newborn Client',
    quote: "Indira's gentle demeanor and extraordinary eye for light created portraits of our newborn that brought tears to our eyes. She didn't just take pictures; she immortalized the quiet soul of our family's newest chapter.",
    sessionType: 'Newborn Storytelling',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Dr. Priya & Vikram Nair',
    role: 'Fine Art Portrait Client',
    quote: "Working with Indira felt like being part of an artistic masterpiece. Her attention to detail, styling guidance, and effortless direction made us feel completely relaxed. The framed gallery prints are the crown jewel of our home.",
    sessionType: 'Fine Art Portraiture',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=300'
  },
  {
    name: 'Meera & Dev Kapur',
    role: 'Maternity Session',
    quote: "The images captured during my sunset maternity session look straight out of Vogue. Indira has an undeniable gift for making mothers feel like royalty.",
    sessionType: 'Luxury Maternity',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300'
  }
];

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
                role: t.role || 'Fine Art Client',
                quote: t.content || t.quote || t.message || '',
                sessionType: t.sessionType || t.role || 'Fine Art Session',
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
          role: t.role || t.sessionType || 'Fine Art Commission',
          quote: t.quote || t.message || t.text || t.content || '',
          sessionType: t.sessionType || t.role || 'Fine Art Client',
          avatarUrl: t.avatarUrl || t.avatar?.url || t.image?.url || (typeof t.avatar === 'string' ? t.avatar : ''),
        }))
        .filter((t: TestimonialItem) => t.quote && t.quote.trim().length > 0)
    : [];

  // Combine DB & CMS testimonials, prioritizing DB if available, then CMS, then default fallback
  const combinedList = [...dbTestimonials, ...mappedCmsReviews].filter(
    (item, index, self) =>
      item.quote.trim().length > 0 && self.findIndex((o) => o.quote === item.quote) === index
  );

  const reviewsList = combinedList.length > 0 ? combinedList : defaultTestimonials;

  useEffect(() => {
    if (reviewsList.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviewsList.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [reviewsList.length]);

  const current = reviewsList[activeIndex] || reviewsList[0];

  // Root Cause Safeguard: Never render empty quote cards
  if (!current || !current.quote || current.quote.trim().length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-[#FAF6F3] text-[#2B2625] relative overflow-hidden border-t border-b border-[#E7DDD2]/60">
      <div className="container-editorial max-w-5xl mx-auto text-center px-6">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block mb-3 font-medium">
            {testimonialsData.eyebrow || 'CLIENT PRAISE & REVIEWS'}
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2625] leading-tight">
            {testimonialsData.heading || 'Words From The Heart'}
          </h2>
          <div className="w-12 h-px bg-[#C39E96]/40 mx-auto my-8" />
        </motion.div>

        {/* Magazine Style Quote Feature */}
        <div className="relative min-h-[260px] flex items-center justify-center my-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col items-center max-w-3xl"
            >
              <span className="font-serif text-6xl text-[#C39E96]/30 font-normal leading-none mb-2">“</span>
              <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-[#2B2625] leading-relaxed font-normal px-4">
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
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C39E96]">
                    {current.sessionType || current.role || 'Fine Art Client'}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
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
