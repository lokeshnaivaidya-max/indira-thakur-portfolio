'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiArrowRight } from 'react-icons/hi2';

const services = [
  {
    title: 'Newborn Photography',
    slug: 'newborn',
    description: 'Preserve the purest moments of your little one\'s first days with gentle, artistic newborn photography.',
    gradient: 'from-soft-rose via-warm-blush to-cream',
    icon: '✦',
  },
  {
    title: 'Maternity Photography',
    slug: 'maternity',
    description: 'Celebrate the beauty of motherhood with elegant and emotional maternity sessions that glow with love.',
    gradient: 'from-warm-blush via-cream to-beige',
    icon: '✦',
  },
  {
    title: 'Portrait Photography',
    slug: 'portrait',
    description: 'Timeless portraits that capture your unique personality and natural beauty with artistic flair.',
    gradient: 'from-cream via-beige to-warm-beige',
    icon: '✦',
  },
  {
    title: 'Personal Events',
    slug: 'events',
    description: 'From birthdays to family gatherings, document your special moments with cinematic storytelling.',
    gradient: 'from-warm-cream via-beige to-soft-rose',
    icon: '✦',
  },
  {
    title: 'Corporate Events',
    slug: 'corporate',
    description: 'Professional event coverage that captures the essence of your brand and corporate culture.',
    gradient: 'from-cream via-warm-cream to-beige',
    icon: '✦',
  },
  {
    title: 'Brand Collaborations',
    slug: 'brand',
    description: 'Creative visual content for brands looking to tell their story through stunning photography.',
    gradient: 'from-warm-beige via-cream to-warm-cream',
    icon: '✦',
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
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Services() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="section-padding bg-warm-ivory relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_70%_30%,_#C9A96E_0%,_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          subtitle="What I Offer"
          title="Photography Services"
          description="Every session is a unique experience designed to capture your most cherished moments with artistry and heart."
        />

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.slug}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-sm bg-soft-white border border-warm-cream/50 transition-all duration-500 hover:shadow-lg hover:border-warm-beige/30"
            >
              <Link href={`/services/${service.slug}`} className="block">
                {/* Image Area */}
                <div className={`relative aspect-4-3 bg-gradient-to-br ${service.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-soft-white/80 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-muted-gold text-lg">{service.icon}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  <h3 className="font-serif text-2xl text-warm-black group-hover:text-muted-gold transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-earth-brown/70 font-sans-alt text-sm leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-earth-brown/50 group-hover:text-muted-gold transition-colors duration-500">
                    <span className="font-sans-alt text-xs tracking-[0.15em] uppercase">Learn More</span>
                    <HiArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-muted-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mt-16"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-warm-black text-warm-black font-sans-alt text-sm tracking-[0.15em] uppercase hover:bg-warm-black hover:text-soft-white transition-all duration-500"
          >
            View Full Portfolio
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
