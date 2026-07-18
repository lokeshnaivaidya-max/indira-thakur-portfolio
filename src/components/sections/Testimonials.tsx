'use client';

import { motion } from 'framer-motion';

const testimonials: { name: string; role: string; content: string; gradient: string }[] = [];

export default function Testimonials() {
  if (testimonials.length === 0) {
    return (
      <section id="testimonials" className="section-padding bg-warm-white">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Client Love</span>
          <h2 className="section-title mt-3">What Clients Say</h2>
          <div className="mt-10 p-10 bg-cream/50 rounded-sm">
            <p className="text-warm-brown/60 font-sans-alt">Testimonials coming soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="section-padding bg-warm-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">Client Love</span>
          <h2 className="section-title mt-3">What Clients Say</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="card p-8"
            >
              <p className="text-warm-brown/80 font-serif-alt leading-relaxed italic">&ldquo;{t.content}&rdquo;</p>
              <div className="mt-6 pt-4 border-t border-cream/50">
                <p className="font-serif text-warm-black">{t.name}</p>
                <p className="font-sans-alt text-xs text-warm-brown/50 mt-1">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
