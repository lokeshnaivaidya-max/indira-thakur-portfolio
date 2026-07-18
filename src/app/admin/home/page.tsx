'use client';

import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageManager from '@/components/admin/ImageManager';
import { useState } from 'react';
import { HiHome, HiPhoto, HiSparkles } from 'react-icons/hi2';

export default function AdminHomePage() {
  const { config, loading, saving, error, success, dirty, lastSavedAt, updateSection, saveConfig, clearMessages, fetchConfig } = useCMS();
  const [newCategory, setNewCategory] = useState('');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-magenta/30 border-t-magenta rounded-full animate-spin mx-auto mb-3" />
          <p className="font-sans text-sm text-warm-gray/50">Loading your Home page...</p>
        </div>
      </div>
    );
  }

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <p className="text-red-500 font-sans text-sm">{error}</p>
      <button onClick={() => fetchConfig()} className="px-4 py-2 bg-rich-black text-white text-xs uppercase tracking-wider rounded">
        Retry
      </button>
    </div>
  );

  if (!config) return null;

  const home = config.home || {};

  const addCategory = () => {
    if (!newCategory.trim()) return;
    const cats = [...(home.categories || []), newCategory.trim()];
    updateSection('home', { categories: cats });
    setNewCategory('');
  };

  const removeCategory = (index: number) => {
    const cats = (home.categories || []).filter((_: any, i: number) => i !== index);
    updateSection('home', { categories: cats });
  };

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="Home Page"
        description="Customize the first impression visitors see when they land on your website"
        error={error}
        success={success}
        dirty={dirty}
        lastSavedAt={lastSavedAt}
        onClearMessages={clearMessages}
        previewHref="/"
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Hero Text Content */}
        <CollapsibleSection title="Hero Text" icon={<HiHome className="w-5 h-5" />} defaultOpen>
          <p className="font-sans text-[11px] text-warm-gray/40 mb-4">
            This is the first thing visitors see. Make it count!
          </p>
          <FieldInput
            label="Small Label"
            helperText="Tiny text above the main heading (optional)"
            value={home.tagline || ''}
            onChange={(v) => updateSection('home', { tagline: v })}
            placeholder="e.g., Photography"
          />
          <FieldInput
            label="Main Heading"
            helperText="The large title on your homepage"
            value={home.heading || ''}
            onChange={(v) => updateSection('home', { heading: v })}
            placeholder="e.g., Every Frame"
          />
          <FieldInput
            label="Highlighted Text"
            helperText="The italic text that appears below the main heading"
            value={home.headingItalic || ''}
            onChange={(v) => updateSection('home', { headingItalic: v })}
            placeholder="e.g., Tells a Story"
          />

          <div>
            <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1">
              Category Tags
            </label>
            <p className="font-sans text-[10px] text-warm-gray/40 mb-2 italic">
              These appear in the top-right corner of the hero section
            </p>
            <div className="flex flex-wrap gap-2 mb-2">
              {(home.categories || []).map((cat: string, i: number) => (
                <span key={i} className="inline-flex items-center gap-1.5 px-3 py-1 bg-cream/50 border border-cream/60 rounded-full font-sans text-xs text-rich-black">
                  {cat}
                  <button type="button" onClick={() => removeCategory(i)} className="text-warm-gray/40 hover:text-red-500">×</button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} placeholder="Add a category..." className="flex-1 px-3 py-2 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40" onKeyDown={(e) => e.key === 'Enter' && addCategory()} />
              <button type="button" onClick={addCategory} className="px-4 py-2 bg-rich-black text-white text-xs uppercase tracking-wider rounded hover:bg-charcoal transition-colors">Add</button>
            </div>
          </div>
        </CollapsibleSection>

        {/* Buttons */}
        <CollapsibleSection title="Button Settings" icon={<HiSparkles className="w-5 h-5" />}>
          <p className="font-sans text-[11px] text-warm-gray/40 mb-4">
            Control the call-to-action buttons on your homepage.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FieldInput
              label="Primary Button Text"
              helperText="The main button visitors see"
              value={home.ctaText || ''}
              onChange={(v) => updateSection('home', { ctaText: v })}
              placeholder="e.g., Book Now"
            />
            <FieldInput
              label="Primary Button Destination"
              helperText="Where the button takes visitors (e.g., /#contact, /gallery)"
              value={home.ctaLink || ''}
              onChange={(v) => updateSection('home', { ctaLink: v })}
              placeholder="e.g., /#contact"
            />
            <FieldInput
              label="Secondary Button Text"
              helperText="The text link next to the primary button"
              value={home.secondaryCtaText || ''}
              onChange={(v) => updateSection('home', { secondaryCtaText: v })}
              placeholder="e.g., Portfolio"
            />
            <FieldInput
              label="Secondary Button Destination"
              helperText="Where the text link takes visitors"
              value={home.secondaryCtaLink || ''}
              onChange={(v) => updateSection('home', { secondaryCtaLink: v })}
              placeholder="e.g., /gallery"
            />
          </div>
        </CollapsibleSection>

        {/* Hero Images */}
        <CollapsibleSection title="Hero Images" icon={<HiPhoto className="w-5 h-5" />}>
          <p className="font-sans text-[11px] text-warm-gray/40 mb-4">
            These images appear in the hero section. For best results, use high-resolution images.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageManager
              label="Hero Background (Main)"
              description="This is the main background image shown on the homepage"
              helperText="This image fills the entire hero section. Use a stunning, high-resolution photo."
              sectionIndicator="Homepage Hero"
              value={home.images?.heroMain || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, heroMain: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
            <ImageManager
              label="Hero Accent Image"
              description="An additional accent image for the hero section"
              helperText="Used as a secondary accent or overlay image"
              sectionIndicator="Homepage Hero"
              value={home.images?.heroSecondary || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, heroSecondary: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
            <ImageManager
              label="Fallback Background"
              description="Alternative background (used only if Main is empty)"
              helperText="If no main image is uploaded, this will be used. Otherwise ignored."
              sectionIndicator="Homepage Hero"
              value={home.images?.background || { url: '', alt: '' }}
              onChange={(img) => updateSection('home', { images: { ...home.images, background: img } })}
              aspect="aspect-[16/9]"
              folder="home/hero"
            />
          </div>
        </CollapsibleSection>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-ivory/95 backdrop-blur-sm border-t border-cream/50 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10 py-4">
          <button type="button" onClick={() => saveConfig()} disabled={saving} className="w-full max-w-md mx-auto px-8 py-3.5 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all disabled:opacity-50 rounded flex items-center justify-center gap-2">
            {saving ? (<><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving to database...</>) : dirty ? 'Save Changes' : 'Save All Changes'}
          </button>
          {lastSavedAt && (
            <p className="text-center font-sans text-[10px] text-warm-gray/30 mt-2">
              Last saved: {lastSavedAt.toLocaleTimeString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({ title, icon, defaultOpen = false, children }: { title: string; icon?: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-cream/50 rounded-lg overflow-hidden">
      <button type="button" onClick={() => setOpen(!open)} className="w-full px-6 py-4 flex items-center gap-3 hover:bg-cream/20 transition-colors">
        {icon && <span className="text-magenta/50">{icon}</span>}
        <h2 className="font-serif text-lg text-rich-black flex-1 text-left">{title}</h2>
        <span className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <span className="w-3 h-px bg-warm-gray/40 absolute" />
          <span className="w-px h-3 bg-warm-gray/40 absolute" />
        </span>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

function FieldInput({ label, helperText, value, onChange, placeholder }: { label: string; helperText?: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1">{label}</label>
      {helperText && <p className="font-sans text-[10px] text-warm-gray/40 mb-1.5 italic">{helperText}</p>}
      <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 transition-colors" />
    </div>
  );
}
