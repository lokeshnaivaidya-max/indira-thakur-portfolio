'use client';

import { useEffect } from 'react';
import { useSiteConfig } from '@/hooks/useSiteConfig';

export default function DynamicHead() {
  const { config } = useSiteConfig();

  useEffect(() => {
    if (!config) return;

    // Update page title from SEO settings
    const title = config.seo?.title || config.home?.heading || 'Indira Thakur Photography';
    document.title = title.includes('Indira Thakur') ? title : `${title} | Indira Thakur Photography`;

    // Update favicon
    const faviconUrl = (config as any).brand?.favicon?.url || (config as any).footer?.logo?.url || '';
    if (faviconUrl) {
      // Remove existing favicon links
      const existing = document.querySelectorAll("link[rel='icon']");
      existing.forEach(el => el.remove());

      // Add new favicon with cache bust
      const link = document.createElement('link');
      link.rel = 'icon';
      link.type = 'image/x-icon';
      link.href = faviconUrl.includes('?') ? `${faviconUrl}&v=${Date.now()}` : `${faviconUrl}?v=${Date.now()}`;
      document.head.appendChild(link);
    }

    // Update og:image
    const ogImageUrl = (config as any).brand?.defaultOgImage?.url || '';
    if (ogImageUrl) {
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
  }, [config]);

  return null;
}
