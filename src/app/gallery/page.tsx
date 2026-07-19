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
    .map((img: any, i) => ({
      id: `sc-${i}`,
      src: img.url,
      alt: img.alt || '',
      width: img.width || 1200,
      height: img.height || 1600,
      category: 'portrait',
      title: img.caption,
      caption: img.caption,
      aspectRatio: (img.width || 1200) / (img.height || 1600),
    }));
}

function mapGalleryImages(images: GalleryImage[]): GalleryItem[] {
  return images
    .filter((img) => img?.src)
    .map((img) => ({
      id: img.id || img._id || `img-${img.src.split('/').pop()?.replace(/[^a-zA-Z0-9]/g, '') || 'unknown'}`,
      src: img.src,
      alt: img.alt || '',
      width: img.width || 800,
      height: img.height || 1000,
      category: (img.category || 'portrait').toLowerCase(),
      title: img.title,
      aspectRatio: (img.width || 800) / (img.height || 1000),
    }));
}

function pick(items: GalleryItem[], start: number, count: number): GalleryItem[] {
  const result: GalleryItem[] = [];
  for (let i = 0; i < count; i++) {
    result.push(items[(start + i) % items.length]);
  }
  return result;
}

function distributeToSections(images: GalleryItem[]) {
  const n = images.length;
  if (n === 0) return { hero: [], editorial: [], circular: [], magazine: [], fullBleed: [], mixed: [], finale: [] };

  const idx = (offset: number) => offset % n;

  if (n < 4) {
    return {
      hero: [images[0]],
      editorial: n > 1 ? [images[1]] : [],
      circular: n > 2 ? [images[2]] : [],
      magazine: [],
      fullBleed: [],
      mixed: [],
      finale: [],
    };
  }

  if (n < 8) {
    return {
      hero: [images[0]],
      editorial: [images[1], images[2], images[3]],
      circular: pick(images, 4, Math.min(4, n - 4)),
      magazine: [],
      fullBleed: [],
      mixed: [],
      finale: [],
    };
  }

  return {
    hero: [images[0]],
    editorial: [images[1], images[2], images[3]],
    circular: [images[4], images[5], images[6], images[7]],
    magazine: pick(images, 8, 3),
    fullBleed: pick(images, 11, 1),
    mixed: pick(images, 12, 4),
    finale: pick(images, 16, 2),
  };
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number], delay: i * 0.1 },
  }),
};

function GalleryImageCard({
  img,
  index,
  rounded = 'rounded-xl',
  onClick,
}: {
  img: GalleryItem;
  index: number;
  rounded?: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      onClick={onClick}
      className="cursor-pointer group"
    >
      <div className={`relative overflow-hidden ${rounded}`}>
        <PolaroidImage
          src={img.src}
          alt={img.alt || img.title || ''}
          width={img.width}
          height={img.height}
          className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
          <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-white/90">View</span>
        </div>
      </div>
    </motion.div>
  );
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

  const sections = useMemo(() => distributeToSections(filtered), [filtered]);

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
        {/* Page Header */}
        <div className="container-editorial mb-6">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">Portfolio</span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-rich-black leading-[1.1] mt-3">The Gallery</h1>
          </motion.div>
        </div>

        {/* Category Filter */}
        <div className="container-editorial mb-16">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full font-sans text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                  activeCategory === cat.id
                    ? 'bg-rich-black text-white shadow-sm'
                    : 'text-warm-gray/50 hover:text-rich-black hover:bg-beige/30'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="container-editorial pt-20">
            <div className="flex justify-center">
              <div className="inline-block w-5 h-5 border border-warm-gray/20 border-t-magenta rounded-full animate-spin" />
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="container-editorial pt-20">
            <p className="font-mono text-[10px] text-warm-gray/30 uppercase tracking-[0.25em] text-center">Gallery coming soon</p>
          </div>
        ) : (
          <div className="px-4 md:px-8 lg:px-16 max-w-7xl mx-auto space-y-0">

            {/* Section 1: Hero Statement — natural aspect ratio */}
            {sections.hero.length > 0 && (
              <section className="py-10 md:py-16">
                <motion.div
                  custom={0}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className="cursor-pointer group max-w-5xl mx-auto"
                  onClick={() => openLightbox(0)}
                >
                  <div className="relative overflow-hidden rounded-2xl md:rounded-[2rem]">
                    <PolaroidImage
                      src={sections.hero[0].src}
                      alt={sections.hero[0].alt || sections.hero[0].title || ''}
                      width={sections.hero[0].width}
                      height={sections.hero[0].height}
                      className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-12">
                      <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-white/90">View</span>
                    </div>
                  </div>
                </motion.div>
              </section>
            )}

            {/* Section 2: Editorial Grid — each image at its natural aspect ratio */}
            {sections.editorial.length >= 2 && (
              <section className="py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-start">
                  <div>
                    <GalleryImageCard
                      img={sections.editorial[0]}
                      index={0}
                      rounded="rounded-2xl"
                      onClick={() => openLightbox(filtered.indexOf(sections.editorial[0]))}
                    />
                  </div>
                  <div className="space-y-4 md:space-y-6">
                    {sections.editorial[1] && (
                      <GalleryImageCard
                        img={sections.editorial[1]}
                        index={1}
                        rounded="rounded-[2rem]"
                        onClick={() => openLightbox(filtered.indexOf(sections.editorial[1]))}
                      />
                    )}
                    {sections.editorial[2] && (
                      <GalleryImageCard
                        img={sections.editorial[2]}
                        index={2}
                        rounded="rounded-xl"
                        onClick={() => openLightbox(filtered.indexOf(sections.editorial[2]))}
                      />
                    )}
                  </div>
                </div>
              </section>
            )}

            {/* Section 3: Circular Collection — entire image contained inside circle */}
            {sections.circular.length > 0 && (
              <section className="py-16 md:py-24 bg-cream/20">
                <div className="py-12 md:py-20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-4xl mx-auto">
                    {sections.circular.map((img, i) => (
                      <motion.div
                        key={img.id}
                        custom={i}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-40px' }}
                        onClick={() => openLightbox(filtered.indexOf(img))}
                        className="cursor-pointer group"
                      >
                        <div className="relative rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-500 bg-cream/40"
                          style={{ aspectRatio: '1 / 1' }}
                        >
                          <PolaroidImage
                            src={img.src}
                            alt={img.alt || img.title || ''}
                            width={img.width}
                            height={img.height}
                            objectFit="contain"
                            bgColor="bg-transparent"
                            className="transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 rounded-full pointer-events-none" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Section 4: Magazine Spread — natural aspect ratios */}
            {sections.magazine.length >= 3 && (
              <section className="py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-start">
                  <div className="md:mt-12">
                    <GalleryImageCard
                      img={sections.magazine[0]}
                      index={0}
                      rounded="rounded-2xl"
                      onClick={() => openLightbox(filtered.indexOf(sections.magazine[0]))}
                    />
                  </div>
                  <div>
                    <GalleryImageCard
                      img={sections.magazine[1]}
                      index={1}
                      rounded="rounded-[2rem]"
                      onClick={() => openLightbox(filtered.indexOf(sections.magazine[1]))}
                    />
                  </div>
                  <div className="md:mt-20">
                    <GalleryImageCard
                      img={sections.magazine[2]}
                      index={2}
                      rounded="rounded-xl"
                      onClick={() => openLightbox(filtered.indexOf(sections.magazine[2]))}
                    />
                  </div>
                </div>
              </section>
            )}

            {/* Section 5: Full Bleed — decorative, cover acceptable */}
            {sections.fullBleed.length > 0 && (
              <section className="py-16 md:py-24 bg-ivory">
                <div className="py-12 md:py-20">
                  <motion.div
                    custom={0}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-40px' }}
                    onClick={() => openLightbox(filtered.indexOf(sections.fullBleed[0]))}
                    className="cursor-pointer group relative max-w-6xl mx-auto"
                  >
                    <div className="relative overflow-hidden rounded-none md:rounded-2xl">
                      <PolaroidImage
                        src={sections.fullBleed[0].src}
                        alt={sections.fullBleed[0].alt || sections.fullBleed[0].title || ''}
                        width={sections.fullBleed[0].width}
                        height={sections.fullBleed[0].height}
                        className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-2xl md:text-4xl text-white/80 drop-shadow-lg italic">
                          {sections.fullBleed[0].title || ''}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {/* Section 6: Mixed Grid — natural aspect ratios in masonry-like columns */}
            {sections.mixed.length > 0 && (
              <section className="py-16 md:py-24">
                <div className="columns-2 md:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
                  {sections.mixed.map((img, i) => {
                    const roundedOptions = ['rounded-none', 'rounded-xl', 'rounded-2xl', 'rounded-[2rem]'];
                    const rounded = roundedOptions[i % roundedOptions.length];

                    return (
                      <div key={img.id} className="break-inside-avoid">
                        <GalleryImageCard
                          img={img}
                          index={i}
                          rounded={rounded}
                          onClick={() => openLightbox(filtered.indexOf(img))}
                        />
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Section 7: Finale — natural aspect ratios */}
            {sections.finale.length >= 2 && (
              <section className="py-16 md:py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                  {sections.finale.map((img, i) => (
                    <GalleryImageCard
                      key={img.id}
                      img={img}
                      index={i}
                      rounded="rounded-2xl"
                      onClick={() => openLightbox(filtered.indexOf(img))}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>

      {/* Lightbox */}
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
              className="absolute top-8 right-8 z-10 text-white/40 hover:text-white transition-colors duration-300"
            >
              <HiXMark className="w-5 h-5" />
            </button>

            <button
              onClick={goPrev}
              className="absolute left-4 md:left-6 z-10 text-white/20 hover:text-white transition-colors duration-300"
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>

            <button
              onClick={goNext}
              className="absolute right-4 md:right-6 z-10 text-white/20 hover:text-white transition-colors duration-300"
            >
              <HiArrowRight className="w-5 h-5" />
            </button>

            <div className="max-w-6xl w-full px-6 md:px-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImage.id}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] }}
                >
                  <PolaroidImage
                    src={currentImage.src}
                    alt={currentImage.alt || currentImage.title || ''}
                    width={currentImage.width}
                    height={currentImage.height}
                    quality={100}
                    containerClassName="max-h-[80vh] w-full"
                    className="!w-full !h-full"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em]">
                  {currentIndex + 1} / {filtered.length}
                </span>
                {(currentImage.caption || currentImage.title) && (
                  <p className="font-sans text-[11px] text-white/50 text-center max-w-md">
                    {currentImage.caption || currentImage.title}
                  </p>
                )}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
              {filtered.length > 15 ? (
                <span className="font-sans text-[10px] text-white/50">
                  {currentIndex + 1} of {filtered.length}
                </span>
              ) : (
                filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-500 ${i === currentIndex ? 'w-6 h-px bg-white' : 'w-3 h-px bg-white/20'}`}
                  />
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
