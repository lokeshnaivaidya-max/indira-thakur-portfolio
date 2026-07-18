'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'newborn', label: 'Newborn' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'events', label: 'Events' },
];

const galleryImages: { id: number; category: string; gradient: string; span?: string }[] = [];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = activeCategory === 'all' ? galleryImages : galleryImages.filter((img) => img.category === activeCategory);

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
      <div className="pt-28 md:pt-36 pb-24">
        <div className="container-editorial">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <p className="font-mono text-[11px] text-magenta/50 uppercase tracking-[0.25em]">Portfolio</p>
            <h1 className="heading-lg mt-6">The Gallery</h1>
            <p className="body-md mt-4 max-w-lg mx-auto text-warm-gray/60">
              A curated collection of moments, emotions, and stories — each frame a chapter in a larger narrative.
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-2 mb-16">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCategory === cat.id
                    ? 'bg-rich-black text-white'
                    : 'text-warm-gray/50 hover:text-rich-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {galleryImages.length === 0 ? (
          <div className="container-editorial">
            <div className="text-center py-32 border-t border-beige/30">
              <p className="font-mono text-xs text-warm-gray/30 uppercase tracking-[0.2em]">Gallery coming soon</p>
            </div>
          </div>
        ) : (
          <div className="px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, index) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={() => openLightbox(index)}
                    className={`relative overflow-hidden bg-gradient-to-br ${img.gradient} ${img.span || 'aspect-square'} group cursor-pointer`}
                  >
                    <div className="absolute inset-0 bg-rich-black/0 group-hover:bg-rich-black/20 transition-all duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-700">
                      <span className="font-sans text-[10px] text-white uppercase tracking-[0.2em]">View</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && filtered.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[9999] bg-rich-black/98 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-10 w-12 h-12 flex items-center justify-center text-white/50 hover:text-white transition-colors duration-500"
            >
              <HiXMark className="w-6 h-6" />
            </button>
            <button
              onClick={goPrev}
              className="absolute left-8 z-10 w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors duration-500"
            >
              <HiArrowLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-8 z-10 w-12 h-12 flex items-center justify-center text-white/30 hover:text-white transition-colors duration-500"
            >
              <HiArrowRight className="w-6 h-6" />
            </button>

            <div className="max-w-5xl w-full px-8">
              <div
                className={`aspect-[3/2] bg-gradient-to-br ${
                  filtered[currentIndex]?.gradient || 'from-cream to-beige'
                }`}
              />
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'bg-white w-6' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
