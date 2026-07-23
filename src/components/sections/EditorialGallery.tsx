'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
import { toThumbUrl, toSrcSet } from '@/lib/imageUrl';

interface GalleryImageItem {
  id: string;
  src: string;
  thumb: string;
  thumbSrcSet: string;
  alt: string;
  category: string;
  title?: string;
  caption?: string;
}

interface PaginatedResponse {
  items: any[];
  total: number;
  page: number;
  totalPages: number;
}

function formatCategoryTitle(category?: string): string {
  if (!category) return '';
  const clean = category.toLowerCase().trim();
  const map: Record<string, string> = {
    newborn: 'Newborn',
    maternity: 'Maternity',
    family: 'Family',
    'brand collaboration': 'Brand Collaboration',
    portrait: 'Portrait',
    wedding: 'Weddings',
    weddings: 'Weddings',
    events: 'Events',
    couple: 'Couples',
  };
  return map[clean] || `${clean.charAt(0).toUpperCase()}${clean.slice(1)}`;
}

export default function EditorialGallery({ isPreview = false }: { isPreview?: boolean }) {
  const { config } = useSiteConfig();
  const [images, setImages] = useState<GalleryImageItem[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function loadGallery() {
      try {
        const res = await fetch('/api/gallery-images?page=1&limit=50');
        if (!res.ok) return;
        const data: PaginatedResponse = await res.json();
        const items = data.items || (Array.isArray(data) ? data : []);
        if (items.length === 0) return;
        const seen = new Set<string>();
        const mapped: GalleryImageItem[] = [];
        for (const img of items as any[]) {
          const src = img.src || '';
          if (!src || seen.has(src)) continue;
          seen.add(src);
          mapped.push({
            id: img.id || img._id || `img-${src.slice(-20)}`,
            src,
            thumb: toThumbUrl(src, 400),
            thumbSrcSet: toSrcSet(src),
            alt: img.alt || img.title || '',
            category: (img.category || '').toLowerCase().trim(),
            title: img.title || img.alt || '',
            caption: img.description || img.caption || ''
          });
        }
        if (!cancelled && mapped.length > 0) setImages(mapped);
      } catch {
        // silently fail
      }
    }

    loadGallery();
    return () => { cancelled = true; };
  }, [config]);

  const categoryTabs = useMemo(() => {
    const presentCategories = Array.from(
      new Set(images.map((img) => img.category.toLowerCase().trim()))
    ).filter(Boolean);

    return presentCategories.map((catKey) => ({
      id: catKey,
      label: formatCategoryTitle(catKey) || catKey.charAt(0).toUpperCase() + catKey.slice(1),
    }));
  }, [images]);

  const cmsDefaultCategory = (config?.galleryPreview as any)?.defaultCategory?.toLowerCase()?.trim();
  
  const [activeCategory, setActiveCategory] = useState<string>('');

  useEffect(() => {
    if (categoryTabs.length > 0) {
      if (cmsDefaultCategory && categoryTabs.some((t) => t.id === cmsDefaultCategory)) {
        setActiveCategory(cmsDefaultCategory);
      } else {
        setActiveCategory(categoryTabs[0].id);
      }
    }
  }, [categoryTabs, cmsDefaultCategory]);

  const filteredImages = useMemo(() => {
    let list = images;
    if (activeCategory) {
      list = images.filter((img) => img.category === activeCategory);
    }
    return isPreview ? list.slice(0, 6) : list;
  }, [images, activeCategory, isPreview]);

  return (
    <section className="py-24 md:py-36 bg-white text-[#2B2625] relative">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block font-medium mb-2">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2625] leading-none">
              Editorial Gallery
            </h2>
          </div>

          {!isPreview && categoryTabs.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`h-10 px-5 py-2.5 inline-flex items-center justify-center font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-300 rounded-full cursor-pointer whitespace-nowrap ${
                    activeCategory === tab.id
                      ? 'bg-[#2B2625] text-white shadow-sm border border-[#2B2625]'
                      : 'bg-white text-[#7C706D] hover:text-[#2B2625] border border-[#E7DDD2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredImages.length === 0 ? (
          <div className="py-20 text-center font-mono text-[11px] text-[#7C706D]/30 uppercase tracking-[0.25em]" />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => setSelectedImageIndex(idx)}
                className="group relative cursor-pointer overflow-hidden rounded-sm bg-white border border-[#E7DDD2] shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-opacity duration-300"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF6F3]">
                  <PolaroidImage
                    src={img.thumb}
                    srcSet={img.thumbSrcSet}
                    alt={img.alt}
                    fill
                    priority={idx < 3}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    objectFit="contain"
                    className="!w-full !h-full transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    containerClassName="!w-full !h-full"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2B2625]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white pointer-events-none" />
                </div>
                <div className="p-5 flex items-center justify-between border-t border-[#E7DDD2]/50 bg-white">
                  <div>
                    <h4 className="font-serif text-lg text-[#2B2625] leading-snug font-medium group-hover:text-[#C39E96] transition-colors">
                      {img.title}
                    </h4>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C706D] mt-0.5">
                      {formatCategoryTitle(img.category) || img.category}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#C39E96] group-hover:translate-x-1 transition-transform">
                    ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence>
          {selectedImageIndex !== null && filteredImages[selectedImageIndex] && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-[#2B2625]/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-12"
              onClick={() => setSelectedImageIndex(null)}
            >
              <button
                onClick={() => setSelectedImageIndex(null)}
                className="absolute top-6 right-6 text-white/80 hover:text-white font-mono text-sm uppercase tracking-[0.2em] p-3 cursor-pointer z-50 bg-white/10 rounded-full"
                aria-label="Close Lightbox"
              >
                ✕ Close
              </button>

              <div
                className="relative max-w-5xl w-full max-h-[85vh] flex flex-col md:flex-row items-center bg-[#2B2625] border border-white/10 rounded-sm overflow-hidden shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative w-full md:w-3/4 h-[50vh] md:h-[75vh]">
                  <PolaroidImage
                    src={filteredImages[selectedImageIndex].src}
                    alt={filteredImages[selectedImageIndex].alt}
                    fill
                    sizes="100vw"
                    className="!w-full !h-full object-contain"
                    containerClassName="!w-full !h-full"
                  />
                </div>

                <div className="p-8 md:p-10 text-white w-full md:w-1/4 flex flex-col justify-between h-full border-t md:border-t-0 md:border-l border-white/10">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#C39E96] block mb-2">
                      {filteredImages[selectedImageIndex].category}
                    </span>
                    <h3 className="font-serif text-2xl text-white">
                      {filteredImages[selectedImageIndex].title}
                    </h3>
                    {filteredImages[selectedImageIndex].caption && (
                      <p className="font-sans text-xs text-white/60 mt-4 leading-relaxed">
                        {filteredImages[selectedImageIndex].caption}
                      </p>
                    )}
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                    <button
                      onClick={() =>
                        setSelectedImageIndex(
                          (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
                        )
                      }
                      className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white cursor-pointer"
                    >
                      ← Prev
                    </button>
                    <span className="font-mono text-[10px] text-white/40">
                      {selectedImageIndex + 1} / {filteredImages.length}
                    </span>
                    <button
                      onClick={() =>
                        setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length)
                      }
                      className="font-mono text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white cursor-pointer"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
