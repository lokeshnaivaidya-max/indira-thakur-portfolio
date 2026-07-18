'use client';

import { motion } from 'framer-motion';
import { HiPlus, HiTrash, HiPencil, HiPhoto } from 'react-icons/hi2';
import { useState } from 'react';

const initialImages: any[] = [];

export default function AdminGalleryPage() {
  const [images, setImages] = useState(initialImages);

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">Gallery</h1>
          <p className="font-sans-alt text-sm text-earth-brown/60">Manage your portfolio images.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-warm-black text-soft-white font-sans-alt text-xs tracking-wider uppercase hover:bg-earth-brown transition-all">
          <HiPlus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img) => (
          <motion.div
            key={img.id}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="group relative bg-soft-white rounded-sm border border-warm-cream/50 overflow-hidden"
          >
            <div className={`aspect-4-5 bg-gradient-to-br ${img.gradient} relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-warm-black/30 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full bg-soft-white/90 flex items-center justify-center text-warm-black hover:bg-soft-white transition-all">
                  <HiPencil className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full bg-soft-white/90 flex items-center justify-center text-rose-500 hover:bg-soft-white transition-all">
                  <HiTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-serif text-base text-warm-black">{img.title}</p>
                {img.featured && <span className="text-muted-gold font-sans-alt text-[10px] tracking-wider uppercase">Featured</span>}
              </div>
              <p className="font-sans-alt text-xs text-earth-brown/60 mt-1">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
