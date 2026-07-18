"use client";

import { useState, useEffect } from 'react';
import { HiPlus, HiTrash, HiArrowDownTray, HiPhoto, HiArrowRightOnRectangle } from 'react-icons/hi2';

interface AboutData {
  heroImage: string;
  image: string;
  publicId: string;
  story: string;
  philosophy: string;
  journey: string;
  values: { title: string; description: string }[];
  stats: { label: string; value: string }[];
  achievements: string[];
  signature: string;
}

export default function AdminAboutPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [currentAbout, setCurrentAbout] = useState<AboutData>({
    heroImage: '',
    image: '',
    publicId: '',
    story: '',
    philosophy: '',
    journey: '',
    values: [],
    stats: [],
    achievements: [],
    signature: '',
  });

  const fetchAbout = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/about');
      if (!response.ok) throw new Error('Failed to fetch about content');
      const data = await response.json();
      if (data) {
        setCurrentAbout({
          heroImage: data.heroImage || '',
          image: data.image || '',
          publicId: data.publicId || '',
          story: data.story || '',
          philosophy: data.philosophy || '',
          journey: data.journey || '',
          values: data.values || [],
          stats: data.stats || [],
          achievements: data.achievements || [],
          signature: data.signature || '',
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const handleImageUpload = async (file: File, field: 'heroImage' | 'image'): Promise<{ url: string; publicId: string }> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'about');

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'heroImage' | 'image') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await handleImageUpload(file, field);
      setCurrentAbout(prev => ({ ...prev, [field]: result.url, publicId: result.publicId }));
      setUploadProgress(100);
      setSuccess('Image uploaded successfully');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleChange = (field: keyof AboutData, value: string | number) => {
    setCurrentAbout(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: 'values' | 'stats' | 'achievements', index: number, key: string, value: string) => {
    setCurrentAbout(prev => {
      const newArray = [...prev[field]];
      if (key === 'achievement') {
        newArray[index] = value;
      } else {
        (newArray[index] as any)[key] = value;
      }
      return { ...prev, [field]: newArray };
    });
  };

  const addToArray = (field: 'values' | 'stats' | 'achievements') => {
    setCurrentAbout(prev => {
      let newItem;
      if (field === 'values') newItem = { title: '', description: '' };
      else if (field === 'stats') newItem = { label: '', value: '' };
      else newItem = '';
      return { ...prev, [field]: [...prev[field], newItem] };
    });
  };

  const removeFromArray = (field: 'values' | 'stats' | 'achievements', index: number) => {
    setCurrentAbout(prev => {
      const newArray = prev[field].filter((_, i) => i !== index);
      return { ...prev, [field]: newArray };
    });
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch {
      setError('Download failed');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentAbout),
      });

      if (!response.ok) throw new Error('Failed to save');

      setSuccess('About content saved successfully!');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading...</div>;

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">About Page</h1>
        <p className="font-sans text-sm text-warm-gray/60">Manage the About section content and images</p>
      </div>

      {(error || success) && (
        <div className={`mb-6 p-4 rounded-lg flex items-center justify-between ${
          error ? 'bg-red-50 border border-red-200 text-red-700' : 'bg-green-50 border border-green-200 text-green-700'
        }`}>
          <span className="font-sans text-sm">{error || success}</span>
          <button onClick={() => { setError(null); setSuccess(null); }} className="text-current opacity-70 hover:opacity-100">
            <HiArrowRightOnRectangle className="w-5 h-5" />
          </button>
        </div>
      )}

      {uploading && (
        <div className="mb-6 p-4 bg-ivory border border-cream rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-rich-black">Uploading image...</span>
            <span className="font-mono text-sm text-magenta">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
            <div className="h-full bg-magenta transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      <form onSubmit={handleSave} className="flex-1 overflow-y-auto space-y-8 max-w-4xl mx-auto w-full p-4 sm:p-6">
        {/* Hero Image */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">Hero Section</h2>
          
          <div className="space-y-4">
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">Hero Background Image</label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div 
                  className="border-2 border-dashed border-cream/60 rounded-lg aspect-[16/9] flex items-center justify-center hover:border-magenta/40 transition-colors cursor-pointer relative overflow-hidden"
                  onClick={() => document.getElementById('hero-image-upload')?.click()}
                >
                  <input
                    id="hero-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'heroImage')}
                    className="hidden"
                  />
                  {currentAbout.heroImage ? (
                    <>
                      <img 
                        src={currentAbout.heroImage} 
                        alt="Hero preview" 
                        className="w-full h-full object-cover absolute inset-0 opacity-80"
                      />
                      <div className="relative z-10 text-center bg-rich-black/50 text-white p-4 rounded">
                        <HiPhoto className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-sans text-sm">Click to change</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <HiPhoto className="w-12 h-12 text-warm-gray/40 mb-2" />
                      <p className="font-sans text-sm text-warm-gray/60">Click to upload hero image</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {currentAbout.heroImage && (
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDownload(currentAbout.heroImage!, 'hero-image.jpg')}
                  className="px-3 py-2 border border-cream/60 text-warm-gray/70 font-sans text-xs hover:bg-cream transition-all"
                >
                  <HiArrowDownTray className="w-4 h-4 inline mr-1" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('heroImage', '')}
                  className="px-3 py-2 border border-rose-200 text-rose-600 font-sans text-xs hover:bg-rose-50 transition-all"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </section>

        {/* About Image */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">About Section Image</h2>
          
          <div className="space-y-4">
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">About Section Image</label>
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <div 
                  className="border-2 border-dashed border-cream/60 rounded-lg aspect-[4/5] flex items-center justify-center hover:border-magenta/40 transition-colors cursor-pointer relative overflow-hidden"
                  onClick={() => document.getElementById('about-image-upload')?.click()}
                >
                  <input
                    id="about-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'image')}
                    className="hidden"
                  />
                  {currentAbout.image ? (
                    <>
                      <img 
                        src={currentAbout.image} 
                        alt="About preview" 
                        className="w-full h-full object-cover absolute inset-0 opacity-80"
                      />
                      <div className="relative z-10 text-center bg-rich-black/50 text-white p-4 rounded">
                        <HiPhoto className="w-10 h-10 mx-auto mb-2" />
                        <p className="font-sans text-sm">Click to change</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <HiPhoto className="w-12 h-12 text-warm-gray/40 mb-2" />
                      <p className="font-sans text-sm text-warm-gray/60">Click to upload about image</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {currentAbout.image && (
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => handleDownload(currentAbout.image!, 'about-image.jpg')}
                  className="px-3 py-2 border border-cream/60 text-warm-gray/70 font-sans text-xs hover:bg-cream transition-all"
                >
                  <HiArrowDownTray className="w-4 h-4 inline mr-1" />
                  Download
                </button>
                <button
                  type="button"
                  onClick={() => handleChange('image', '')}
                  className="px-3 py-2 border border-rose-200 text-rose-600 font-sans text-xs hover:bg-rose-50 transition-all"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Story */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">Personal Story</h2>
          <textarea
            value={currentAbout.story}
            onChange={(e) => handleChange('story', e.target.value)}
            rows={6}
            className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40 resize-none"
            placeholder="Share your personal story and background..."
          />
        </section>

        {/* Philosophy */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">Photography Philosophy</h2>
          <textarea
            value={currentAbout.philosophy}
            onChange={(e) => handleChange('philosophy', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40 resize-none"
            placeholder="Describe your approach and philosophy..."
          />
        </section>

        {/* Journey */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">Creative Journey</h2>
          <textarea
            value={currentAbout.journey}
            onChange={(e) => handleChange('journey', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40 resize-none"
            placeholder="Share your creative journey and milestones..."
          />
        </section>

        {/* Values */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-rich-black">Core Values</h2>
            <button type="button" onClick={() => addToArray('values')} className="text-sm text-magenta hover:text-raspberry font-medium">
              + Add Value
            </button>
          </div>
          <div className="space-y-3">
            {currentAbout.values.map((value, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={value.title}
                  onChange={(e) => handleArrayChange('values', index, 'title', e.target.value)}
                  placeholder="Value Title"
                  className="flex-1 px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                />
                <input
                  type="text"
                  value={value.description}
                  onChange={(e) => handleArrayChange('values', index, 'description', e.target.value)}
                  placeholder="Description"
                  className="flex-2 px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                />
                <button
                  type="button"
                  onClick={() => removeFromArray('values', index)}
                  className="px-3 py-3 text-red-500 hover:text-red-700 font-sans text-sm self-end"
                >
                  Remove
                </button>
              </div>
            ))}
            {currentAbout.values.length === 0 && (
              <p className="font-sans text-sm text-warm-gray/50 text-center py-4">No values added yet. Click "Add Value" to start.</p>
            )}
          </div>
        </section>

        {/* Stats */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-rich-black">Statistics</h2>
            <button type="button" onClick={() => addToArray('stats')} className="text-sm text-magenta hover:text-raspberry font-medium">
              + Add Stat
            </button>
          </div>
          <div className="space-y-3">
            {currentAbout.stats.map((stat, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleArrayChange('stats', index, 'label', e.target.value)}
                  placeholder="Label (e.g., Years Experience)"
                  className="flex-1 px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                />
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleArrayChange('stats', index, 'value', e.target.value)}
                  placeholder="Value (e.g., 10+)"
                  className="flex-1 px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                />
                <button
                  type="button"
                  onClick={() => removeFromArray('stats', index)}
                  className="px-3 py-3 text-red-500 hover:text-red-700 font-sans text-sm self-end"
                >
                  Remove
                </button>
              </div>
            ))}
            {currentAbout.stats.length === 0 && (
              <p className="font-sans text-sm text-warm-gray/50 text-center py-4">No stats added yet. Click "Add Stat" to start.</p>
            )}
          </div>
        </section>

        {/* Achievements */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-lg text-rich-black">Achievements</h2>
            <button type="button" onClick={() => addToArray('achievements')} className="text-sm text-magenta hover:text-raspberry font-medium">
              + Add Achievement
            </button>
          </div>
          <div className="space-y-3">
            {currentAbout.achievements.map((achievement, index) => (
              <div key={index} className="flex gap-3">
                <input
                  type="text"
                  value={achievement}
                  onChange={(e) => handleArrayChange('achievements', index, 'achievement', e.target.value)}
                  placeholder="Achievement description"
                  className="flex-1 px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                />
                <button
                  type="button"
                  onClick={() => removeFromArray('achievements', index)}
                  className="px-3 py-3 text-red-500 hover:text-red-700 font-sans text-sm self-end"
                >
                  Remove
                </button>
              </div>
            ))}
            {currentAbout.achievements.length === 0 && (
              <p className="font-sans text-sm text-warm-gray/50 text-center py-4">No achievements added yet. Click "Add Achievement" to start.</p>
            )}
          </div>
        </section>

        {/* Signature */}
        <section className="bg-white border border-cream/50 rounded-lg p-6">
          <h2 className="font-serif text-lg text-rich-black mb-4 border-b border-cream pb-2">Signature</h2>
          <input
            type="text"
            value={currentAbout.signature}
            onChange={(e) => handleChange('signature', e.target.value)}
            className="w-full max-w-md px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
            placeholder="Your signature text"
          />
        </section>

        {/* Save Button */}
        <div className="pt-4 border-t border-cream">
          <button
            type="submit"
            disabled={saving}
            className="w-full max-w-md mx-auto px-8 py-4 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}