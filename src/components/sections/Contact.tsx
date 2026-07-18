'use client';

import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function Contact() {
  const { config } = useSiteConfig();

  const contactData = config?.contact || {
    eyebrow: "Let's Create",
    heading: 'Begin Your Story',
    description: 'Every beautiful photograph begins with a conversation.',
    email: 'hello@indirathakur.com',
    phone: '+91 99999 99999',
    location: 'Bangalore, India',
    bannerImage: { url: '', alt: '' },
    studioImage: { url: '', alt: '' },
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <section id="contact" className="py-28 md:py-36 bg-ivory">
      <div className="container-editorial">
        {/* Banner Image */}
        {hasImage(contactData.bannerImage?.url) && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="mb-16 overflow-hidden"
          >
            <img
              src={contactData.bannerImage.url}
              alt={contactData.bannerImage.alt || 'Contact Banner'}
              className="w-full h-[30vh] md:h-[40vh] object-cover"
            />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">{contactData.eyebrow}</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">
              {contactData.heading}
            </h2>
            <div className="w-5 h-px bg-magenta/25 mt-6" />
            <p className="font-sans text-sm text-warm-gray/50 mt-5 max-w-xs leading-relaxed">
              {contactData.description}
            </p>

            <div className="mt-10 space-y-4">
              {[
                contactData.email,
                contactData.phone,
                contactData.location,
              ].filter(Boolean).map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-px h-3.5 bg-magenta/15" />
                  <p className="font-sans text-xs text-warm-gray/50">{item}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {hasImage(contactData.studioImage?.url) ? (
              <div className="relative overflow-hidden mb-8">
                <img
                  src={contactData.studioImage.url}
                  alt={contactData.studioImage.alt || 'Studio'}
                  className="w-full h-[30vh] md:h-[35vh] object-cover"
                />
              </div>
            ) : (
              <ImagePlaceholder
                aspect="h-[30vh] md:h-[35vh]"
                label="Studio Image"
                icon="camera"
                className="mb-8"
              />
            )}

            <form className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Name" className="input-field" />
                <input type="email" placeholder="Email" className="input-field" />
              </div>
              <input type="tel" placeholder="Phone" className="input-field" />
              <select className="input-field appearance-none bg-white">
                <option value="">Interested in...</option>
                <option value="newborn">Newborn</option>
                <option value="maternity">Maternity</option>
                <option value="portrait">Portrait</option>
                <option value="events">Events & Brand</option>
              </select>
              <textarea placeholder="Your vision..." className="textarea-field" rows={3} />
              <button type="submit" className="w-full py-3.5 bg-rich-black text-white font-sans text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-500 hover:bg-charcoal">
                Send
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
