'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import RatingStars from '@/components/ui/RatingStars';

const reviews = [
  {
    name: 'Vikram Mehta',
    rating: 5,
    content: 'Absolutely outstanding photographer! Indira captured our family moments with such natural beauty and emotion. Highly recommend her services to anyone looking for premium photography.',
    date: '2 months ago',
  },
  {
    name: 'Lakshmi Iyer',
    rating: 5,
    content: 'Indira is incredibly talented and so easy to work with. She made our newborn shoot a wonderful experience. The photos are breathtaking!',
    date: '1 month ago',
  },
  {
    name: 'Rahul Deshmukh',
    rating: 5,
    content: 'We hired Indira for our corporate event and the results were phenomenal. Professional, unobtrusive, and the images perfectly captured the essence of our event.',
    date: '3 months ago',
  },
  {
    name: 'Neelam Joshi',
    rating: 5,
    content: 'The maternity shoot with Indira was an unforgettable experience. She has a gift for making you feel beautiful and comfortable. The photos are pure magic.',
    date: '2 weeks ago',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function GoogleReviews() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-soft-white">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          subtitle="Reviews"
          title="What Google Says"
          description="See why families rate their experience five stars."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="premium-card p-6 md:p-8"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted-gold to-warm-gold flex items-center justify-center">
                    <span className="text-soft-white font-bold text-sm">G</span>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-warm-black">{review.name}</p>
                  </div>
                </div>
                <span className="font-sans-alt text-xs text-earth-brown/50">{review.date}</span>
              </div>
              <div className="mb-3">
                <RatingStars rating={review.rating} />
              </div>
              <p className="text-earth-brown/70 font-sans-alt text-sm leading-relaxed">
                &ldquo;{review.content}&rdquo;
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-muted-gold/40 text-muted-gold font-sans-alt text-xs tracking-[0.15em] uppercase hover:bg-muted-gold hover:text-soft-white transition-all duration-500"
          >
            Leave a Review
          </a>
        </motion.div>
      </div>
    </section>
  );
}
