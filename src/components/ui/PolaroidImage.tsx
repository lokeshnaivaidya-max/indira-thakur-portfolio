'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/imageUtils';

interface PolaroidImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right' | string;
  priority?: boolean;
  caption?: string;
  showCaption?: boolean;
  sizes?: string;
  quality?: number;
  unoptimized?: boolean;
  fill?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
  bgColor?: string;
}

const OBJECT_POSITION_CLASS: Record<string, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

export function PolaroidImage({
  src,
  alt,
  width = 800,
  height = 600,
  className,
  containerClassName,
  objectFit = 'contain',
  objectPosition = 'center',
  priority = false,
  caption,
  showCaption = false,
  sizes,
  quality = 90,
  unoptimized = false,
  fill = false,
  onClick,
  style,
  bgColor = 'bg-[#FAF6F3]',
}: PolaroidImageProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const hasCaption = showCaption && caption;

  const positionClass = OBJECT_POSITION_CLASS[objectPosition] ?? 'object-center';

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-[#2B2625] text-[#7C706D]',
          containerClassName
        )}
        style={!fill ? { aspectRatio: `${width} / ${height}` } : undefined}
      >
        <svg
          className="h-12 w-12 opacity-40"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const img = (
    <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
      {/* Ambient Blurred Background to eliminate empty pillarbox/letterbox with soft matching photo hues */}
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-30 scale-110 pointer-events-none"
      />
      {/* Crisp Main Uncropped Photograph */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        referrerPolicy="no-referrer"
        onError={handleError}
        onLoad={() => setIsLoaded(true)}
        className={cn(
          'relative z-10 w-full h-full transition-all duration-700 ease-out',
          !isLoaded ? 'opacity-0 scale-95 blur-[2px]' : 'opacity-100 scale-100 blur-0',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          positionClass,
          className
        )}
        style={style}
      />
    </div>
  );

  if (!hasCaption) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          bgColor,
          containerClassName
        )}
        style={
          !fill
            ? { aspectRatio: `${width} / ${height}`, ...style }
            : style
        }
        onClick={onClick}
      >
        {img}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-cream/60 to-cream/40 animate-pulse flex items-center justify-center">
            <svg
              className="h-8 w-8 text-warm-gray/25 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
    );
  }

  return (
    <figure
      className={cn(
        'group relative overflow-hidden',
        bgColor,
        onClick && 'cursor-pointer',
        containerClassName
      )}
      style={!fill ? { aspectRatio: `${width} / ${height}` } : undefined}
      onClick={onClick}
    >
      <div className="relative w-full h-full">
        {img}
        {!isLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-cream/60 to-cream/40 animate-pulse flex items-center justify-center">
            <svg
              className="h-8 w-8 text-warm-gray/25 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <figcaption className="px-3 py-2 bg-ivory border-t border-cream">
        <p className="text-sm font-medium text-rich-black">{caption}</p>
      </figcaption>
    </figure>
  );
}
