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
          <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Testimonials</h1>
          <p className="font-sans text-sm text-warm-gray/60">Manage client testimonials and reviews.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-warm-gray transition-all">
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
            className="bg-white rounded-sm border border-cream/50 p-6 flex items-start justify-between group"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-serif text-lg text-rich-black">{t.name}</h3>
                {t.featured && <span className="text-magenta/60"><HiStar className="w-4 h-4" /></span>}
              </div>
              <p className="font-sans text-xs text-warm-gray/60 uppercase tracking-wider mb-2">{t.role}</p>
              <p className="font-sans text-sm text-warm-gray/70 line-clamp-2">{t.content}</p>
              <div className="flex gap-1 mt-2">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <span key={i} className="text-magenta/60 text-xs">★</span>
                ))}
              </div>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity ml-4">
              <button className="p-2 rounded-sm hover:bg-cream/50 text-warm-gray/60 hover:text-rich-black transition-all">
                <HiPencil className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-sm hover:bg-magenta/10 text-warm-gray/60 hover:text-rose-500 transition-all">
                <HiTrash className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
