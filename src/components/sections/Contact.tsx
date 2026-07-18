'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 bg-cream/20">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">Let&apos;s Create</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">
              Begin Your
              <br />
              <span className="italic font-normal text-rich-black/40">Story</span>
            </h2>
            <div className="w-6 h-px bg-magenta/25 mt-6" />
            <p className="font-sans text-sm text-warm-gray/50 mt-6 max-w-xs leading-relaxed">
              Every beautiful photograph begins with a conversation. Tell me about your vision.
            </p>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-px h-4 bg-magenta/15" />
                <p className="font-sans text-xs text-warm-gray/50">hello@indirathakur.com</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-px h-4 bg-magenta/15" />
                <p className="font-sans text-xs text-warm-gray/50">+91 99999 99999</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-px h-4 bg-magenta/15" />
                <p className="font-sans text-xs text-warm-gray/50">Bangalore, India</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" placeholder="Your Name" className="input-field" />
                <input type="email" placeholder="Your Email" className="input-field" />
              </div>
              <input type="tel" placeholder="Phone Number" className="input-field" />
              <select className="input-field appearance-none bg-white">
                <option value="">I&apos;m interested in...</option>
                <option value="newborn">Newborn Photography</option>
                <option value="maternity">Maternity Photography</option>
                <option value="portrait">Portrait Photography</option>
                <option value="events">Events & Brand Collaborations</option>
              </select>
              <textarea placeholder="Your vision..." className="textarea-field" rows={3} />
              <button type="submit" className="w-full py-3.5 bg-rich-black text-white font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-500 hover:bg-charcoal">
                Send Enquiry
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
