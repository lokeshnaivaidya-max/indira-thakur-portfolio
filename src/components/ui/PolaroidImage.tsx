'use client';

import Image from 'next/image';
import { useState, useCallback } from 'react';
import { cn, getBlurDataURL } from '@/lib/imageUtils';

interface PolaroidImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  objectPosition?: 'top' | 'center' | 'bottom' | 'left' | 'right' | string;
  priority?: boolean;
  blurDataURL?: string;
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

const POSITION_MAP: Record<string, string> = {
  top: 'object-top',
  center: 'object-center',
  bottom: 'object-bottom',
  left: 'object-left',
  right: 'object-right',
};

const DEFAULT_BLUR = getBlurDataURL('#222222');

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
  blurDataURL,
  caption,
  showCaption = false,
  sizes = '100vw',
  quality = 90,
  unoptimized = false,
  fill = false,
  onClick,
  style,
  bgColor = 'bg-cream',
}: PolaroidImageProps) {
  const [hasError, setHasError] = useState(false);

  const handleError = useCallback(() => {
    setHasError(true);
  }, []);

  const resolvedPosition = POSITION_MAP[objectPosition] ?? '';
  const hasCaption = showCaption && caption;

  const getObjectFitClass = () => {
    if (fill) {
      return objectFit === 'cover' ? 'object-cover' : 'object-contain';
    }
    return objectFit === 'cover' ? 'object-cover' : 'object-contain';
  };

  if (hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-charcoal text-warm-gray',
          containerClassName
        )}
        style={!fill ? { width, height } : undefined}
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
    <Image
      src={src}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      sizes={sizes}
      quality={quality}
      unoptimized={unoptimized}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={blurDataURL ?? DEFAULT_BLUR}
      onError={handleError}
      className={cn(
        fill && 'absolute inset-0',
        !fill && 'w-full h-full',
        getObjectFitClass(),
        resolvedPosition,
        className
      )}
      style={style}
    />
  );

  if (!hasCaption) {
    return (
      <div
        className={cn(
          'relative overflow-hidden',
          bgColor,
          containerClassName
        )}
        style={!fill ? { width, height } : undefined}
        onClick={onClick}
      >
        {img}
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
      style={!fill ? { width: undefined } : undefined}
      onClick={onClick}
    >
      <div className="relative overflow-hidden" style={!fill ? { width, height } : undefined}>
        {img}
      </div>
      <figcaption className="px-3 py-2 bg-ivory border-t border-cream">
        <p className="text-sm font-medium text-rich-black">{caption}</p>
      </figcaption>
    </figure>
  );
}
