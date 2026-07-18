'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Newborn',
    subtitle: 'The First Chapter',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate way.',
    gradient: 'from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]',
    layout: 'wide',
  },
  {
    title: 'Maternity',
    subtitle: 'The Glow Within',
    description: 'You are changing, creating, and giving. A celebration of the life growing within you, bathed in warmth and tenderness.',
    gradient: 'from-[#3D3D3D] via-[#2C2C2C] to-[#1A1A1A]',
    layout: 'tall',
  },
  {
    title: 'Portrait & Events',
    subtitle: 'Your Story, Your Way',
    description: 'From personal portraits to brand collaborations. Every session is a unique narrative told through cinematic frames.',
    gradient: 'from-[#1A1A1A] via-[#2C2C2C] to-[#3D3D3D]',
    layout: 'wide',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 md:py-36 bg-cream/20">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-sans text-[10px] text-magenta/40 uppercase tracking-[0.3em]">The Chapters</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">
            What I Offer
          </h2>
        </motion.div>
      </div>

      <div className="space-y-4 md:space-y-6">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/#contact"
              className={`group block relative overflow-hidden ${
                service.layout === 'tall' ? 'aspect-[3/1] md:aspect-[5/1]' : 'aspect-[4/1] md:aspect-[6/1]'
              }`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} transition-transform duration-1000 ease-out group-hover:scale-105`} />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
              <div className="relative h-full flex items-center px-8 md:px-16 lg:px-24">
                <div className="max-w-xl">
                  <p className="font-sans text-[10px] text-white/40 uppercase tracking-[0.25em]">{service.subtitle}</p>
                  <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-2 group-hover:italic transition-all duration-700">
                    {service.title}
                  </h3>
                  <p className="font-sans text-sm md:text-base text-white/50 mt-4 max-w-md leading-relaxed">
                    {service.description}
                  </p>
                  <span className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-white/40 uppercase tracking-[0.2em] group-hover:text-white/80 transition-colors duration-500">
                    Enquire
                    <span className="w-6 h-px bg-white/30 group-hover:w-8 transition-all duration-500" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
