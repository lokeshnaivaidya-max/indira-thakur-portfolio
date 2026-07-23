'use client';

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { cn } from '@/lib/imageUtils';
import { toSrcSet, toThumbUrl } from '@/lib/imageUrl';

interface GalleryImage {
  id?: string;
  _id?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  title?: string;
  description?: string;
}

interface GalleryItem {
  id: string;
  src: string;
  thumbSrcSet: string;
  alt: string;
  width: number;
  height: number;
  category: string;
  title?: string;
  caption?: string;
  aspectRatio: number;
}

function mapGalleryImages(images: GalleryImage[]): GalleryItem[] {
  return images
    .filter((img) => img?.src)
    .map((img) => ({
      id: img.id || img._id || `img-${img.src.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'unknown'}`,
      src: img.src,
      thumbSrcSet: toSrcSet(img.src),
      alt: img.alt || '',
      width: img.width || 800,
      height: img.height || 1000,
      category: (img.category || '').toLowerCase(),
      title: img.title || img.alt || '',
      aspectRatio: (img.width || 800) / (img.height || 1000),
    }));
}

function formatCategory(raw?: string): string {
  if (!raw) return '';
  const map: Record<string, string> = {
    newborn: 'Newborn',
    maternity: 'Maternity',
    family: 'Family',
    'brand collaboration': 'Brand',
    portrait: 'Portrait',
    wedding: 'Weddings',
    events: 'Events',
    couple: 'Couples',
  };
  return map[raw] || raw.charAt(0).toUpperCase() + raw.slice(1);
}

function GalleryImageCard({ img, index, onClick }: { img: GalleryItem; index: number; onClick: () => void }) {
  const loadedRef = useRef(false);
  const [, forceRender] = useState(0);

  const trigger = () => {
    if (!loadedRef.current) {
      loadedRef.current = true;
      forceRender((n) => n + 1);
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer break-inside-avoid group"
    >
      <div className="relative overflow-hidden bg-white">
        <img
          src={toThumbUrl(img.src, 400)}
          srcSet={img.thumbSrcSet}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          alt={img.alt || img.title || ''}
          loading="lazy"
          decoding="async"
          onLoad={trigger}
          className={cn(
            'w-full h-auto transition-opacity duration-100',
            loadedRef.current ? 'opacity-100' : 'opacity-0',
            'group-hover:scale-[1.02]'
          )}
          style={{ aspectRatio: `${img.width} / ${img.height}` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
      {img.title && (
        <div className="pt-2.5 pb-1">
          <p className="font-serif text-[13px] text-rich-black/70 leading-snug">{img.title}</p>
        </div>
      )}
    </div>
  );
}

export default function GalleryClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const [activeCategory, setActiveCategory] = useState(categoryParam.toLowerCase());
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightboxLoading, setLightboxLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery-images?page=1&limit=200');
        if (!res.ok) return;
        const json = await res.json();
        const data: GalleryImage[] = json.items || (Array.isArray(json) ? json : []);
        if (!cancelled) {
          setGalleryImages(mapGalleryImages(data));
        }
      } catch {
        // silently fail
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchGallery();
    return () => { cancelled = true; };
  }, []);

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    galleryImages.forEach((img) => { if (img.category) cats.add(img.category); });
    return Array.from(cats);
  }, [galleryImages]);

  const filtered = useMemo(
    () => activeCategory ? galleryImages.filter((img) => img.category === activeCategory) : galleryImages,
    [galleryImages, activeCategory]
  );

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    setLightboxLoading(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

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

  const currentImage = filtered[currentIndex];

  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    const dy = e.changedTouches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) goNext();
      else goPrev();
    }
  }, [goNext, goPrev]);

  const skeletonColumns = useMemo(() => {
    const widths = [3, 4, 3, 4, 3];
    const heights = [4, 5, 4, 5, 4];
    return Array.from({ length: 9 }, (_, i) => ({
      aspect: `${widths[i % widths.length]} / ${heights[i % heights.length]}`,
    }));
  }, []);

  return (
    <>
      <div className="bg-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-36 pb-24">
          {/* Header */}
          <div className="mb-12 md:mb-16">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
              <span className="font-mono text-[11px] text-warm-gray/40 uppercase tracking-[0.3em] block mb-3">Portfolio</span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.15]">The Gallery</h1>
            </motion.div>
          </div>

          {/* Category Filter */}
          {availableCategories.length > 0 && (
            <div className="mb-12 md:mb-14 overflow-x-auto">
              <div className="flex gap-6 md:gap-8 pb-2">
                <button
                  onClick={() => setActiveCategory('')}
                  className={`font-mono text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${
                    activeCategory === '' ? 'text-rich-black' : 'text-warm-gray/40 hover:text-rich-black'
                  }`}
                >
                  All
                </button>
                {availableCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`font-mono text-[11px] uppercase tracking-[0.2em] whitespace-nowrap transition-colors duration-300 ${
                      activeCategory === cat ? 'text-rich-black' : 'text-warm-gray/40 hover:text-rich-black'
                    }`}
                  >
                    {formatCategory(cat) || cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
              {skeletonColumns.map((item, i) => (
                <div key={i} className="break-inside-avoid bg-[#FAF6F3] animate-pulse" style={{ aspectRatio: item.aspect }} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="pt-16 text-center">
              <p className="font-mono text-[11px] text-warm-gray/20 uppercase tracking-[0.25em]" />
            </div>
          ) : (
            <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-5 space-y-4 md:space-y-5">
              {filtered.map((img, idx) => (
                <GalleryImageCard
                  key={img.id}
                  img={img}
                  index={idx}
                  onClick={() => openLightbox(idx)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[70] bg-rich-black/98 flex items-center justify-center select-none"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-20 p-2 text-white/50 hover:text-white transition-colors"
              aria-label="Close"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            {/* Previous */}
            <button
              onClick={goPrev}
              className="absolute left-4 md:left-8 z-20 p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Previous image"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>

            {/* Next */}
            <button
              onClick={goNext}
              className="absolute right-4 md:right-8 z-20 p-2 text-white/40 hover:text-white transition-colors"
              aria-label="Next image"
            >
              <HiArrowRight className="w-5 h-5" />
            </button>

            {/* Image */}
            <div className="max-w-6xl w-full px-6 md:px-16 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {lightboxLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 border-2 border-white/20 border-t-white/60 rounded-full animate-spin" />
                    </div>
                  )}
                  <img
                    src={currentImage.src}
                    alt={currentImage.alt || currentImage.title || ''}
                    loading="eager"
                    onLoad={() => setLightboxLoading(false)}
                    className={`max-h-[82vh] max-w-full w-auto h-auto mx-auto object-contain ${lightboxLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="font-mono text-[11px] text-white/30 tracking-[0.15em]">
                {String(currentIndex + 1).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
