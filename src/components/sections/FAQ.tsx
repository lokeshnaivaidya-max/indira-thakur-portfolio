'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

function PlusIcon({ open }: { open: boolean }) {
  return (
    <span className="relative flex-shrink-0 w-5 h-5 flex items-center justify-center">
      <span className="absolute w-3.5 h-px bg-warm-gray/50 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
      <span className="absolute w-px h-3.5 bg-warm-gray/50 transition-transform duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]" style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)' }} />
    </span>
  );
}

export default function FAQ() {
  const { config } = useSiteConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = config?.faq || {
    eyebrow: 'Questions',
    heading: 'Commonly Asked',
    faqs: [
      { question: 'How far in advance should I book?', answer: '2–4 weeks in advance. This gives us time to understand your vision and prepare for your session.' },
      { question: 'Do you travel outside Bangalore?', answer: "Yes. We travel across India for sessions. Reach out and we'll plan an outstation shoot together." },
      { question: 'When is the best time for a maternity shoot?', answer: 'Between 6 and 8 months of pregnancy. For twins, anytime from 5 months.' },
      { question: 'When should I book a newborn session?', answer: 'Within the first 0–30 days. Babies up to 3 months are still considered newborns for photography.' },
      { question: 'Can my family be included?', answer: 'Absolutely. Every session includes your partner and children.' },
    ],
  };

  const items = faqData.faqs?.length > 0
    ? faqData.faqs
    : [
        { question: 'How far in advance should I book?', answer: '2–4 weeks in advance. This gives us time to understand your vision and prepare for your session.' },
        { question: 'Do you travel outside Bangalore?', answer: "Yes. We travel across India for sessions. Reach out and we'll plan an outstation shoot together." },
        { question: 'When is the best time for a maternity shoot?', answer: 'Between 6 and 8 months of pregnancy. For twins, anytime from 5 months.' },
        { question: 'When should I book a newborn session?', answer: 'Within the first 0–30 days. Babies up to 3 months are still considered newborns for photography.' },
        { question: 'Can my family be included?', answer: 'Absolutely. Every session includes your partner and children.' },
      ];

  return (
    <section className="py-28 md:py-36 bg-cream/20">
      <div className="container-editorial">
        <div className="max-w-3xl mx-auto">
          <div className="mb-14">
            <span className="font-mono text-[11px] text-magenta/60 uppercase tracking-[0.35em]">{faqData.eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">{faqData.heading}</h2>
          </div>

          <div className="flex flex-col gap-3">
            {items.map((faq: any, i: number) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-sm border border-beige/30 rounded-sm"
                >
                   <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full py-6 px-8 flex items-center justify-between text-left group transition-colors duration-300 hover:bg-white/40"
                    aria-expanded={openIndex === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                  >
                    <span className="font-sans text-base font-medium text-rich-black pr-4">
                      {faq.question}
                    </span>
                    <PlusIcon open={isOpen} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                        id={`faq-answer-${i}`}
                        role="region"
                      >
                        <p className="font-sans text-sm text-warm-gray/60 pb-6 px-8 leading-relaxed">
                          {faq.answer}
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
