'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionHeading from '@/components/ui/SectionHeading';

const journeyItems: any[] = [];

export default function Journey() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="section-padding bg-soft-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-warm-blush/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-warm-cream/40 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionHeading
          subtitle="The Story So Far"
          title="My Journey"
          description="Every photographer has a story. Here's a glimpse into the path that led me to where I am today."
        />

        <div ref={ref} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[1px] bg-warm-beige/60 -translate-x-1/2" />

          <div className="space-y-16 md:space-y-24">
            {journeyItems.map((item, index) => (
              <TimelineItem
                key={item.year}
                item={item}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  item,
  index,
  inView,
}: {
  item: (typeof journeyItems)[0];
  index: number;
  inView: boolean;
}) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative flex flex-col md:flex-row items-start gap-8 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content */}
      <div className={`flex-1 pl-20 md:pl-0 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
        <span className="font-serif-alt italic text-muted-gold text-lg">{item.year}</span>
        <h3 className="font-serif text-2xl md:text-3xl text-warm-black mt-1">{item.title}</h3>
        <p className="mt-3 text-earth-brown/70 font-sans-alt text-sm leading-relaxed">{item.description}</p>
      </div>

      {/* Center Dot */}
      <div className="absolute left-8 md:left-1/2 top-1 -translate-x-1/2 z-10">
        <div className="w-4 h-4 rounded-full bg-muted-gold border-2 border-soft-white shadow-sm" />
      </div>

      {/* Spacer for alternate layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  );
}
