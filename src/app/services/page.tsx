'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Newborn Photography',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate and artistic way.',
    gradient: 'from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]',
    layout: 'full',
  },
  {
    title: 'Maternity Photography',
    description: 'You are changing, creating, and giving. A celebration of the life growing within you, bathed in warmth and tenderness.',
    gradient: 'from-[#3D3D3D] via-[#2C2C2C] to-[#1A1A1A]',
    layout: 'split',
  },
  {
    title: 'Portrait Photography',
    description: 'Personal portraits that reveal the real you. Milestone birthdays, personal brand sessions, or simply because you deserve to be photographed beautifully.',
    gradient: 'from-[#1A1A1A] via-[#2C2C2C] to-[#3D3D3D]',
    layout: 'full',
  },
  {
    title: 'Events & Brand Collaborations',
    description: 'From intimate gatherings to brand campaigns, our lens brings a cinematic quality to every project. Authentic storytelling and visual excellence.',
    gradient: 'from-[#2C2C2C] via-[#1A1A1A] to-[#3D3D3D]',
    layout: 'split',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-32 md:pt-40 pb-24">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">What I Offer</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-4">Services</h1>
          <p className="font-sans text-sm md:text-base text-warm-gray/50 mt-4 max-w-md leading-relaxed">
            Every session is a unique experience designed to capture your most cherished moments with artistry and heart.
          </p>
        </motion.div>
      </div>

      <div className="space-y-6 md:space-y-8">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {service.layout === 'full' ? (
              <div className="relative overflow-hidden">
                <div className={`aspect-[3/1] md:aspect-[4/1] bg-gradient-to-br ${service.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/10 to-transparent" />
                </div>
                <div className="absolute inset-0 flex items-center">
                  <div className="container-editorial w-full">
                    <div className="max-w-lg">
                      <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                      <h2 className="font-serif text-3xl md:text-4xl text-white mt-2">{service.title}</h2>
                      <p className="font-sans text-sm md:text-base text-white/50 mt-4 leading-relaxed">{service.description}</p>
                      <a href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors duration-500">
                        <span className="w-5 h-px bg-white/30" />Enquire
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`aspect-[4/3] lg:aspect-auto bg-gradient-to-br ${service.gradient}`} />
                <div className="bg-ivory flex items-center px-8 md:px-16 lg:px-20 py-16 lg:py-0">
                  <div className="max-w-md">
                    <p className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-rich-black mt-2">{service.title}</h2>
                    <div className="w-8 h-px bg-magenta/25 mt-6" />
                    <p className="font-sans text-sm md:text-base text-warm-gray/60 mt-6 leading-relaxed">{service.description}</p>
                    <a href="/#contact" className="inline-flex items-center gap-2 mt-8 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500">
                      <span className="w-5 h-px bg-magenta/25" />Enquire
                    </a>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
