'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  { q: 'How far in advance should I book?', a: '2–4 weeks in advance. This gives us time to understand your vision and prepare for your session.' },
  { q: 'Do you travel outside Bangalore?', a: 'Yes. We travel across India for sessions. Reach out and we\'ll plan an outstation shoot together.' },
  { q: 'When is the best time for a maternity shoot?', a: 'Between 6 and 8 months of pregnancy. For twins, anytime from 5 months.' },
  { q: 'When should I book a newborn session?', a: 'Within the first 0–30 days. Babies up to 3 months are still considered newborns for photography.' },
  { q: 'Can my family be included?', a: 'Absolutely. Every session includes your partner and children.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 bg-cream/15">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Questions</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">Commonly Asked</h2>
          </div>

          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-t border-beige/30 first:border-t-0">
                <button onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-5 flex items-center justify-between text-left group"
                >
                  <span className="font-sans text-sm text-rich-black/50 group-hover:text-rich-black transition-colors duration-500 pr-4">{faq.q}</span>
                  <span className={`flex-shrink-0 w-4 h-4 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                    <span className="w-2.5 h-px bg-warm-gray/30 absolute" />
                    <span className="w-px h-2.5 bg-warm-gray/30 absolute" />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="font-sans text-sm text-warm-gray/40 pb-5 pr-8 leading-relaxed">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
