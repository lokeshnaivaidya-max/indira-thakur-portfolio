'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const images = [
  { gradient: 'from-amber-50/70 via-cream to-rose-50/30', size: 'full', height: 'h-[60vh] md:h-[75vh]' },
  { gradient: 'from-cream via-beige/30 to-amber-50/40', size: 'half', height: 'h-[35vh] md:h-[45vh]' },
  { gradient: 'from-rose-50/30 via-cream to-amber-50/50', size: 'half', height: 'h-[35vh] md:h-[45vh]' },
  { gradient: 'from-cream via-amber-50/30 to-beige/20', size: 'full', height: 'h-[50vh] md:h-[60vh]' },
];

export default function GalleryPreview() {
  return (
    <section className="py-20 md:py-28 bg-ivory">
      <div className="container-editorial mb-10">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}>
          <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Portfolio</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-3">Featured Work</h2>
        </motion.div>
      </div>

      <div className="px-6 md:px-12 lg:px-20">
        <div className="max-w-7xl mx-auto space-y-3 md:space-y-4">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${img.gradient} ${img.height} ${img.size === 'full' ? 'w-full' : 'w-full md:w-[calc(50%-8px)] inline-block'}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 group"
        >
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-700" />
          <span className="font-sans text-[9px] text-magenta/50 uppercase tracking-[0.3em] group-hover:text-magenta transition-colors duration-500">
            View Full Gallery
          </span>
          <span className="w-5 h-px bg-magenta/25 group-hover:w-8 transition-all duration-700" />
        </Link>
      </div>
    </section>
  );
}
