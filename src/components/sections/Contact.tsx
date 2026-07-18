'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="font-sans text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Let&apos;s Create</span>
              <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">
                Begin Your
                <br />
                <span className="italic font-normal">Story</span>
              </h2>
              <div className="w-10 h-px bg-magenta/30 mt-8" />
              <p className="font-sans text-base md:text-lg text-warm-gray/60 leading-relaxed mt-8 max-w-md">
                Every beautiful photograph begins with a conversation. Tell me about your vision, 
                and let&apos;s create something timeless together.
              </p>

              <div className="mt-12 space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-px h-8 bg-magenta/20" />
                  <div>
                    <p className="font-sans text-[10px] text-warm-gray/40 uppercase tracking-[0.2em]">Email</p>
                    <p className="font-sans text-sm text-rich-black/70 mt-0.5">hello@indirathakur.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-px h-8 bg-magenta/20" />
                  <div>
                    <p className="font-sans text-[10px] text-warm-gray/40 uppercase tracking-[0.2em]">Phone</p>
                    <p className="font-sans text-sm text-rich-black/70 mt-0.5">+91 99999 99999</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-px h-8 bg-magenta/20" />
                  <div>
                    <p className="font-sans text-[10px] text-warm-gray/40 uppercase tracking-[0.2em]">Location</p>
                    <p className="font-sans text-sm text-rich-black/70 mt-0.5">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
                  <span className="absolute inset-0 bg-rich-black transition-transform duration-700 ease-out group-hover:scale-105" />
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
