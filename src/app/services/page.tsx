'use client';

import { motion } from 'framer-motion';

const services = [
  {
    title: 'Newborn Photography',
    description: 'Every tiny detail captured for eternity. The first yawn, the tiny fingers, the peaceful sleep — preserved in the most delicate and artistic way. Our newborn sessions are gentle, patient, and designed around your baby\'s comfort.',
    gradient: 'from-[#2C2C2C] via-[#3D3D3D] to-[#1A1A1A]',
  },
  {
    title: 'Maternity Photography',
    description: 'You are changing, creating, and giving. Here is a way to remember the magic your body can do. Bathed in golden light and infinite tenderness, your maternity session is a celebration of the life growing within you.',
    gradient: 'from-[#3D3D3D] via-[#2C2C2C] to-[#1A1A1A]',
  },
  {
    title: 'Portrait Photography',
    description: 'Personal portraits that reveal the real you. Whether it\'s a milestone birthday, a personal brand session, or simply because you deserve to be photographed beautifully — every portrait tells your unique story.',
    gradient: 'from-[#1A1A1A] via-[#2C2C2C] to-[#3D3D3D]',
  },
  {
    title: 'Events & Brand Collaborations',
    description: 'From intimate gatherings to brand campaigns, our lens brings a cinematic quality to every project. We collaborate with brands and individuals who value authentic storytelling and visual excellence.',
    gradient: 'from-[#2C2C2C] via-[#1A1A1A] to-[#3D3D3D]',
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 md:pt-36 pb-24">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">What I Offer</p>
          <h1 className="heading-lg mt-6">Services</h1>
          <p className="body-md mt-4 max-w-lg mx-auto text-warm-gray/60">
            Every session is a unique experience designed to capture your most cherished moments with artistry and heart.
          </p>
        </motion.div>
      </div>

      <div className="space-y-0">
        {services.map((service, i) => (
          <div
            key={service.title}
            className={`grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] ${
              i % 2 === 0 ? '' : 'lg:direction-rtl'
            }`}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className={`bg-gradient-to-br ${service.gradient} min-h-[40vh] lg:min-h-[60vh] ${i % 2 === 0 ? '' : 'lg:order-2'}`}
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={`flex items-center px-8 md:px-16 lg:px-24 py-16 ${i % 2 === 0 ? '' : 'lg:order-1'}`}
            >
              <div className="max-w-lg">
                <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h2 className="heading-md mt-3">{service.title}</h2>
                <div className="divider-line mt-6" />
                <p className="body-md mt-6">{service.description}</p>
                <a href="/#contact" className="btn-primary mt-10 inline-flex">
                  Enquire About This Session
                </a>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
}
