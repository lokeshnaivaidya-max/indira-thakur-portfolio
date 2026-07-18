'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiXMark, HiArrowLeft, HiArrowRight } from 'react-icons/hi2';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
import { useSiteConfig, SiteConfigData } from '@/hooks/useSiteConfig';

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
  alt: string;
  width: number;
  height: number;
  category: string;
  title?: string;
  caption?: string;
  aspectRatio: number;
}

const categories = [
  { id: 'all', label: 'All' },
  { id: 'newborn', label: 'Newborn' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'portrait', label: 'Portrait' },
  { id: 'events', label: 'Events' },
];

function mapSiteConfigImages(config: SiteConfigData | null): GalleryItem[] {
  const featured = config?.galleryPreview?.featuredImages || [];
  return featured
    .filter((img) => img?.url)
    .map((img, i) => ({
      id: `sc-${i}`,
      src: img.url,
      alt: img.alt || '',
      width: 800,
      height: 1000,
      category: 'portrait',
      title: img.caption,
      caption: img.caption,
      aspectRatio: 4 / 5,
    }));
}

function mapGalleryImages(images: GalleryImage[]): GalleryItem[] {
  return images
    .filter((img) => img?.src)
    .map((img) => ({
      id: img.id || img._id || String(Math.random()),
      src: img.src,
      alt: img.alt || '',
      width: img.width || 800,
      height: img.height || 1000,
      category: (img.category || 'portrait').toLowerCase(),
      title: img.title,
      aspectRatio: (img.width || 800) / (img.height || 1000),
    }));
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [galleryImages, setGalleryImages] = useState<GalleryItem[]>([]);
  const [scImages, setScImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const { config } = useSiteConfig();

  useEffect(() => {
    const fromSc = mapSiteConfigImages(config);
    setScImages(fromSc);
  }, [config]);

  useEffect(() => {
    let cancelled = false;

    const fetchGallery = async () => {
      try {
        const res = await fetch('/api/gallery-images');
        if (!res.ok) return;
        const data: GalleryImage[] = await res.json();
        if (!cancelled) {
          const mapped = mapGalleryImages(data);
          setGalleryImages(mapped);
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

  const allImages = useMemo(() => {
    const ids = new Set<string>();
    const merged: GalleryItem[] = [];

    for (const img of galleryImages) {
      if (!ids.has(img.id)) {
        ids.add(img.id);
        merged.push(img);
      }
    }
    for (const img of scImages) {
      if (!ids.has(img.id)) {
        ids.add(img.id);
        merged.push(img);
      }
    }

    return merged;
  }, [galleryImages, scImages]);

  const filtered = useMemo(
    () => (activeCategory === 'all' ? allImages : allImages.filter((img) => img.category === activeCategory)),
    [allImages, activeCategory]
  );

  const openLightbox = useCallback((index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
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

  return (
    <>
      <div className="pt-36 pb-20">
        <div className="container-editorial mb-14">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-3">The Gallery</h1>
          </motion.div>

          <div className="flex flex-wrap gap-1 mt-10">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCategory === cat.id ? 'bg-rich-black text-white' : 'text-warm-gray/50 hover:text-rich-black'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="container-editorial border-t border-beige/30 pt-20">
            <div className="flex justify-center">
              <div className="inline-block w-5 h-5 border border-warm-gray/20 border-t-magenta rounded-full animate-spin" />
            </div>
          </div>
        ) : allImages.length === 0 ? (
          <div className="container-editorial border-t border-beige/30 pt-20">
            <p className="font-mono text-[10px] text-warm-gray/30 uppercase tracking-[0.25em] text-center">Gallery coming soon</p>
          </div>
        ) : (
          <div className="px-4 md:px-8 lg:px-16">
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3 max-w-7xl mx-auto">
              <AnimatePresence mode="popLayout">
                {filtered.map((img, index) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => openLightbox(index)}
                    className="break-inside-avoid mb-3 cursor-pointer group"
                  >
                    <PolaroidImage
                      src={img.src}
                      alt={img.alt || img.title || ''}
                      width={img.width}
                      height={img.height}
                      objectFit="cover"
                      className="transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightboxOpen && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] bg-rich-black/98 flex items-center justify-center"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-8 right-8 z-10 text-white/40 hover:text-white transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-6 z-10 text-white/20 hover:text-white transition-colors"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-6 z-10 text-white/20 hover:text-white transition-colors"
            >
              <HiArrowRight className="w-5 h-5" />
            </button>

            <div className="max-w-4xl w-full px-6">
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <PolaroidImage
                  src={currentImage.src}
                  alt={currentImage.alt || currentImage.title || ''}
                  fill
                  className="object-contain"
                  containerClassName="relative aspect-[3/2] bg-rich-black"
                  caption={currentImage.caption || currentImage.title}
                  showCaption={!!(currentImage.caption || currentImage.title)}
                />
              </motion.div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
              {filtered.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-500 ${i === currentIndex ? 'w-6 h-px bg-white' : 'w-3 h-px bg-white/20'}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
