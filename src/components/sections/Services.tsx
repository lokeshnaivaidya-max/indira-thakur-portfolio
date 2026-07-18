'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  { title: 'Newborn Photography', slug: 'newborn', description: 'Preserve the purest moments of your little one\'s first days with gentle, artistic newborn photography.', gradient: 'from-cream to-soft-cream' },
  { title: 'Maternity Photography', slug: 'maternity', description: 'Celebrate the beauty of motherhood with elegant maternity sessions that glow with love and anticipation.', gradient: 'from-soft-cream to-cream' },
  { title: 'Portrait Photography', slug: 'portrait', description: 'Timeless portraits that capture your unique personality and natural beauty with artistic flair.', gradient: 'from-cream to-warm-white' },
  { title: 'Personal & Corporate Events', slug: 'events', description: 'From family gatherings to corporate galas, document your special moments with cinematic storytelling.', gradient: 'from-soft-cream to-warm-white' },
  { title: 'Brand Collaborations', slug: 'brand', description: 'Creative visual content for brands looking to tell their story through stunning, professional photography.', gradient: 'from-cream to-soft-cream' },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-cream/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">What I Offer</span>
          <h2 className="section-title mt-3">Photography Services</h2>
          <p className="mt-4 text-warm-brown/70 font-sans-alt max-w-xl mx-auto">Every session is a unique experience designed to capture your most cherished moments.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={`/services/${service.slug}`} className="card block group">
                <div className={`aspect-4-3 bg-gradient-to-br ${service.gradient}`} />
                <div className="p-6">
                  <h3 className="font-serif text-xl text-warm-black group-hover:text-muted-gold transition-colors">{service.title}</h3>
                  <p className="mt-2 text-warm-brown/70 font-sans-alt text-sm leading-relaxed">{service.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
