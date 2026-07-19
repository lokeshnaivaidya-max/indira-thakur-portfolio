'use client';

import { useEffect, useState, useRef } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

interface BrandData {
  siteName?: string;
  favicon?: { url: string; alt: string };
  defaultOgImage?: { url: string; alt: string };
}

export default function DynamicHead() {
  const { config } = useSiteConfig();
  const [brand, setBrand] = useState<BrandData | null>(null);

  const prevFaviconUrl = useRef<string>('');
  const prevOgImageUrl = useRef<string>('');

  useEffect(() => {
    fetch('/api/brand')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setBrand(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    // Update page title from SEO settings
    const seoTitle = config?.seo?.title;
    const siteName = brand?.siteName || 'Indira Thakur Photography';
    const title = seoTitle || siteName;
    document.title = title.includes('Indira Thakur') ? title : `${title} | Indira Thakur Photography`;

    // Update favicon ONLY when URL actually changes
    const faviconUrl = brand?.favicon?.url || '';
    if (faviconUrl && faviconUrl !== prevFaviconUrl.current) {
      prevFaviconUrl.current = faviconUrl;

      const existing = document.querySelectorAll("link[rel='icon']");
      existing.forEach(el => el.remove());

      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = faviconUrl;
      document.head.appendChild(link);
    }

    // Update og:image ONLY when URL actually changes
    const ogImageUrl = brand?.defaultOgImage?.url || config?.seo?.ogImage?.url || '';
    if (ogImageUrl && ogImageUrl !== prevOgImageUrl.current) {
      prevOgImageUrl.current = ogImageUrl;

      const existingOg = document.querySelector("meta[property='og:image']");
      if (existingOg) {
        existingOg.setAttribute('content', ogImageUrl);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:image');
        meta.setAttribute('content', ogImageUrl);
        document.head.appendChild(meta);
      }
    }
  }, [config, brand]);

  return null;
}