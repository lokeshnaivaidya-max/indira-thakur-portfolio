'use client';

import { useState, useCallback, useRef } from 'react';

export type SectionType = 'hero' | 'text-image' | 'banner' | 'gallery' | 'cards' | 'testimonials' | 'cta' | 'faq' | 'richtext' | 'split' | 'timeline';

export interface SectionItem {
  heading?: string;
  body?: string;
  image?: { url: string; alt: string };
  icon?: string;
  label?: string;
}

export interface SectionButton {
  text: string;
  link: string;
  style: 'primary' | 'secondary' | 'outline';
}

export interface SectionImage {
  url: string;
  alt: string;
  caption?: string;
}

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  subtitle?: string;
  visible: boolean;
  order: number;
  heading?: string;
  subheading?: string;
  body?: string;
  richText?: string;
  images: SectionImage[];
  primaryImage?: SectionImage;
  layout: 'full' | 'contained' | 'split-left' | 'split-right';
  background: 'white' | 'ivory' | 'cream' | 'rich-black' | 'charcoal' | 'gradient';
  backgroundGradient?: string;
  buttons: SectionButton[];
  items: SectionItem[];
  spacing: 'none' | 'small' | 'medium' | 'large';
  animation: 'none' | 'fade' | 'slide-up' | 'slide-in';
}

function createDefaultSection(type: SectionType): Section {
  const base: Section = {
    id: crypto.randomUUID(),
    type,
    title: '',
    visible: true,
    order: 0,
    images: [],
    layout: 'full',
    background: 'white',
    buttons: [],
    items: [],
    spacing: 'medium',
    animation: 'none',
  };

  switch (type) {
    case 'hero':
      return { ...base, title: 'Hero Section', heading: '', subheading: '' };
    case 'text-image':
      return { ...base, title: 'Text + Image', heading: '', body: '', layout: 'split-left' };
    case 'banner':
      return { ...base, title: 'Full Width Banner', heading: '', subheading: '', background: 'rich-black' };
    case 'gallery':
      return { ...base, title: 'Gallery', images: [] };
    case 'cards':
      return { ...base, title: 'Cards Grid', items: [{ heading: '', body: '' }] };
    case 'testimonials':
      return { ...base, title: 'Testimonials', items: [{ heading: '', body: '' }] };
    case 'cta':
      return { ...base, title: 'Call to Action', heading: '', body: '', background: 'rich-black' };
    case 'faq':
      return { ...base, title: 'FAQ', items: [{ heading: '', body: '' }] };
    case 'richtext':
      return { ...base, title: 'Rich Text', richText: '' };
    case 'split':
      return { ...base, title: 'Split Layout', layout: 'full' };
    case 'timeline':
      return { ...base, title: 'Timeline', items: [{ heading: '', body: '', label: '' }] };
    default:
      return base;
  }
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function useSectionsBuilder(initialPageKey: string = 'home') {
  const [pageKey, setPageKey] = useState(initialPageKey);
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const successTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  const fetchSections = useCallback(async (key?: string) => {
    const targetPageKey = key || pageKey;
    try {
      setLoading(true);
      setError(null);
      clearMessages();
      const response = await fetch(`/api/dynamic-sections?pageKey=${encodeURIComponent(targetPageKey)}`);
      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Failed to fetch' }));
        throw new Error(err.error || `Server error (${response.status})`);
      }
      const data = await response.json();
      const fetchedSections = (data.sections || []).map((s: Section, i: number) => ({
        ...s,
        order: i,
      }));
      setSections(fetchedSections);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load sections';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [pageKey, clearMessages]);

  const saveSections = useCallback(async (sectionsToSave?: Section[]) => {
    const payload = sectionsToSave || sections;
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      if (successTimerRef.current) {
        clearTimeout(successTimerRef.current);
      }

      const orderedSections = payload.map((s, i) => ({ ...s, order: i }));

      const response = await fetch('/api/dynamic-sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageKey, sections: orderedSections }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({ error: 'Save failed' }));
        throw new Error(err.error || `Server error (${response.status})`);
      }

      const saved = await response.json();
      const savedSections = (saved.sections || []).map((s: Section, i: number) => ({
        ...s,
        order: i,
      }));
      setSections(savedSections);
      setSuccess('Sections saved successfully!');

      successTimerRef.current = setTimeout(() => {
        setSuccess(null);
      }, 5000);

      return saved;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to save. Please try again.';
      setError(message);
      return null;
    } finally {
      setSaving(false);
    }
  }, [pageKey, sections]);

  const addSection = useCallback((type: SectionType) => {
    const newSection = createDefaultSection(type);
    setSections(prev => {
      const updated = [...prev, newSection].map((s, i) => ({ ...s, order: i }));
      return updated;
    });
  }, []);

  const removeSection = useCallback((id: string) => {
    setSections(prev => prev.filter(s => s.id !== id).map((s, i) => ({ ...s, order: i })));
  }, []);

  const duplicateSection = useCallback((id: string) => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (index === -1) return prev;
      const clone = deepClone(prev[index]);
      clone.id = crypto.randomUUID();
      clone.title = `${clone.title || 'Section'} (Copy)`;
      const updated = [...prev];
      updated.splice(index + 1, 0, clone);
      return updated.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const moveSectionUp = useCallback((id: string) => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (index <= 0) return prev;
      const updated = [...prev];
      [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
      return updated.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const moveSectionDown = useCallback((id: string) => {
    setSections(prev => {
      const index = prev.findIndex(s => s.id === id);
      if (index === -1 || index >= prev.length - 1) return prev;
      const updated = [...prev];
      [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
      return updated.map((s, i) => ({ ...s, order: i }));
    });
  }, []);

  const updateSection = useCallback((id: string, data: Partial<Section>) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, ...data } : s))
    );
  }, []);

  const toggleVisibility = useCallback((id: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  }, []);

  return {
    sections,
    loading,
    saving,
    error,
    success,
    pageKey,
    setPageKey,
    fetchSections,
    addSection,
    removeSection,
    duplicateSection,
    moveSectionUp,
    moveSectionDown,
    updateSection,
    toggleVisibility,
    saveSections,
    clearMessages,
  };
}
