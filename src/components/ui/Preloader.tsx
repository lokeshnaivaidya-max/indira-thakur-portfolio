'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const { config } = useSiteConfig();

  const logoUrl = config?.brand?.logo?.url || config?.footer?.logo?.url || '/indira-logo.svg';

  useEffect(() => {
    // Show preloader smoothly on initial load
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF6F3] dark:bg-[#1C1817] text-[#2B2625] dark:text-[#FAF6F3] selection:bg-[#C39E96] selection:text-white pointer-events-auto"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(227,213,202,0.3)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(195,158,150,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center px-6 text-center max-w-md">
            {/* Official Logo Container */}
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-36 h-36 md:w-44 md:h-44 mb-4"
            >
              <img
                src={logoUrl}
                alt="Indira Thakur Photography Logo"
                className="w-full h-full object-contain filter dark:invert dark:brightness-200 transition-opacity duration-300"
              />
            </motion.div>

            {/* Minimalist Progress Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="h-[1.5px] bg-gradient-to-r from-transparent via-[#C39E96] to-transparent mt-4 rounded-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
