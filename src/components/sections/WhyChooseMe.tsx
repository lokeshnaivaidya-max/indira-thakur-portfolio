'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';

const reasons = [
  {
    title: 'Artistic Vision',
    description: 'Every frame is thoughtfully composed with an artist\'s eye, creating images that are not just photographs but works of art.',
    icon: '◈',
  },
  {
    title: 'Personalized Experience',
    description: 'Your session is uniquely tailored to your story, personality, and vision. No two shoots are ever the same.',
    icon: '◈',
  },
  {
    title: 'Premium Quality',
    description: 'Museum-grade prints and heirloom-quality digital files ensure your memories last for generations.',
    icon: '◈',
  },
  {
    title: 'Comfort & Trust',
    description: 'A warm, judgment-free environment where you can relax and be yourself. Your comfort is my priority.',
    icon: '◈',
  },
  {
    title: 'Attention to Detail',
    description: 'From wardrobe styling to post-production editing, every detail is meticulously crafted to perfection.',
    icon: '◈',
  },
  {
    title: 'Timeless Results',
    description: 'Photographs that transcend trends and remain beautiful, relevant, and cherished for a lifetime.',
    icon: '◈',
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

export default function WhyChooseMe() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-cream/30 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_20%_50%,_#C9A96E_0%,_transparent_50%)]" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          subtitle="Why Indira?"
          title="Why Choose Me"
          description="Choosing a photographer is about trust. Here's why families trust me with their most precious moments."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.title}
              variants={cardVariants}
              className="premium-card p-8 md:p-10 text-center group"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warm-blush/50 flex items-center justify-center group-hover:bg-muted-gold/20 transition-colors duration-500">
                <span className="text-2xl text-muted-gold">{reason.icon}</span>
              </div>
              <h3 className="font-serif text-xl md:text-2xl text-warm-black mb-4">{reason.title}</h3>
              <p className="text-earth-brown/70 font-sans-alt text-sm leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
