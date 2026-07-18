'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const stats: { value: number; suffix: string; label: string; icon: string }[] = [];

function Counter({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, inView]);

  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-warm-black text-soft-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_50%_50%,_#C9A96E_0%,_transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-center"
            >
              <span className="text-2xl text-muted-gold mb-4 block">{stat.icon}</span>
              <p className="font-serif text-4xl md:text-5xl lg:text-6xl text-soft-white mb-2">
                <Counter target={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="font-sans-alt text-xs md:text-sm text-earth-brown/60 tracking-wider uppercase">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
