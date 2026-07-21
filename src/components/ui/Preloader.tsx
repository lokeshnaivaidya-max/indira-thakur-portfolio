'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show preloader smoothly on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF6F3] dark:bg-[#1C1817] text-[#2B2625] dark:text-[#FAF6F3] selection:bg-[#C39E96] selection:text-white pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,213,202,0.3)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(195,158,150,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
            {/* Logo Emblem Container with Gentle Pulse */}
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-32 h-32 md:w-40 md:h-40 mb-6 drop-shadow-xl"
            >
              <img
                src="/indira-logo.svg"
                alt="Indira Thakur Photography Logo"
                className="w-full h-full object-contain filter dark:invert dark:brightness-200"
              />
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center gap-1.5"
            >
              <h1 className="font-serif text-2xl md:text-3xl lg:text-4xl tracking-tight text-[#2B2625] dark:text-[#FAF6F3] font-normal">
                Indira Thakur
              </h1>
              <p className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.35em] text-[#7C706D] dark:text-[#E7DDD2]/70 font-medium">
                FINE ART PHOTOGRAPHY
              </p>
            </motion.div>

            {/* Minimalist Progress Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '120px' }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#C39E96] to-transparent mt-8 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
