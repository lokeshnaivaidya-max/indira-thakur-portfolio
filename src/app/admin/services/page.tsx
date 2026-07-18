'use client';

import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil } from 'react-icons/hi2';
import { useState } from 'react';

const initialServices = [
  { id: '1', title: 'Newborn Photography', slug: 'newborn', price: 'From $450', featured: true, order: 1 },
  { id: '2', title: 'Maternity Photography', slug: 'maternity', price: 'From $350', featured: true, order: 2 },
  { id: '3', title: 'Portrait Photography', slug: 'portrait', price: 'From $300', featured: true, order: 3 },
  { id: '4', title: 'Personal Events', slug: 'events', price: 'From $600', featured: false, order: 4 },
  { id: '5', title: 'Corporate Events', slug: 'corporate', price: 'From $800', featured: false, order: 5 },
  { id: '6', title: 'Brand Collaborations', slug: 'brand', price: 'Custom Quote', featured: false, order: 6 },
];

export default function AdminServicesPage() {
  const [services] = useState(initialServices);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Services</h1>
          <p className="font-sans-alt text-sm text-earth-brown/60">Manage your photography services and pricing.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-wider uppercase hover:bg-earth-brown transition-all">
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
            className="bg-soft-white rounded-sm border border-warm-cream/50 p-6 group relative"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-serif text-lg text-warm-black">{s.title}</h3>
                <p className="font-sans-alt text-sm text-muted-gold mt-1">{s.price}</p>
              </div>
              {s.featured && <span className="font-sans-alt text-[10px] tracking-wider uppercase text-muted-gold border border-muted-gold/30 px-2 py-1 rounded-sm">Featured</span>}
            </div>
            <p className="font-sans-alt text-xs text-earth-brown/50 mt-4">Slug: /services/{s.slug}</p>
            <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-1.5 rounded-sm hover:bg-cream/50 text-earth-brown/60 hover:text-warm-black"><HiPencil className="w-3.5 h-3.5" /></button>
              <button className="p-1.5 rounded-sm hover:bg-soft-rose/50 text-earth-brown/60 hover:text-rose-500"><HiTrash className="w-3.5 h-3.5" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
