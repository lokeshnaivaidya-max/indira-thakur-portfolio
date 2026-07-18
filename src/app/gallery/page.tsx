'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '@/components/ui/SectionHeading';
import Footer from '@/components/layout/Footer';
import { HiXMark, HiArrowLeft, HiArrowRight, HiMagnifyingGlassPlus, HiShare } from 'react-icons/hi2';

const categories = ['All', 'Newborn', 'Maternity', 'Portrait', 'Events', 'Corporate', 'Brand'];

const galleryImages = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1],
  gradient: ['from-soft-rose to-warm-blush', 'from-warm-blush to-cream', 'from-cream to-beige', 'from-warm-cream to-beige', 'from-warm-blush to-beige', 'from-soft-rose to-cream', 'from-cream to-warm-cream', 'from-beige to-warm-beige'][i % 8],
  aspect: ['aspect-3-2', 'aspect-4-5', 'aspect-1-1', 'aspect-16-9'][i % 4],
  title: `Beautiful Moment ${i + 1}`,
  description: 'A precious memory captured with love and artistry.',
}));

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filtered.length);
  }, [filtered.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
  }, [filtered.length]);

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
      <div className="pt-24 md:pt-32">
        <div className="section-padding pb-0">
          <SectionHeading
            subtitle="My Portfolio"
            title="Gallery"
            description="A curated collection of moments, emotions, and stories captured through my lens."
          />

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 font-sans-alt text-xs tracking-[0.15em] uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-warm-black text-soft-white'
                    : 'bg-transparent text-earth-brown/60 hover:text-warm-black border border-warm-beige/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-12 lg:px-20 pb-24 md:pb-32">
          <motion.div layout className="grid-masonry max-w-7xl mx-auto">
            <AnimatePresence mode="popLayout">
              {filtered.map((img, index) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  onClick={() => openLightbox(index)}
                  className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${img.gradient} ${img.aspect} group cursor-pointer`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <HiMagnifyingGlassPlus className="w-8 h-8 text-soft-white" />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-warm-black/95 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-soft-white/10 flex items-center justify-center text-soft-white hover:bg-soft-white/20 transition-all"
            >
              <HiXMark className="w-6 h-6" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-6 z-10 w-12 h-12 rounded-full bg-soft-white/10 flex items-center justify-center text-soft-white hover:bg-soft-white/20 transition-all"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-6 z-10 w-12 h-12 rounded-full bg-soft-white/10 flex items-center justify-center text-soft-white hover:bg-soft-white/20 transition-all"
            >
              <HiArrowRight className="w-5 h-5" />
            </button>

            <div className="max-w-4xl w-full px-6">
              <div className="aspect-3-2 bg-gradient-to-br from-warm-blush to-cream rounded-sm overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-warm-black/20 to-transparent" />
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="font-serif text-xl text-soft-white">
                    {filtered[currentIndex]?.title}
                  </p>
                  <p className="font-sans-alt text-sm text-earth-brown/60 mt-1">
                    {filtered[currentIndex]?.category} &mdash; {currentIndex + 1} of {filtered.length}
                  </p>
                </div>
                <button className="w-10 h-10 rounded-full bg-soft-white/10 flex items-center justify-center text-soft-white hover:bg-soft-white/20 transition-all">
                  <HiShare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
