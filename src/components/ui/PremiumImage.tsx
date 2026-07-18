'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface PremiumImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  overlay?: boolean;
  caption?: string;
  priority?: boolean;
  onClick?: () => void;
}

export default function PremiumImage({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-3-2',
  overlay = false,
  caption,
  priority = false,
  onClick,
}: PremiumImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-cream/50 ${aspectRatio} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {!loaded && (
        <div className="absolute inset-0 bg-cream/50 animate-pulse" />
      )}
      <motion.img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setLoaded(true)}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={loaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="image-cover transition-transform duration-700 hover:scale-105"
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-t from-warm-black/40 via-transparent to-transparent" />
      )}
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <p className="text-soft-white font-serif-alt text-sm">{caption}</p>
        </div>
      )}
    </div>
  );
}
