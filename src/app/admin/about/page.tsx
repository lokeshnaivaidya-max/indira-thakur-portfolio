'use client';

import { useState } from 'react';
import { useCMS } from '@/hooks/useCMS';
import AdminPageHeader from '@/components/admin/AdminPageHeader';
import ImageManager from '@/components/admin/ImageManager';
import { HiPlus, HiTrash } from 'react-icons/hi2';

export default function AdminAboutPage() {
  const { config, loading, saving, error, success, updateSection, updateField, saveConfig, clearMessages } = useCMS();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-magenta/30 border-t-magenta rounded-full animate-spin mx-auto mb-3" />
          <p className="font-sans text-sm text-warm-gray/50">Loading...</p>
        </div>
      </div>
    );
  }

  if (!config) return null;

  const about = config.about || {};

  const handleAchievementChange = (index: number, field: string, value: string) => {
    const achievements = [...(about.achievements || [])];
    achievements[index] = { ...achievements[index], [field]: value };
    updateSection('about', { achievements });
  };

  const addAchievement = () => {
    const achievements = [...(about.achievements || []), { title: '', description: '', year: '' }];
    updateSection('about', { achievements });
  };

  const removeAchievement = (index: number) => {
    const achievements = (about.achievements || []).filter((_: any, i: number) => i !== index);
    updateSection('about', { achievements });
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const stats = [...(about.stats || [])];
    stats[index] = { ...stats[index], [field]: value };
    updateSection('about', { stats });
  };

  const addStat = () => {
    const stats = [...(about.stats || []), { label: '', value: '' }];
    updateSection('about', { stats });
  };

  const removeStat = (index: number) => {
    const stats = (about.stats || []).filter((_: any, i: number) => i !== index);
    updateSection('about', { stats });
  };

  const handleValueChange = (index: number, field: string, value: string) => {
    const values = [...(about.values || [])];
    values[index] = { ...values[index], [field]: value };
    updateSection('about', { values });
  };

  const addValue = () => {
    const values = [...(about.values || []), { title: '', description: '' }];
    updateSection('about', { values });
  };

  const removeValue = (index: number) => {
    const values = (about.values || []).filter((_: any, i: number) => i !== index);
    updateSection('about', { values });
  };

  const handleSpecChange = (index: number, value: string) => {
    const specs = [...(about.specializations || [])];
    specs[index] = value;
    updateSection('about', { specializations: specs });
  };

  const addSpec = () => {
    const specs = [...(about.specializations || []), ''];
    updateSection('about', { specializations: specs });
  };

  const removeSpec = (index: number) => {
    const specs = (about.specializations || []).filter((_: any, i: number) => i !== index);
    updateSection('about', { specializations: specs });
  };

  const handleImageChange = (field: string, image: any) => {
    const images = { ...(about.images || {}), [field]: image };
    updateSection('about', { images });
  };

  return (
    <div className="h-full flex flex-col">
      <AdminPageHeader
        title="About Section"
        description="Manage the About section content, story, images, achievements, and more"
        error={error}
        success={success}
        onClearMessages={clearMessages}
      />

      <div className="flex-1 overflow-y-auto space-y-6 max-w-4xl mx-auto w-full">
        {/* Text Content */}
        <CollapsibleSection title="Content" defaultOpen>
          <div className="space-y-4">
            <FieldInput
              label="Eyebrow Text"
              value={about.eyebrow || ''}
              onChange={(v) => updateSection('about', { eyebrow: v })}
              placeholder="e.g., The Story"
            />
            <FieldInput
              label="Main Heading"
              value={about.heading || ''}
              onChange={(v) => updateSection('about', { heading: v })}
              placeholder="e.g., A Once-in-a-Lifetime Experience"
            />
            <FieldInput
              label="Subheading"
              value={about.subheading || ''}
              onChange={(v) => updateSection('about', { subheading: v })}
              placeholder="Optional subheading"
            />
            <FieldTextarea
              label="Story - Part 1"
              value={about.story || ''}
              onChange={(v) => updateSection('about', { story: v })}
              placeholder="Your personal story and background..."
              rows={5}
            />
            <FieldTextarea
              label="Story - Part 2"
              value={about.storyContinued || ''}
              onChange={(v) => updateSection('about', { storyContinued: v })}
              placeholder="Continuation of your story..."
              rows={4}
            />
            <FieldTextarea
              label="Philosophy - Part 1"
              value={about.philosophy || ''}
              onChange={(v) => updateSection('about', { philosophy: v })}
              placeholder="Your photography philosophy..."
              rows={4}
            />
            <FieldTextarea
              label="Philosophy - Part 2"
              value={about.philosophyContinued || ''}
              onChange={(v) => updateSection('about', { philosophyContinued: v })}
              placeholder="Continuation of philosophy..."
              rows={3}
            />
            <FieldTextarea
              label="Journey - Part 1"
              value={about.journey || ''}
              onChange={(v) => updateSection('about', { journey: v })}
              placeholder="Your creative journey..."
              rows={4}
            />
            <FieldTextarea
              label="Journey - Part 2"
              value={about.journeyContinued || ''}
              onChange={(v) => updateSection('about', { journeyContinued: v })}
              placeholder="Continuation of journey..."
              rows={3}
            />
            <FieldTextarea
              label="Welcome Message"
              value={about.welcomeMessage || ''}
              onChange={(v) => updateSection('about', { welcomeMessage: v })}
              placeholder="Warm welcome message for visitors..."
              rows={3}
            />
            <FieldInput
              label="Signature"
              value={about.signature || ''}
              onChange={(v) => updateSection('about', { signature: v })}
              placeholder="e.g., Indira Thakur"
            />
            <FieldInput
              label="CTA Button Text"
              value={about.ctaText || ''}
              onChange={(v) => updateSection('about', { ctaText: v })}
              placeholder="e.g., View Portfolio"
            />
            <FieldInput
              label="CTA Link"
              value={about.ctaLink || ''}
              onChange={(v) => updateSection('about', { ctaLink: v })}
              placeholder="e.g., /gallery"
            />
          </div>
        </CollapsibleSection>

        {/* Images */}
        <CollapsibleSection title="Images" defaultOpen>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageManager
              label="Founder Portrait"
              description="Main portrait of Indira Thakur"
              value={about.images?.founderPortrait || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('founderPortrait', img)}
              aspect="aspect-[3/4]"
              folder="about/founder"
            />
            <ImageManager
              label="Story Image"
              description="Image for the story section"
              value={about.images?.storyImage || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('storyImage', img)}
              aspect="aspect-[4/5]"
              folder="about/story"
            />
            <ImageManager
              label="Journey Image"
              description="Image for the journey section"
              value={about.images?.journeyImage || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('journeyImage', img)}
              aspect="aspect-[4/3]"
              folder="about/journey"
            />
            <ImageManager
              label="Achievement Image"
              description="Image for achievements section"
              value={about.images?.achievementImage || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('achievementImage', img)}
              aspect="aspect-[4/3]"
              folder="about/achievement"
            />
            <ImageManager
              label="Behind The Scenes"
              description="Behind the scenes image"
              value={about.images?.behindTheScenes || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('behindTheScenes', img)}
              aspect="aspect-[16/9]"
              folder="about/bts"
            />
            <ImageManager
              label="Welcome Image"
              description="Image for the welcome section"
              value={about.images?.welcomeImage || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('welcomeImage', img)}
              aspect="aspect-[4/3]"
              folder="about/welcome"
            />
            <ImageManager
              label="Editorial Image 1"
              description="Additional editorial image"
              value={about.images?.editorial1 || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('editorial1', img)}
              aspect="aspect-[3/4]"
              folder="about/editorial"
            />
            <ImageManager
              label="Editorial Image 2"
              description="Additional editorial image"
              value={about.images?.editorial2 || { url: '', alt: '' }}
              onChange={(img) => handleImageChange('editorial2', img)}
              aspect="aspect-[4/3]"
              folder="about/editorial"
            />
          </div>
        </CollapsibleSection>

        {/* Specializations */}
        <CollapsibleSection title="Specializations">
          <div className="space-y-2">
            {(about.specializations || []).map((spec: string, i: number) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) => handleSpecChange(i, e.target.value)}
                  placeholder="e.g., Maternity Photography"
                  className="flex-1 px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <button
                  type="button"
                  onClick={() => removeSpec(i)}
                  className="px-3 text-red-400 hover:text-red-600 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSpec}
              className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors"
            >
              <HiPlus className="w-4 h-4" /> Add Specialization
            </button>
          </div>
        </CollapsibleSection>

        {/* Stats */}
        <CollapsibleSection title="Statistics">
          <div className="space-y-3">
            {(about.stats || []).map((stat: any, i: number) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={stat.label || ''}
                  onChange={(e) => handleStatChange(i, 'label', e.target.value)}
                  placeholder="Label (e.g., Years Experience)"
                  className="flex-1 px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <input
                  type="text"
                  value={stat.value || ''}
                  onChange={(e) => handleStatChange(i, 'value', e.target.value)}
                  placeholder="Value (e.g., 10+)"
                  className="flex-1 px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <button
                  type="button"
                  onClick={() => removeStat(i)}
                  className="px-3 text-red-400 hover:text-red-600 transition-colors"
                >
                  <HiTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addStat}
              className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors"
            >
              <HiPlus className="w-4 h-4" /> Add Statistic
            </button>
          </div>
        </CollapsibleSection>

        {/* Achievements */}
        <CollapsibleSection title="Achievements">
          <div className="space-y-4">
            {(about.achievements || []).map((ach: any, i: number) => (
              <div key={i} className="p-4 bg-ivory/50 border border-cream/40 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] text-warm-gray/40">#{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeAchievement(i)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={ach.title || ''}
                  onChange={(e) => handleAchievementChange(i, 'title', e.target.value)}
                  placeholder="Achievement title"
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <textarea
                  value={ach.description || ''}
                  onChange={(e) => handleAchievementChange(i, 'description', e.target.value)}
                  placeholder="Achievement description..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 resize-none"
                />
                <input
                  type="text"
                  value={ach.year || ''}
                  onChange={(e) => handleAchievementChange(i, 'year', e.target.value)}
                  placeholder="Year (optional)"
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addAchievement}
              className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors"
            >
              <HiPlus className="w-4 h-4" /> Add Achievement
            </button>
          </div>
        </CollapsibleSection>

        {/* Values */}
        <CollapsibleSection title="Core Values">
          <div className="space-y-4">
            {(about.values || []).map((val: any, i: number) => (
              <div key={i} className="p-4 bg-ivory/50 border border-cream/40 rounded-lg space-y-3">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] text-warm-gray/40">#{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeValue(i)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <HiTrash className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={val.title || ''}
                  onChange={(e) => handleValueChange(i, 'title', e.target.value)}
                  placeholder="Value title"
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40"
                />
                <textarea
                  value={val.description || ''}
                  onChange={(e) => handleValueChange(i, 'description', e.target.value)}
                  placeholder="Value description..."
                  rows={2}
                  className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 resize-none"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addValue}
              className="flex items-center gap-2 text-magenta font-sans text-xs hover:text-raspberry transition-colors"
            >
              <HiPlus className="w-4 h-4" /> Add Value
            </button>
          </div>
        </CollapsibleSection>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-ivory/95 backdrop-blur-sm border-t border-cream/50 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-10 px-4 sm:px-6 md:px-8 lg:px-10 py-4">
          <button
            type="button"
            onClick={() => saveConfig()}
            disabled={saving}
            className="w-full max-w-md mx-auto px-8 py-3.5 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all disabled:opacity-50 rounded flex items-center justify-center gap-2"
          >
            {saving ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              'Save All Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function CollapsibleSection({
  title,
  defaultOpen = false,
  children,
}: {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-cream/50 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-cream/20 transition-colors"
      >
        <h2 className="font-serif text-lg text-rich-black">{title}</h2>
        <span
          className={`w-4 h-4 flex items-center justify-center transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        >
          <span className="w-3 h-px bg-warm-gray/40 absolute" />
          <span className="w-px h-3 bg-warm-gray/40 absolute" />
        </span>
      </button>
      {open && <div className="px-6 pb-6 space-y-4">{children}</div>}
    </div>
  );
}

function FieldInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 transition-colors"
      />
    </div>
  );
}

function FieldTextarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1.5">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-4 py-2.5 bg-white border border-cream/60 text-rich-black font-sans text-sm rounded focus:outline-none focus:border-magenta/40 transition-colors resize-none"
      />
    </div>
  );
}
