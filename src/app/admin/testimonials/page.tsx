'use client';

import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil, HiStar } from 'react-icons/hi2';
import { useState } from 'react';

const initialTestimonials: any[] = [];

export default function AdminTestimonialsPage() {
  const [testimonials] = useState(initialTestimonials);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Testimonials</h1>
          <p className="font-sans-alt text-sm text-earth-brown/60">Manage client testimonials and reviews.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-wider uppercase hover:bg-earth-brown transition-all">
          <HiPlus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-soft-white rounded-sm border border-warm-cream/50 p-6 flex items-start justify-between group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif text-lg text-warm-black">{t.name}</h3>
                {t.featured && <span className="text-muted-gold"><HiStar className="w-4 h-4" /></span>}
              </div>
              <p className="font-sans-alt text-xs text-earth-brown/60 uppercase tracking-wider mb-2">{t.role}</p>
              <p className="font-sans-alt text-sm text-earth-brown/70 line-clamp-2">{t.content}</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-muted-gold text-xs">★</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <button className="p-2 rounded-sm hover:bg-cream/50 text-earth-brown/60 hover:text-warm-black transition-all">
                <HiPencil className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-sm hover:bg-soft-rose/50 text-earth-brown/60 hover:text-rose-500 transition-all">
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
