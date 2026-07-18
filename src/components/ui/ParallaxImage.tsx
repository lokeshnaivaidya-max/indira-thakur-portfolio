'use client';

import { useEffect, useRef, useState } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
}

export default function ParallaxImage({ src, alt, className = '', speed = 0.5 }: ParallaxImageProps) {
  const [offsetY, setOffsetY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrollY = window.scrollY;
        const elementTop = rect.top + scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (elementTop < scrollY + windowHeight && elementTop + elementHeight > scrollY) {
          const relativeScroll = scrollY - elementTop + windowHeight;
          setOffsetY(relativeScroll * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="w-full h-[120%] -top-[10%] relative transition-transform duration-100 ease-out"
        style={{ transform: `translateY(${offsetY * 0.3}px)` }}
      >
        <img src={src} alt={alt} className="image-cover" />
      </div>
    </div>
  );
}
