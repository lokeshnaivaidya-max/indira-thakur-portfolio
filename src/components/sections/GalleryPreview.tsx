'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const images = [
  { gradient: 'from-cream via-beige/40 to-cream', span: 'row-span-2' },
  { gradient: 'from-beige/30 via-cream to-beige/20', span: '' },
  { gradient: 'from-cream via-beige/30 to-cream', span: '' },
  { gradient: 'from-beige/20 via-cream to-beige/30', span: 'col-span-2' },
];

export default function GalleryPreview() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-editorial mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className="font-sans text-[10px] text-magenta/40 uppercase tracking-[0.3em]">Portfolio</span>
          <h2 className="font-serif text-4xl md:text-5xl text-rich-black leading-[1.1] mt-4">
            Featured Work
          </h2>
        </motion.div>
      </div>

      <div className="px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className={`bg-gradient-to-br ${img.gradient} ${img.span} min-h-[200px] md:min-h-[300px]`}
            />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-3 font-sans text-[10px] text-magenta/60 uppercase tracking-[0.25em] hover:text-magenta transition-colors duration-500 group"
        >
          <span className="w-6 h-px bg-magenta/30 group-hover:w-10 transition-all duration-500" />
          View Full Gallery
          <span className="w-6 h-px bg-magenta/30 group-hover:w-10 transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
