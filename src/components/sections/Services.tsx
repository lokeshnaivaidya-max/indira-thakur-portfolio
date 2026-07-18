'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const services = [
  {
    title: 'Newborn Photography',
    tag: '01',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate and artistic way.',
    gradient: 'from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]',
    layout: 'image-left',
  },
  {
    title: 'Maternity Photography',
    tag: '02',
    description: 'You are changing, creating, and giving. Here is a way to remember the magic your body can do — bathed in golden light and infinite tenderness.',
    gradient: 'from-[#3D3D3D] via-[#2C2C2C] to-[#1A1A1A]',
    layout: 'image-right',
  },
  {
    title: 'Portrait & Events',
    tag: '03',
    description: 'From personal portraits to brand collaborations, every session is a unique narrative. Cinematic frames that tell your story with elegance and depth.',
    gradient: 'from-[#1A1A1A] via-[#2C2C2C] to-[#3D3D3D]',
    layout: 'full-bleed',
  },
];

export default function Services() {
  return (
    <section id="services" className="section-spacing bg-cream/30">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 md:mb-28"
        >
          <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">The Chapters</p>
          <h2 className="heading-lg mt-6">
            What I Offer
          </h2>
        </motion.div>

        <div className="space-y-24 md:space-y-32">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {service.layout === 'image-left' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-7">
                    <div className={`aspect-[5/4] bg-gradient-to-br ${service.gradient}`} />
                  </div>
                  <div className="lg:col-span-5">
                    <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">{service.tag}</p>
                    <h3 className="heading-md mt-3">{service.title}</h3>
                    <div className="divider-line mt-6" />
                    <p className="body-md mt-6">{service.description}</p>
                    <Link href="/#contact" className="btn-outline mt-8 inline-flex">
                      Enquire
                    </Link>
                  </div>
                </div>
              )}

              {service.layout === 'image-right' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
                  <div className="lg:col-span-5 lg:order-1">
                    <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">{service.tag}</p>
                    <h3 className="heading-md mt-3">{service.title}</h3>
                    <div className="divider-line mt-6" />
                    <p className="body-md mt-6">{service.description}</p>
                    <Link href="/#contact" className="btn-outline mt-8 inline-flex">
                      Enquire
                    </Link>
                  </div>
                  <div className="lg:col-span-7">
                    <div className={`aspect-[5/4] bg-gradient-to-br ${service.gradient}`} />
                  </div>
                </div>
              )}

              {service.layout === 'full-bleed' && (
                <div className="relative">
                  <div className={`aspect-[3/1] bg-gradient-to-br ${service.gradient}`} />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                    <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.15em]">{service.tag}</p>
                    <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-3">{service.title}</h3>
                    <div className="w-12 h-px bg-white/30 mt-6" />
                    <p className="body-md text-white/60 mt-6 max-w-lg">{service.description}</p>
                    <Link href="/#contact" className="inline-flex items-center justify-center px-10 py-4 border border-white/20 text-white/80 font-sans text-xs font-medium tracking-[0.15em] uppercase transition-all duration-700 hover:border-white/50 hover:text-white mt-8">
                      Enquire
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
