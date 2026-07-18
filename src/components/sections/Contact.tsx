'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-32 md:py-40 bg-ivory">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Let&apos;s Create</span>
              <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">
                Begin Your
                <br />
                <span className="italic font-normal text-rich-black/50">Story</span>
              </h2>
              <div className="w-8 h-px bg-magenta/25 mt-8" />
              <p className="font-sans text-base md:text-lg text-warm-gray/60 leading-relaxed mt-8 max-w-sm">
                Every beautiful photograph begins with a conversation. Tell me about your vision, 
                and let&apos;s create something timeless together.
              </p>

              <div className="mt-12 space-y-5">
                <div className="flex items-center gap-4">
                  <span className="w-px h-6 bg-magenta/15" />
                  <div>
                    <p className="font-mono text-[9px] text-warm-gray/40 uppercase tracking-[0.2em]">Email</p>
                    <p className="font-sans text-sm text-rich-black/60 mt-0.5">hello@indirathakur.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-px h-6 bg-magenta/15" />
                  <div>
                    <p className="font-mono text-[9px] text-warm-gray/40 uppercase tracking-[0.2em]">Phone</p>
                    <p className="font-sans text-sm text-rich-black/60 mt-0.5">+91 99999 99999</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-px h-6 bg-magenta/15" />
                  <div>
                    <p className="font-mono text-[9px] text-warm-gray/40 uppercase tracking-[0.2em]">Location</p>
                    <p className="font-sans text-sm text-rich-black/60 mt-0.5">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <textarea placeholder="Tell me about your vision..." className="textarea-field" rows={4} />
                <button type="submit" className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden w-full md:w-auto">
                  <span className="absolute inset-0 bg-rich-black transition-all duration-700 ease-out group-hover:bg-charcoal" />
                  <span className="relative font-sans text-[11px] text-white uppercase tracking-[0.2em] font-medium">
                    Send Enquiry
                  </span>
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
