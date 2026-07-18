'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Newborn',
    subtitle: '01',
    gradient: 'from-[#1A1110] via-[#2C1810] to-[#1A1A1A]',
  },
  {
    title: 'Maternity',
    subtitle: '02',
    gradient: 'from-[#2C1810] via-[#3D2C25] to-[#1A1110]',
  },
  {
    title: 'Portrait & Events',
    subtitle: '03',
    gradient: 'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-rich-black">
      {services.map((service, i) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative w-full border-t border-white/[0.03] first:border-t-0"
        >
          <div className={`h-[70vh] md:h-[85vh] bg-gradient-to-br ${service.gradient}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-rich-black/30 via-transparent to-transparent" />
          </div>

          <div className={`absolute ${i === 2 ? 'bottom-14 right-8 md:right-16 lg:right-24 text-right' : 'bottom-14 left-8 md:left-16 lg:left-24'}`}>
            <p className="font-mono text-[8px] text-white/30 uppercase tracking-[0.35em]">{service.subtitle}</p>
            <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-1 leading-[1.05]">{service.title}</h3>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 mt-5 font-sans text-[9px] text-white/40 uppercase tracking-[0.3em] hover:text-white/70 transition-colors duration-500"
            >
              <span className="w-4 h-px bg-white/20" />
              Enquire
            </Link>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
