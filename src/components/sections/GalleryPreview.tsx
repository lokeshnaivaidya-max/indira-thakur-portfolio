'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import { HiArrowRight } from 'react-icons/hi2';

const categories = ['All', 'Newborn', 'Maternity', 'Portrait', 'Events'];

const galleryImages = [
  { id: 1, category: 'Newborn', gradient: 'from-soft-rose to-warm-blush', aspect: 'aspect-4-5', span: 'row-span-2' },
  { id: 2, category: 'Maternity', gradient: 'from-warm-blush to-cream', aspect: 'aspect-1-1', span: '' },
  { id: 3, category: 'Portrait', gradient: 'from-cream to-beige', aspect: 'aspect-3-2', span: '' },
  { id: 4, category: 'Events', gradient: 'from-warm-cream to-beige', aspect: 'aspect-4-5', span: '' },
  { id: 5, category: 'Newborn', gradient: 'from-soft-rose to-cream', aspect: 'aspect-1-1', span: '' },
  { id: 6, category: 'Maternity', gradient: 'from-warm-blush to-beige', aspect: 'aspect-3-2', span: '' },
  { id: 7, category: 'Portrait', gradient: 'from-cream to-warm-cream', aspect: 'aspect-4-5', span: 'row-span-2' },
  { id: 8, category: 'Events', gradient: 'from-warm-cream to-soft-rose', aspect: 'aspect-1-1', span: '' },
];

export default function GalleryPreview() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="section-padding bg-soft-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          subtitle="My Work"
          title="Featured Gallery"
          description="A curated selection of my favorite photographs, each telling a unique story."
        />

        {/* Category Filters */}
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

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((img, index) => (
              <motion.div
                key={img.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`relative overflow-hidden rounded-sm bg-gradient-to-br ${img.gradient} ${img.aspect} ${img.span} group cursor-pointer`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="font-sans-alt text-xs tracking-[0.15em] uppercase text-soft-white">
                    {img.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 px-8 py-4 bg-warm-black text-soft-white font-sans-alt text-sm tracking-[0.15em] uppercase hover:bg-earth-brown transition-all duration-500"
          >
            View Full Gallery
            <HiArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
