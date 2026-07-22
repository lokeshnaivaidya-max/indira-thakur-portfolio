'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';

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
    heroImages: (SiteImage & { duration?: number; animation?: string })[];
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
    description?: string;
    services: { title: string; subtitle: string; description: string; gradient: string; image: SiteImage; tagline?: string; features?: string[] }[];
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
    testimonials: { quote: string; author: string; role?: string; rating?: number; avatar: SiteImage }[];
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
  brand?: {
    name?: string;
    siteName?: string;
    tagline?: string;
    logo?: SiteImage;
    preloaderLogo?: SiteImage;
    favicon?: SiteImage;
    copyright?: string;
    contactEmail?: string;
    contactPhone?: string;
    contactLocation?: string;
    instagramUrl?: string;
    facebookUrl?: string;
    defaultOgImage?: SiteImage;
  };
  hero?: Record<string, unknown>;
  [key: string]: unknown;
}

export const DEFAULT_SITE_CONFIG: SiteConfigData = {
  home: {
    tagline: 'INDIRA THAKUR · FINE ART PHOTOGRAPHY',
    heading: 'CAPTURING LIFE IN ITS',
    headingItalic: 'Purest Emotion',
    subtext: 'Specializing in newborn, maternity, portrait, and family storytelling in Mumbai, India.',
    categories: ['Newborn', 'Maternity', 'Family & Legacy', 'Fine Art Portraits'],
    ctaText: 'Commission Session',
    ctaLink: '/contact',
    secondaryCtaText: 'Explore Portfolio',
    secondaryCtaLink: '/gallery',
    backgroundGradient: 'from-[#1A1110] via-[#2C1810] to-rich-black',
    images: {
      heroMain: {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
        alt: 'Fine Art Newborn Storytelling',
      },
      heroSecondary: {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600',
        alt: 'Luxury Maternity Photography',
      },
      background: {
        url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
        alt: 'Warm Outdoor Family Storytelling',
      },
    },
    heroImages: [
      {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1600',
        alt: 'Fine Art Newborn Storytelling',
        duration: 7,
        animation: 'auto',
      },
      {
        url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1600',
        alt: 'Luxury Maternity Photography',
        duration: 7,
        animation: 'auto',
      },
      {
        url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
        alt: 'Warm Outdoor Family Storytelling',
        duration: 7,
        animation: 'auto',
      },
    ],
    slideshowDuration: 7,
    transitionDuration: 1.5,
    kenBurnsEnabled: true,
    overlayIntensity: 0.5,
  },
  about: {
    eyebrow: 'THE ARTIST & VISION',
    heading: 'Indira Thakur',
    subheading: 'Fine Art Photographer',
    story: "Hello! I am Indira Thakur, a passionate storyteller and professional photographer. I come from a background in Journalism and Public Relations, where I developed a deep appreciation for storytelling and human emotions. In 2013, I transformed that passion into photography, and what started as a creative journey soon became my life's purpose.",
    storyContinued: 'Photography, for me, is much more than taking pictures. It is about preserving emotions, celebrating families, documenting milestones, and creating timeless memories that people will treasure for generations.',
    philosophy: 'I believe every family is unique, and every session deserves patience, warmth, creativity, and genuine care. My goal is not just to deliver photographs but to create memories that families will revisit with love for decades.',
    philosophyContinued: 'With over a decade dedicated to mastering the delicate nuances of natural light and human connection, Indira Thakur creates fine art photography that transcends traditional portraiture.',
    journey: 'One of the proudest milestones in my journey was creating a film for Dadasaheb Phalke Chitranagri (Filmcity), Goregaon. The film premiered at the Chitrapataka Film Festival. Since my very first project, I have earned the trust of countless families by providing a personalized and comfortable experience during every shoot.',
    journeyContinued: '',
    welcomeMessage: 'I warmly invite you to become a part of the Indira Thakur Photography family. Let us create something beautiful together.',
    signature: 'Indira Thakur',
    specializations: ['Maternity Photography', 'Newborn Photography', 'Family Portraits', 'Fine Art Portraits'],
    achievements: [
      { title: 'Dadasaheb Phalke Filmcity Feature', description: 'Documentary film premiered at Chitrapataka Film Festival', year: '2018' },
      { title: '12+ Years Excellence', description: 'Over 800+ milestone families documented across South India', year: '2025' },
    ],
    stats: [
      { label: 'Years Experience', value: '12+' },
      { label: 'Milestone Families', value: '800+' },
      { label: 'National Accolades', value: '15+' },
    ],
    values: [
      { title: 'Emotive Authenticity', description: 'Capturing unscripted human emotion in natural studio light' },
      { title: 'Patience & Care', description: 'Unhurried baby-led sessions designed for family comfort' },
    ],
    ctaText: 'Inquire With Indira',
    ctaLink: '/contact',
    images: {
      founderPortrait: {
        url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
        alt: 'Indira Thakur Fine Art Portrait',
      },
      journeyImage: {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
        alt: 'Newborn Photography Artistry',
      },
      storyImage: {
        url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
        alt: 'Newborn Story',
      },
      achievementImage: { url: '', alt: '' },
      behindTheScenes: { url: '', alt: '' },
      welcomeImage: { url: '', alt: '' },
      editorial1: { url: '', alt: '' },
      editorial2: { url: '', alt: '' },
    },
  },
  services: {
    eyebrow: 'WHAT I OFFER',
    heading: 'Bespoke Experience & Services',
    services: [],
    bannerImage: { url: '', alt: '' },
  },
  galleryPreview: {
    eyebrow: 'PORTFOLIO',
    heading: 'Featured Work',
    featuredImages: [],
    ctaText: 'View Full Gallery',
    ctaLink: '/gallery',
  },
  testimonials: {
    eyebrow: 'KIND WORDS',
    heading: 'What Families Say',
    testimonials: [],
    backgroundImage: { url: '', alt: '' },
  },
  faq: {
    eyebrow: 'QUESTIONS',
    heading: 'Commonly Asked',
    faqs: [],
  },
  contact: {
    eyebrow: "LET'S CREATE",
    heading: 'Begin Your Story',
    description: 'Every beautiful photograph begins with a conversation.',
    email: 'photography@indirathakur.com',
    phone: '+91 9819620484',
    location: 'Mumbai, India',
    socialLinks: [],
    bannerImage: { url: '', alt: '' },
    studioImage: { url: '', alt: '' },
  },
  footer: {
    tagline: 'Fine Art Photography',
    description: "Capturing life's most precious moments with emotional resonance, timeless artistry, and an unwavering attention to detail.",
    email: 'photography@indirathakur.com',
    phone: '+91 9819620484',
    instagramUrl: 'https://instagram.com',
    facebookUrl: 'https://facebook.com',
    backgroundFooter: { url: '', alt: '' },
    logo: { url: '', alt: '' },
  },
  booking: {
    eyebrow: 'Book a Session',
    heading: 'Reserve Your Moment',
    description: '',
    bannerImage: { url: '', alt: '' },
    sectionImage: { url: '', alt: '' },
  },
  seo: {
    title: 'Indira Thakur Photography | Fine Art & Editorial Photography',
    description: 'Specializing in newborn, maternity, portrait, and family storytelling in Mumbai, India.',
    keywords: ['photographer', 'newborn', 'maternity', 'portrait', 'mumbai'],
    ogImage: { url: '', alt: '' },
  },
  brand: {
    siteName: 'Indira Thakur Photography',
    tagline: 'FINE ART PHOTOGRAPHY',
    logo: { url: '', alt: 'Indira Thakur Photography Logo' },
    favicon: { url: '', alt: 'Favicon' },
  },
};

interface SiteConfigContextType {
  config: SiteConfigData | null;
  loading: boolean;
}

const SiteConfigContext = createContext<SiteConfigContextType>({
  config: DEFAULT_SITE_CONFIG,
  loading: false,
});

let cachedConfig: SiteConfigData | null = null;
let fetchPromise: Promise<SiteConfigData | null> | null = null;

export function SiteConfigProvider({
  initialConfig,
  children,
}: {
  initialConfig: SiteConfigData | null;
  children: React.ReactNode;
}) {
  const [config, setConfig] = useState<SiteConfigData | null>(() => {
    if (initialConfig) {
      cachedConfig = initialConfig;
      return initialConfig;
    }
    return cachedConfig || DEFAULT_SITE_CONFIG;
  });
  const [loading, setLoading] = useState<boolean>(!initialConfig && !cachedConfig);

  useEffect(() => {
    if (initialConfig || cachedConfig) {
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
      if (data) setConfig(data);
      setLoading(false);
    });
  }, [initialConfig]);

  return (
    <SiteConfigContext.Provider value={{ config: config || DEFAULT_SITE_CONFIG, loading }}>
      {children}
    </SiteConfigContext.Provider>
  );
}

export function useSiteConfig() {
  const context = useContext(SiteConfigContext);
  if (context && context.config) {
    return context;
  }
  return {
    config: cachedConfig || DEFAULT_SITE_CONFIG,
    loading: !cachedConfig,
  };
}

export function invalidateSiteConfigCache() {
  cachedConfig = null;
  fetchPromise = null;
}

