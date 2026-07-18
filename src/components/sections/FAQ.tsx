'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How far in advance should I book?',
    a: 'We recommend booking at least 2–4 weeks in advance. This gives us time to understand your vision, put together a moodboard, and prepare for your session.',
  },
  {
    q: 'Do you travel outside Bangalore?',
    a: 'Yes, we travel across India for sessions. Reach out and we can plan an outstation shoot together.',
  },
  {
    q: 'When is the best time for a maternity shoot?',
    a: 'The ideal time is between 6 and 8 months of pregnancy when the bump shows beautifully. For twins, anytime from 5 months works.',
  },
  {
    q: 'When should I schedule a newborn session?',
    a: 'Newborn sessions are best within the first 0–30 days. Babies up to 3 months are still considered newborns for photography.',
  },
  {
    q: 'Can my partner and children be included?',
    a: 'Absolutely. Every session includes your partner and children. Extended family can be included at an additional charge.',
  },
  {
    q: 'What is your editing style?',
    a: 'Warm, artistic, and rich — with natural yet dreamy colors and light that gives your photos a timeless quality.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-28 md:py-36 bg-cream/20">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <span className="font-sans text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Questions</span>
            <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">Commonly Asked</h2>
          </motion.div>

          <div>
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={i} className="border-t border-beige/40 first:border-t-0">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <span className="font-sans text-sm md:text-base text-rich-black/70 group-hover:text-rich-black transition-colors duration-500 pr-4">
                      {faq.q}
                    </span>
                    <span className={`flex-shrink-0 w-5 h-5 flex items-center justify-center transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}>
                      <span className="w-3 h-px bg-warm-gray/30 absolute" />
                      <span className="w-px h-3 bg-warm-gray/30 absolute" />
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm text-warm-gray/50 pb-5 pr-12 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
