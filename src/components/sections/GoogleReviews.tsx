'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import RatingStars from '@/components/ui/RatingStars';

const reviews: any[] = [];

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
