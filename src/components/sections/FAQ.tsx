'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How far in advance should I book my session?',
    a: 'We recommend booking at least 2–4 weeks in advance. This gives us time to understand your vision, put together a moodboard, and prepare for your session.',
  },
  {
    q: 'Do you only shoot in Bangalore, or can you travel?',
    a: 'We are based in Bangalore but we travel across India for sessions. Reach out and we can plan an outstation shoot together.',
  },
  {
    q: 'When is the best time for a maternity shoot?',
    a: 'The ideal time is between 6 and 8 months of pregnancy, when the bump shows beautifully. If you\'re carrying twins, anytime from 5 months works.',
  },
  {
    q: 'When should I schedule a newborn session?',
    a: 'Newborn sessions are best done within the first 0–30 days. Babies up to 3 months are still considered newborns for photography purposes.',
  },
  {
    q: 'Can my partner and older children be included?',
    a: 'Absolutely. Every session includes your partner and children. Extended family members can be included at an additional charge.',
  },
  {
    q: 'What is your editing style?',
    a: 'We specialize in a warm, artistic, and rich editing style — with colors that feel natural yet dreamy, and light that gives your photos a timeless quality.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="section-spacing bg-cream/30">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">Questions</p>
          <h2 className="heading-lg mt-6">Frequently Asked</h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-t border-beige/50 first:border-t-0">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full py-6 flex items-center justify-between text-left group"
                >
                  <span className="font-sans text-sm md:text-base text-rich-black/80 group-hover:text-magenta transition-colors duration-500 pr-4">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-shrink-0 w-6 h-6 flex items-center justify-center transition-transform duration-500 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <span className="w-3 h-px bg-warm-gray/40 absolute" />
                    <span className="w-px h-3 bg-warm-gray/40 absolute" />
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="body-md pb-6 text-warm-gray/60 max-w-2xl">
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
    </section>
  );
}
