'use client';

import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi2';
import { useState } from 'react';

const initialServices: any[] = [];

export default function AdminServicesPage() {
  const [services] = useState(initialServices);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Services</h1>
          <p className="font-sans text-sm text-warm-gray/60">Manage your photography services and pricing.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-warm-gray transition-all">
          <HiPlus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-sm border border-cream/50 p-6 group relative"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-lg text-rich-black">{s.title}</h3>
                <p className="font-sans text-sm text-magenta/60 mt-1">{s.price}</p>
              </div>
              {s.featured && <span className="font-sans text-[10px] tracking-wider uppercase text-magenta/60 border border-magenta/60/30 px-2 py-1 rounded-sm">Featured</span>}
            </div>
            <p className="font-sans text-xs text-warm-gray/50 mt-4">Slug: /services/{s.slug}</p>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-sm hover:bg-cream/50 text-warm-gray/60 hover:text-rich-black"><HiPencil className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-sm hover:bg-magenta/10 text-warm-gray/60 hover:text-rose-500"><HiTrash className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
