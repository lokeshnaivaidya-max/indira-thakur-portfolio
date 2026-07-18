'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const categories = ['All', 'Newborn', 'Maternity', 'Portrait', 'Events'];

const galleryImages: { id: number; category: string; gradient: string; aspect: string }[] = [];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = activeCategory === 'All' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => { setCurrentIndex(index); setLightboxOpen(true); };
  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const goNext = useCallback(() => setCurrentIndex((prev) => (prev + 1) % filtered.length), [filtered.length]);
  const goPrev = useCallback(() => setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length), [filtered.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  return (
    <>
      <div className="pt-20 md:pt-24 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">My Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl text-warm-black mt-3">Gallery</h1>
            <p className="mt-4 text-warm-brown/70 font-sans-alt max-w-xl mx-auto">A curated collection of moments, emotions, and stories captured through my lens.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 font-sans-alt text-xs tracking-wider uppercase transition-all duration-300 ${activeCategory === cat ? 'bg-warm-black text-white' : 'bg-transparent text-warm-brown/60 hover:text-warm-black border border-warm-beige/30'}`}>
                {cat}
              </button>
            ))}
          </div>

          {galleryImages.length === 0 ? (
            <div className="text-center p-16 bg-cream/30 rounded-sm">
              <p className="text-warm-brown/60 font-sans-alt">Gallery images coming soon.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, index) => (
                  <motion.div
                    key={img.id} layout
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => openLightbox(index)}
                    className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${img.gradient} ${img.aspect} group cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-warm-black/0 group-hover:bg-warm-black/20 transition-all duration-300" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightboxOpen && filtered.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-warm-black/95 flex items-center justify-center"
          >
            <button onClick={closeLightbox} className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><HiXMark className="w-5 h-5" /></button>
            <button onClick={goPrev} className="absolute left-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><HiArrowLeft className="w-5 h-5" /></button>
            <button onClick={goNext} className="absolute right-6 z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20"><HiArrowRight className="w-5 h-5" /></button>
            <div className="max-w-4xl w-full px-6">
              <div className={`aspect-3-2 bg-gradient-to-br ${filtered[currentIndex]?.gradient || 'from-cream to-soft-cream'} rounded-sm`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
