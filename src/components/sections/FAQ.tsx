'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiPlus, HiMinus } from 'react-icons/hi2';

const faqs = [
  {
    question: 'How do I book a session with Indira?',
    answer: 'Booking is easy! Simply fill out the contact form on our website, and we\'ll get back to you within 24 hours to discuss your vision, answer any questions, and schedule your session. A booking deposit is required to secure your date.',
  },
  {
    question: 'How long does a typical session last?',
    answer: 'Session lengths vary depending on the type. Newborn sessions typically last 2-3 hours, maternity sessions 1-2 hours, portrait sessions 1-2 hours, and event coverage depends on the package you choose. We\'ll discuss timeline details during your consultation.',
  },
  {
    question: 'What should I wear for my photoshoot?',
    answer: 'I provide detailed styling guidance to all my clients. Generally, I recommend solid colors, soft textures, and outfits that make you feel confident and comfortable. Avoid busy patterns and logos. I\'ll help you curate the perfect wardrobe for your session.',
  },
  {
    question: 'When is the best time to book a maternity session?',
    answer: 'The ideal time for maternity photography is between 28-34 weeks of pregnancy, when the belly is beautifully rounded but you\'re still comfortable. I recommend booking your session at least 2-3 months in advance to secure your preferred date.',
  },
  {
    question: 'When should I book a newborn session?',
    answer: 'Newborn sessions are best done within the first 5-14 days after birth while babies are still sleepy and curly. I recommend booking during your second trimester to ensure availability around your due date. I\'ll remain flexible with the exact date.',
  },
  {
    question: 'Do you offer digital files or prints?',
    answer: 'Both! All my packages include high-resolution digital files with printing rights. I also offer premium, museum-grade prints, albums, and wall art through professional labs to ensure your photographs look stunning in your home.',
  },
  {
    question: 'Where do sessions take place?',
    answer: 'I offer both studio and location sessions. My studio is a warm, beautifully designed space in the heart of the city. For location sessions, I have a curated list of beautiful spots, or we can discuss a location that\'s meaningful to you.',
  },
  {
    question: 'What is your editing style?',
    answer: 'My editing style is timeless, natural, and elegant. I enhance the beauty of your images while keeping them authentic and true to life. I aim for a warm, soft, and editorial look that will remain beautiful for generations.',
  },
  {
    question: 'Can I include family members in my session?',
    answer: 'Absolutely! Many of my sessions include family members. Maternity sessions often include partners and siblings, and newborn sessions welcome the entire family. We\'ll discuss the details during your consultation.',
  },
  {
    question: 'What is your cancellation policy?',
    answer: 'I understand that plans change. Your booking deposit is non-refundable but can be transferred to a different date if you provide at least 48 hours notice. For full details, please refer to our booking policy.',
  },
];

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
