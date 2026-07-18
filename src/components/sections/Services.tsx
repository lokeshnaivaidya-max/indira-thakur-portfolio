'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Newborn',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep.',
    gradient: 'from-[#2C1810] via-[#1A1A1A] to-[#2C2C2C]',
    layout: 'fullscreen',
  },
  {
    title: 'Maternity',
    description: 'You are changing, creating, and giving. A celebration of the life growing within you.',
    gradient: 'from-[#3D2C25] via-[#2C1810] to-[#1A1A1A]',
    layout: 'split',
  },
  {
    title: 'Portrait & Events',
    description: 'From personal portraits to brand collaborations. Every session a unique cinematic narrative.',
    gradient: 'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]',
    layout: 'bleed',
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-ivory">
      <div className="container-editorial py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">The Chapters</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">What I Offer</h2>
        </motion.div>
      </div>

      <div className="space-y-1 md:space-y-2">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Full-screen hero-style image */}
            {service.layout === 'fullscreen' && (
              <div className="relative h-[70vh] md:h-[80vh] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 via-transparent to-black/30" />
                </div>
                <div className="absolute bottom-12 md:bottom-20 left-8 md:left-16 lg:left-24 max-w-md">
                  <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.25em]">The First Chapter</p>
                  <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mt-2 leading-[1.05]">{service.title}</h3>
                  <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed max-w-sm">{service.description}</p>
                  <Link href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors duration-500">
                    <span className="w-4 h-px bg-white/30" />
                    Enquire
                  </Link>
                </div>
              </div>
            )}

            {/* Split screen */}
            {service.layout === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`h-[50vh] lg:h-[70vh] bg-gradient-to-br ${service.gradient}`} />
                <div className="flex items-center px-8 md:px-16 py-12 lg:py-0">
                  <div className="max-w-sm">
                    <p className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.25em]">The Glow Within</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-rich-black mt-2">{service.title}</h3>
                    <div className="w-6 h-px bg-magenta/25 mt-5" />
                    <p className="font-sans text-sm text-warm-gray/50 mt-5 leading-relaxed">{service.description}</p>
                    <Link href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
                      <span className="w-4 h-px bg-magenta/25" />
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Bleed layout — image bleeds off page */}
            {service.layout === 'bleed' && (
              <div className="relative overflow-hidden">
                <div className={`h-[60vh] md:h-[75vh] bg-gradient-to-br ${service.gradient} -mx-8 md:-mx-16 lg:-mx-24`}>
                  <div className="absolute inset-0 bg-gradient-to-l from-ivory/10 via-transparent to-black/20" />
                </div>
                <div className="absolute bottom-8 md:bottom-16 right-8 md:right-16 lg:right-24 max-w-sm bg-ivory/90 backdrop-blur-sm p-6 md:p-8">
                  <p className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.25em]">Your Story, Your Way</p>
                  <h3 className="font-serif text-2xl md:text-3xl text-rich-black mt-2">{service.title}</h3>
                  <div className="w-6 h-px bg-magenta/25 mt-4" />
                  <p className="font-sans text-xs text-warm-gray/50 mt-4 leading-relaxed">{service.description}</p>
                  <Link href="/#contact" className="inline-flex items-center gap-2 mt-5 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
                    <span className="w-4 h-px bg-magenta/25" />
                    Enquire
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
