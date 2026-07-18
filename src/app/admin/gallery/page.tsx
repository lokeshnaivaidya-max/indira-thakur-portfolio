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
          <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">Gallery</h1>
          <p className="font-sans text-sm text-warm-gray/60">Manage your portfolio images.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-warm-gray transition-all">
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
            className="group relative bg-white rounded-sm border border-cream/50 overflow-hidden"
          >
            <div className={`aspect-4-5 bg-gradient-to-br ${img.gradient} relative`}>
              <div className="absolute inset-0 bg-gradient-to-t from-rich-black/30 to-transparent" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rich-black hover:bg-white transition-all">
                  <HiPencil className="w-3.5 h-3.5" />
                </button>
                <button className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-rose-500 hover:bg-white transition-all">
                  <HiTrash className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <p className="font-serif text-base text-rich-black">{img.title}</p>
                {img.featured && <span className="text-magenta/60 font-sans text-[10px] tracking-wider uppercase">Featured</span>}
              </div>
              <p className="font-sans text-xs text-warm-gray/60 mt-1">{img.category}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
