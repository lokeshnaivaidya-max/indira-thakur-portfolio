'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36 bg-ivory">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Let&apos;s Create</span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">
              Begin Your Story
            </h2>
            <div className="w-5 h-px bg-magenta/25 mt-6" />
            <p className="font-sans text-sm text-warm-gray/50 mt-5 max-w-xs leading-relaxed">
              Every beautiful photograph begins with a conversation.
            </p>

            <div className="mt-10 space-y-4">
              {[
                'hello@indirathakur.com',
                '+91 99999 99999',
                'Bangalore, India',
              ].map((item) => (
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
