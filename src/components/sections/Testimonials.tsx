'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import RatingStars from '@/components/ui/RatingStars';

const testimonials: any[] = [];

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

export default function Testimonials() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="testimonials" className="section-padding bg-cream/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_80%_20%,_#C9A96E_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          subtitle="Client Love"
          title="What Families Say"
          description="The greatest compliment is the trust my clients place in me. Here are their stories."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="premium-card p-8 md:p-10 flex flex-col"
            >
              {/* Client Image Placeholder */}
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${testimonial.gradient} mb-6 flex items-center justify-center`}>
                <span className="text-muted-gold font-serif-alt text-lg italic">
                  {testimonial.name.charAt(0)}
                </span>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <RatingStars rating={testimonial.rating} />
              </div>

              {/* Content */}
              <div className="flex-1">
                <p className="font-serif-alt text-base text-earth-brown/90 leading-relaxed italic">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              {/* Client Info */}
              <div className="mt-6 pt-6 border-t border-warm-cream/60">
                <p className="font-serif text-lg text-warm-black">{testimonial.name}</p>
                <p className="font-sans-alt text-xs text-earth-brown/60 tracking-wider uppercase mt-1">
                  {testimonial.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
