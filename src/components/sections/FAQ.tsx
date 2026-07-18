'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiPlus, HiMinus } from 'react-icons/hi2';

const faqs: any[] = [];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="section-padding bg-soft-white">
      <div className="max-w-3xl mx-auto">
        <SectionHeading
          subtitle="Questions?"
          title="Frequently Asked Questions"
          description="Everything you need to know about working with me."
        />

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-warm-cream/60 rounded-sm overflow-hidden transition-all duration-300 hover:border-warm-beige/30"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left bg-soft-white hover:bg-warm-ivory transition-colors duration-300"
              >
                <span className="font-serif text-lg md:text-xl text-warm-black pr-4">{faq.question}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-muted-gold/30 flex items-center justify-center text-muted-gold transition-transform duration-300">
                  {openIndex === index ? (
                    <HiMinus className="w-3 h-3" />
                  ) : (
                    <HiPlus className="w-3 h-3" />
                  )}
                </span>
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 md:px-8 pb-6 md:pb-8">
                      <p className="text-earth-brown/70 font-sans-alt text-sm leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
