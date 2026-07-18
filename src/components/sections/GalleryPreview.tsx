'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const images = [
  { gradient: 'from-amber-50/80 via-cream to-rose-50/40', span: 'lg:col-span-2 lg:row-span-2', height: 'h-[300px] md:h-[500px]' },
  { gradient: 'from-cream via-beige/30 to-amber-50/50', span: '', height: 'h-[200px] md:h-[240px]' },
  { gradient: 'from-rose-50/30 via-cream to-amber-50/60', span: '', height: 'h-[200px] md:h-[240px]' },
  { gradient: 'from-cream via-amber-50/40 to-beige/30', span: 'lg:col-span-2', height: 'h-[200px] md:h-[280px]' },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial mb-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <span className="font-mono text-[9px] text-magenta/40 uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">Featured Work</h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 max-w-7xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${img.gradient} ${img.span} ${img.height} relative overflow-hidden`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 group"
        >
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-500" />
          <span className="font-sans text-[10px] text-magenta/50 uppercase tracking-[0.25em] group-hover:text-magenta transition-colors duration-500">
            View Full Gallery
          </span>
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
