'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Newborn Photography',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate and artistic way.',
    gradient: 'from-[#2C1810] via-[#1A1A1A] to-[#2C2C2C]',
    layout: 'hero',
  },
  {
    title: 'Maternity Photography',
    description: 'You are changing, creating, and giving. A celebration of the life growing within you, bathed in warmth and tenderness.',
    gradient: 'from-[#3D2C25] via-[#2C1810] to-[#1A1A1A]',
    layout: 'split',
  },
  {
    title: 'Portrait Photography',
    description: 'Personal portraits that reveal the real you. Milestone birthdays, personal brand sessions, or simply because you deserve to be photographed beautifully.',
    gradient: 'from-[#1A1A1A] via-[#2C1810] to-[#3D2C25]',
    layout: 'hero',
  },
  {
    title: 'Events & Brand Collaborations',
    description: 'From intimate gatherings to brand campaigns. Our lens brings a cinematic quality to every project with authentic storytelling.',
    gradient: 'from-[#3D2C25] via-[#2C1810] to-[#2C2C2C]',
    layout: 'split',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-36 pb-20">
      <div className="container-editorial mb-16">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">What I Offer</span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-3">Services</h1>
        </motion.div>
      </div>

      <div className="space-y-1">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {service.layout === 'hero' ? (
              <div className="relative h-[60vh] md:h-[70vh] overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-ivory/20 via-transparent to-black/30" />
                </div>
                <div className="absolute bottom-12 md:bottom-20 left-8 md:left-16 lg:left-24 max-w-lg">
                  <p className="font-mono text-[9px] text-white/40 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                  <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white mt-2 leading-[1.05]">{service.title}</h2>
                  <p className="font-sans text-sm text-white/50 mt-4 leading-relaxed max-w-md">{service.description}</p>
                  <a href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-white/50 uppercase tracking-[0.2em] hover:text-white transition-colors">
                    <span className="w-4 h-px bg-white/30" />Enquire
                  </a>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`h-[40vh] lg:h-[65vh] bg-gradient-to-br ${service.gradient}`} />
                <div className="flex items-center px-8 md:px-16 py-12 lg:py-0">
                  <div className="max-w-sm">
                    <p className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.25em]">{String(i + 1).padStart(2, '0')}</p>
                    <h2 className="font-serif text-3xl md:text-4xl text-rich-black mt-2">{service.title}</h2>
                    <div className="w-6 h-px bg-magenta/25 mt-5" />
                    <p className="font-sans text-sm text-warm-gray/50 mt-5 leading-relaxed">{service.description}</p>
                    <a href="/#contact" className="inline-flex items-center gap-2 mt-6 font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors">
                      <span className="w-4 h-px bg-magenta/25" />Enquire
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
