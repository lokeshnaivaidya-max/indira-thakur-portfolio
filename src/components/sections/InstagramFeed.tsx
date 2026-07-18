'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';
import { FaInstagram } from 'react-icons/fa6';

const posts = [
  { id: 1, gradient: 'from-soft-rose to-warm-blush' },
  { id: 2, gradient: 'from-warm-blush to-cream' },
  { id: 3, gradient: 'from-cream to-beige' },
  { id: 4, gradient: 'from-warm-cream to-beige' },
  { id: 5, gradient: 'from-warm-blush to-beige' },
  { id: 6, gradient: 'from-soft-rose to-cream' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function InstagramFeed() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-cream/30">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          subtitle="Follow Along"
          title="@indirathakur"
          description="Follow me on Instagram for behind-the-scenes moments, latest shoots, and daily inspiration."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4"
        >
          {posts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="aspect-square bg-gradient-to-br rounded-sm overflow-hidden group cursor-pointer relative"
            >
              <div className="absolute inset-0 bg-warm-black/0 group-hover:bg-warm-black/30 transition-all duration-500 flex items-center justify-center">
                <svg className="w-8 h-8 text-soft-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
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
            href="https://instagram.com/indirathakur"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-warm-black text-soft-white font-sans-alt text-sm tracking-[0.15em] uppercase hover:bg-earth-brown transition-all duration-500"
          >
            <FaInstagram className="w-4 h-4" />
            Follow on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}
