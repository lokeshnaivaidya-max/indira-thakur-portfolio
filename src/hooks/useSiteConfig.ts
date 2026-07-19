'use client';

import { useState, useEffect } from 'react';

interface SiteImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface SiteConfigData {
  home: {
    tagline: string;
    heading: string;
    headingItalic: string;
    subtext: string;
    categories: string[];
    ctaText: string;
    ctaLink: string;
    secondaryCtaText: string;
    secondaryCtaLink: string;
    backgroundGradient: string;
    images: {
      heroMain: SiteImage;
      heroSecondary: SiteImage;
      background: SiteImage;
    };
    heroImages: SiteImage[];
    slideshowDuration: number;
    transitionDuration: number;
    kenBurnsEnabled: boolean;
    overlayIntensity: number;
  };
  about: {
    eyebrow: string;
    heading: string;
    subheading: string;
    story: string;
    storyContinued: string;
    philosophy: string;
    philosophyContinued: string;
    journey: string;
    journeyContinued: string;
    welcomeMessage: string;
    signature: string;
    specializations: string[];
    achievements: { title: string; description: string; year?: string }[];
    stats: { label: string; value: string }[];
    values: { title: string; description: string }[];
    ctaText: string;
    ctaLink: string;
    images: {
      founderPortrait: SiteImage;
      journeyImage: SiteImage;
      storyImage: SiteImage;
      achievementImage: SiteImage;
      behindTheScenes: SiteImage;
      welcomeImage: SiteImage;
      editorial1: SiteImage;
      editorial2: SiteImage;
    };
  };
  services: {
    eyebrow: string;
    heading: string;
    services: { title: string; subtitle: string; description: string; gradient: string; image: SiteImage }[];
    bannerImage: SiteImage;
  };
  galleryPreview: {
    eyebrow: string;
    heading: string;
    featuredImages: SiteImage[];
    ctaText: string;
    ctaLink: string;
  };
  testimonials: {
    eyebrow: string;
    heading: string;
    testimonials: { quote: string; author: string; role?: string; avatar: SiteImage }[];
    backgroundImage: SiteImage;
  };
  faq: {
    eyebrow: string;
    heading: string;
    faqs: { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    email: string;
    phone: string;
    location: string;
    socialLinks: { platform: string; url: string }[];
    bannerImage: SiteImage;
    studioImage: SiteImage;
  };
  footer: {
    tagline: string;
    description: string;
    email: string;
    phone: string;
    instagramUrl: string;
    facebookUrl: string;
    backgroundFooter: SiteImage;
    logo: SiteImage;
  };
  booking: {
    eyebrow: string;
    heading: string;
    description: string;
    bannerImage: SiteImage;
    sectionImage: SiteImage;
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: SiteImage;
  };
}

let cachedConfig: SiteConfigData | null = null;
let fetchPromise: Promise<SiteConfigData | null> | null = null;

export function useSiteConfig() {
  const [config, setConfig] = useState<SiteConfigData | null>(cachedConfig);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    if (cachedConfig) {
      setConfig(cachedConfig);
      setLoading(false);
      return;
    }

    if (!fetchPromise) {
      fetchPromise = fetch('/api/site-config')
        .then((response) => {
          if (response.ok) return response.json();
          return null;
        })
        .catch(() => null)
        .then((data) => {
          if (data) cachedConfig = data;
          fetchPromise = null;
          return data;
        });
    }

    fetchPromise.then((data) => {
      setConfig(data);
      setLoading(false);
    });
  }, []);

  return { config, loading };
}
