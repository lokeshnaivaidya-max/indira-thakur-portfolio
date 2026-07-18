'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiMinus } from 'react-icons/hi2';

const faqs: { question: string; answer: string }[] = [];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-cream/30">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Questions?</span>
          <h2 className="section-title mt-3">Frequently Asked Questions</h2>
        </div>

        {faqs.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-sm">
            <p className="text-warm-brown/60 font-sans-alt">FAQ content coming soon.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-sm overflow-hidden">
                <button onClick={() => setOpenIndex(openIndex === index ? null : index)} className="w-full flex items-center justify-between p-5 text-left">
                  <span className="font-serif text-lg text-warm-black pr-4">{faq.question}</span>
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-muted-gold/30 flex items-center justify-center text-muted-gold">
                    {openIndex === index ? <HiMinus className="w-3 h-3" /> : <HiPlus className="w-3 h-3" />}
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-warm-brown/70 font-sans-alt text-sm leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
