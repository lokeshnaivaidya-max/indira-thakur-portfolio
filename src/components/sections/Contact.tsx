'use client';

import { motion } from 'framer-motion';

export default function Contact() {
  return (
    <section id="contact" className="section-spacing">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">Let&apos;s Create</p>
              <h2 className="heading-lg mt-6">
                Begin Your
                <br />
                <span className="italic font-normal">Story</span>
              </h2>
              <div className="divider-line mt-8" />
              <p className="body-lg mt-8 text-warm-gray/70">
                Every beautiful photograph begins with a conversation. Let&apos;s talk about your vision, 
                your dreams, and how we can capture your most precious moments together.
              </p>
              <div className="mt-12 space-y-6">
                <div>
                  <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">Email</p>
                  <p className="font-sans text-sm text-rich-black/70 mt-1">hello@indirathakur.com</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">Phone</p>
                  <p className="font-sans text-sm text-rich-black/70 mt-1">+91 99999 99999</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-warm-gray/40 uppercase tracking-[0.15em]">Location</p>
                  <p className="font-sans text-sm text-rich-black/70 mt-1">Bangalore, India</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="input-field"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="input-field"
                    />
                  </div>
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="input-field"
                  />
                </div>
                <div>
                  <select className="input-field appearance-none bg-white">
                    <option value="">Select Service</option>
                    <option value="newborn">Newborn Photography</option>
                    <option value="maternity">Maternity Photography</option>
                    <option value="portrait">Portrait Photography</option>
                    <option value="events">Events & Brand Collaborations</option>
                  </select>
                </div>
                <div>
                  <textarea
                    placeholder="Tell me about your vision..."
                    className="textarea-field"
                    rows={5}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-primary w-full md:w-auto"
                >
                  Send Enquiry
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
