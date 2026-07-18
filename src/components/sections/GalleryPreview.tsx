'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const images = [
  { gradient: 'from-cream via-beige/30 to-cream', span: 'lg:col-span-2 lg:row-span-2', label: '01' },
  { gradient: 'from-beige/20 via-cream to-beige/20', span: '', label: '02' },
  { gradient: 'from-cream via-beige/30 to-cream', span: '', label: '03' },
  { gradient: 'from-beige/20 via-cream to-beige/20', span: 'lg:col-span-2', label: '04' },
];

export default function GalleryPreview() {
  return (
    <section className="py-32 md:py-40">
      <div className="container-editorial mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-mono text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">Featured Work</h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 max-w-7xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${img.gradient} ${img.span} min-h-[180px] md:min-h-[260px] lg:min-h-[300px] relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-rich-black/0 group-hover:bg-rich-black/10 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 group"
        >
          <span className="w-6 h-px bg-magenta/25 group-hover:w-10 transition-all duration-500" />
          <span className="font-sans text-[10px] text-magenta/50 uppercase tracking-[0.25em] group-hover:text-magenta transition-colors duration-500">
            View Full Gallery
          </span>
          <span className="w-6 h-px bg-magenta/25 group-hover:w-10 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
