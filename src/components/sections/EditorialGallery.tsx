'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
import { DEMO_GALLERY } from '@/data/demoContent';

interface GalleryImageItem {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  caption?: string;
}

const fallbackImages: GalleryImageItem[] = [
  // NEWBORN
  {
    id: 'nb-1',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
    alt: 'Fine Art Newborn Storytelling',
    category: 'newborn',
    title: 'Silent Beginnings',
    caption: 'Soft, organic newborn portraiture in natural studio light with silk wrap.'
  },
  {
    id: 'nb-2',
    src: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200',
    alt: 'Newborn Sleeping Lightly',
    category: 'newborn',
    title: 'Innocence Preserved',
    caption: 'Delicate fingers and peaceful slumber captured in warmth.'
  },
  {
    id: 'nb-3',
    src: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Swaddled Newborn Miracle',
    category: 'newborn',
    title: 'The First Dawn',
    caption: 'Hand-knit organic blanket texture celebrating new life.'
  },
  {
    id: 'nb-4',
    src: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=1200',
    alt: 'Peaceful Newborn Nest',
    category: 'newborn',
    title: 'Warmth of Sanctuary',
    caption: 'Minimalist studio setup highlighting tender newborn expressions.'
  },
  {
    id: 'nb-5',
    src: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1200',
    alt: 'Gentle Hands with Newborn',
    category: 'newborn',
    title: 'An Eternal Bond',
    caption: 'Father’s gentle hands cradling a newborn in serene light.'
  },
  {
    id: 'nb-6',
    src: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=1200',
    alt: 'Golden Hour Newborn Details',
    category: 'newborn',
    title: 'Quiet Whispers',
    caption: 'Macro portraiture focusing on tiny lashes and peaceful breath.'
  },

  // MATERNITY
  {
    id: 'mat-1',
    src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luxury Maternity Photography',
    category: 'maternity',
    title: 'Grace in Expectation',
    caption: 'Couture silk drape maternity storytelling celebrating mothers in Bangalore.'
  },
  {
    id: 'mat-2',
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=1200',
    alt: 'Motherhood Serenity',
    category: 'maternity',
    title: 'Motherhood Divine',
    caption: 'Radiant motherhood portrait surrounded by natural warm light.'
  },
  {
    id: 'mat-3',
    src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sunset Maternity Glow',
    category: 'maternity',
    title: 'Golden Sanctuary',
    caption: 'Outdoor golden hour maternity commission at a scenic landscape.'
  },
  {
    id: 'mat-4',
    src: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=1200',
    alt: 'Minimalist Studio Maternity',
    category: 'maternity',
    title: 'Form & Feeling',
    caption: 'Editorial monochrome studio portraiture focusing on silhouette.'
  },
  {
    id: 'mat-5',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Ethereal Maternity Portrait',
    category: 'maternity',
    title: 'Ethereal Light',
    caption: 'Soft linen studio drapes enhancing natural maternal elegance.'
  },
  {
    id: 'mat-6',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Intimate Couple Maternity',
    category: 'maternity',
    title: 'Shared Anticipation',
    caption: 'Emotive couple portrait embracing the arrival of new life.'
  },

  // FAMILY
  {
    id: 'fam-1',
    src: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200',
    alt: 'Warm Outdoor Family Storytelling',
    category: 'family',
    title: 'Generations of Joy',
    caption: 'Unscripted, organic family connection under canopy of light.'
  },
  {
    id: 'fam-2',
    src: 'https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sunset Beach Family Memory',
    category: 'family',
    title: 'Coastal Embrace',
    caption: 'Candid laughter and warmth captured in golden sunset tide.'
  },
  {
    id: 'fam-3',
    src: 'https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&q=80&w=1200',
    alt: 'Intergenerational Legacy',
    category: 'family',
    title: 'Roots & Heritage',
    caption: 'Timeless multi-generational portrait for family archives.'
  },
  {
    id: 'fam-4',
    src: 'https://images.unsplash.com/photo-1542037104857-ffbb0b9155fb?auto=format&fit=crop&q=80&w=1200',
    alt: 'Laughter in the Meadows',
    category: 'family',
    title: 'Meadow Reverie',
    caption: 'Relaxed outdoor lifestyle session in Bangalore estate grounds.'
  },
  {
    id: 'fam-5',
    src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=1200',
    alt: 'Home Studio Connection',
    category: 'family',
    title: 'Quiet Domesticity',
    caption: 'Natural, documentary family moments captured at home.'
  },
  {
    id: 'fam-6',
    src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=1200',
    alt: 'Parents holding children high',
    category: 'family',
    title: 'Unbound Happiness',
    caption: 'Joyful expressions captured during golden hour play.'
  },

  // BABY
  {
    id: 'bb-1',
    src: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1200',
    alt: 'Milestone Baby Portrait',
    category: 'baby',
    title: 'The First Year Milestone',
    caption: 'Expressive 6-month sitting session with natural wooden props.'
  },
  {
    id: 'bb-2',
    src: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Curious Toddler Gaze',
    category: 'baby',
    title: 'Wonder in Eyes',
    caption: 'Capturing innocent curiosity and pure soulfulness.'
  },
  {
    id: 'bb-3',
    src: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=1200',
    alt: 'Playful Baby Smile',
    category: 'baby',
    title: 'Giggles & Light',
    caption: 'Soft studio lighting bringing out joyful dimples and laughter.'
  },
  {
    id: 'bb-4',
    src: 'https://images.unsplash.com/photo-1519340333755-56e9c1d04579?auto=format&fit=crop&q=80&w=1200',
    alt: 'First Steps & Exploration',
    category: 'baby',
    title: 'First Discoveries',
    caption: 'Unscripted toddler milestone captures in natural surroundings.'
  },
  {
    id: 'bb-5',
    src: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Sleepy Baby Moment',
    category: 'baby',
    title: 'Soft Reverie',
    caption: 'Quiet afternoon studio session with organic textures.'
  },
  {
    id: 'bb-6',
    src: 'https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?auto=format&fit=crop&q=80&w=1200',
    alt: 'Interactive Baby Play',
    category: 'baby',
    title: 'Pure Delight',
    caption: 'Authentic emotion captured without artificial posing.'
  },

  // PORTRAIT
  {
    id: 'prt-1',
    src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&q=80&w=1200',
    alt: 'Editorial Fine Art Portrait',
    category: 'portrait',
    title: 'Eternal Expression',
    caption: 'Soulful fine art portraiture with painterly light and shadow.'
  },
  {
    id: 'prt-2',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
    alt: 'High Fashion Fine Art',
    category: 'portrait',
    title: 'Solitude & Serenity',
    caption: 'Editorial studio composition with rich tonality.'
  },
  {
    id: 'prt-3',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200',
    alt: 'Classic Character Portrait',
    category: 'portrait',
    title: 'Depth of Soul',
    caption: 'Intimate monochrome portrait highlighting human depth.'
  },
  {
    id: 'prt-4',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200',
    alt: 'Natural Window Light Portrait',
    category: 'portrait',
    title: 'Morning Solace',
    caption: 'Natural window light streaming onto warm linen.'
  },
  {
    id: 'prt-5',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luminous Personal Portrait',
    category: 'portrait',
    title: 'Quiet Confidence',
    caption: 'Fine art personal branding and legacy portraiture.'
  },
  {
    id: 'prt-6',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=1200',
    alt: 'Moody Fine Art Portrait',
    category: 'portrait',
    title: 'Chiaroscuro Reflection',
    caption: 'Classic Rembrandt lighting setup in studio environment.'
  },

  // EVENTS
  {
    id: 'evt-1',
    src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&q=80&w=1200',
    alt: 'Celebration Event',
    category: 'events',
    title: 'Intimate Gathering',
    caption: 'Cinematic documentary coverage of bespoke family celebrations.'
  },
  {
    id: 'evt-2',
    src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
    alt: 'Luxury Celebration Table',
    category: 'events',
    title: 'Grand Occasion',
    caption: 'Atmospheric detail captures at luxury milestone events.'
  },
  {
    id: 'evt-3',
    src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200',
    alt: 'First Birthday Soiree',
    category: 'events',
    title: 'Year One Soiree',
    caption: 'Curated editorial coverage for intimate milestone birthdays.'
  },
  {
    id: 'evt-4',
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=1200',
    alt: 'Candid Joyful Toast',
    category: 'events',
    title: 'Toasts & Memories',
    caption: 'Authentic emotional reactions during family speeches.'
  },
  {
    id: 'evt-5',
    src: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200',
    alt: 'Floral Aesthetics & Decor',
    category: 'events',
    title: 'Editorial Details',
    caption: 'Fine art event styling and architectural ambient light.'
  },
  {
    id: 'evt-6',
    src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200',
    alt: 'Twilight Celebration',
    category: 'events',
    title: 'Under Starlight',
    caption: 'Ambient outdoor celebration lighting captured with cinematic flair.'
  }
];

const categoryTabs = [
  { id: 'all', label: 'All Collection' },
  { id: 'newborn', label: 'Newborn' },
  { id: 'maternity', label: 'Maternity' },
  { id: 'family', label: 'Family' },
  { id: 'baby', label: 'Baby' },
  { id: 'portrait', label: 'Fine Art Portrait' },
  { id: 'events', label: 'Events' }
];

export default function EditorialGallery({ isPreview = false }: { isPreview?: boolean }) {
  const { config } = useSiteConfig();
  const [activeCategory, setActiveCategory] = useState('all');
  const [images, setImages] = useState<GalleryImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    async function loadGallery() {
      try {
        setLoading(true);
        const res = await fetch('/api/gallery-images');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const mapped: GalleryImageItem[] = data.map((img: any, idx: number) => ({
              id: img.id || img._id || `img-${idx}`,
              src: img.src || img.url,
              alt: img.alt || img.title || 'Indira Thakur Photography',
              category: (img.category || 'portrait').toLowerCase(),
              title: img.title || 'Portfolio Work',
              caption: img.description || img.caption || ''
            }));
            setImages(mapped);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error('Failed to load gallery images:', err);
      }

      // Fallback from config or default fallback list
      const configFeatured = config?.galleryPreview?.featuredImages;
      if (Array.isArray(configFeatured) && configFeatured.length > 0) {
        const mappedConfig: GalleryImageItem[] = configFeatured.map((img: any, idx: number) => ({
          id: `cfg-${idx}`,
          src: img.url,
          alt: img.alt || 'Indira Thakur Fine Art',
          category: 'portrait',
          title: img.caption || 'Fine Art Highlight',
          caption: img.caption || ''
        }));
        setImages(mappedConfig);
      } else {
        setImages(DEMO_GALLERY as any);
      }
      setLoading(false);
    }

    loadGallery();
  }, [config]);

  const filteredImages = useMemo(() => {
    let list = images;
    if (activeCategory !== 'all') {
      list = images.filter((img) => img.category.includes(activeCategory.toLowerCase()));
    }
    return isPreview ? list.slice(0, 6) : list;
  }, [images, activeCategory, isPreview]);

  return (
    <section className="py-24 md:py-36 bg-[#FAF6F3] text-[#2B2625] relative">
      <div className="container-editorial">
        {/* Gallery Title & Filters */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block font-medium mb-2">
              PORTFOLIO ARCHIVE
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2625] leading-none">
              Editorial Gallery
            </h2>
          </motion.div>

          {/* Filtering Tabs */}
          {!isPreview && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex flex-wrap items-center gap-2 md:gap-4"
            >
              {categoryTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`px-5 py-2 font-mono text-[11px] uppercase tracking-[0.25em] transition-all duration-300 rounded-full cursor-pointer ${
                    activeCategory === tab.id
                      ? 'bg-[#2B2625] text-white shadow-sm'
                      : 'bg-white text-[#7C706D] hover:text-[#2B2625] border border-[#E7DDD2]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="py-20 text-center font-mono text-xs uppercase tracking-[0.3em] text-[#7C706D]/60 animate-pulse">
            Loading Fine Art Works...
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="py-20 text-center font-sans text-sm text-[#7C706D]">
            No photographs found in this collection category.
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            <AnimatePresence>
              {filteredImages.map((img, idx) => (
                <motion.div
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  onClick={() => setSelectedImageIndex(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-sm bg-white border border-[#E7DDD2] shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <PolaroidImage
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="!w-full !h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      containerClassName="!w-full !h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B2625]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white" />
                  </div>
                  <div className="p-5 flex items-center justify-between border-t border-[#E7DDD2]/50 bg-white">
                    <div>
                      <h4 className="font-serif text-lg text-[#2B2625] leading-snug font-medium group-hover:text-[#C39E96] transition-colors">
                        {img.title || 'Untitled Story'}
                      </h4>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#7C706D] mt-0.5">
                        {img.category}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#C39E96] group-hover:translate-x-1 transition-transform">
                      ↗
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Lightbox Modal */}
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
                      {filteredImages[selectedImageIndex].title || 'Untitled Story'}
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
