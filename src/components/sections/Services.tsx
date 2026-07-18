'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Newborn Photography',
    subtitle: 'The First Chapter',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate and artistic way.',
    gradient: 'from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]',
    layout: 'hero',
  },
  {
    title: 'Maternity Photography',
    subtitle: 'The Glow Within',
    description: 'You are changing, creating, and giving. Here is a way to remember the magic your body can do — bathed in golden light and infinite tenderness.',
    gradient: 'from-[#3D3D3D] via-[#2C2C2C] to-[#1A1A1A]',
    layout: 'split',
  },
  {
    title: 'Portrait & Events',
    subtitle: 'Your Story, Your Way',
    description: 'From personal portraits to brand collaborations. Every session is a unique narrative told through cinematic frames with elegance and depth.',
    gradient: 'from-[#1A1A1A] via-[#2C2C2C] to-[#3D3D3D]',
    layout: 'panel',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-32 md:py-40 bg-cream/20">
      <div className="container-editorial mb-16 md:mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">The Chapters</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">What I Offer</h2>
        </motion.div>
      </div>

      <div className="space-y-8 md:space-y-12">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: i * 0.1 }}
          >
            {/* Layout 1: Full-width hero image with text overlay */}
            {service.layout === 'hero' && (
              <div className="relative overflow-hidden">
                <div className={`aspect-[3/1] md:aspect-[4/1] bg-gradient-to-br ${service.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container-editorial w-full">
                    <div className="max-w-lg">
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">{service.subtitle}</p>
                      <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-2">{service.title}</h3>
                      <p className="font-sans text-sm md:text-base text-white/50 mt-4 leading-relaxed">{service.description}</p>
                      <Link href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors duration-500">
                        <span className="w-5 h-px bg-white/30" />
                        Enquire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Layout 2: Split screen - image left, text right */}
            {service.layout === 'split' && (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`aspect-[4/3] lg:aspect-auto bg-gradient-to-br ${service.gradient}`} />
                <div className="bg-ivory flex items-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
                  <div className="max-w-md">
                    <p className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.25em]">{service.subtitle}</p>
                    <h3 className="font-serif text-3xl md:text-4xl text-rich-black mt-2">{service.title}</h3>
                    <div className="w-8 h-px bg-magenta/25 mt-6" />
                    <p className="font-sans text-sm md:text-base text-warm-gray/60 mt-6 leading-relaxed">{service.description}</p>
                    <Link href="/#contact" className="inline-flex items-center gap-2 mt-8 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
                      <span className="w-5 h-px bg-magenta/25" />
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Layout 3: Image with floating text panel */}
            {service.layout === 'panel' && (
              <div className="container-editorial">
                <div className="relative">
                  <div className={`aspect-[5/2] md:aspect-[6/2] bg-gradient-to-br ${service.gradient}`} />
                  <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 bg-ivory p-6 md:p-10 max-w-md">
                    <p className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.25em]">{service.subtitle}</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-rich-black mt-2">{service.title}</h3>
                    <div className="w-8 h-px bg-magenta/25 mt-4" />
                    <p className="font-sans text-sm text-warm-gray/60 mt-4 leading-relaxed">{service.description}</p>
                    <Link href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
                      <span className="w-5 h-px bg-magenta/25" />
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
