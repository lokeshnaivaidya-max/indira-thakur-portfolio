'use client';

import { useState, useRef } from 'react';
import { HiPhoto, HiXMark, HiArrowDownTray } from 'react-icons/hi2';

interface SiteImage {
  url: string;
  alt: string;
  caption?: string;
}

interface ImageManagerProps {
  label: string;
  description?: string;
  value: SiteImage;
  onChange: (image: SiteImage) => void;
  aspect?: string;
  folder?: string;
}

export default function ImageManager({
  label,
  description,
  value,
  onChange,
  aspect = 'aspect-[4/3]',
  folder = 'site',
}: ImageManagerProps) {
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) return;
    if (file.size > 10 * 1024 * 1024) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('folder', folder);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');
      const result = await response.json();

      onChange({
        url: result.url,
        alt: value.alt || file.name.replace(/\.[^/.]+$/, ''),
        caption: value.caption || '',
      });
    } catch {
      // silently fail
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUrlSubmit = () => {
    if (!urlInput.trim()) return;
    onChange({
      url: urlInput.trim(),
      alt: value.alt || '',
      caption: value.caption || '',
    });
    setUrlInput('');
    setShowUrlInput(false);
  };

  const handleRemove = () => {
    onChange({ url: '', alt: '', caption: '' });
  };

  const handleDownload = async () => {
    if (!value.url) return;
    try {
      const response = await fetch(value.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = value.alt || 'image.jpg';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch {
      // silently fail
    }
  };

  return (
    <div className="space-y-2">
      <div>
        <label className="block font-sans text-xs font-medium tracking-wider uppercase text-warm-gray/70 mb-1">
          {label}
        </label>
        {description && (
          <p className="font-sans text-[11px] text-warm-gray/40 mb-2">{description}</p>
        )}
      </div>

      <div
        className={`border-2 border-dashed border-cream/60 rounded-lg ${aspect} flex items-center justify-center hover:border-magenta/30 transition-colors cursor-pointer relative overflow-hidden group`}
        onClick={() => !uploading && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploading ? (
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-magenta/30 border-t-magenta rounded-full animate-spin mx-auto mb-2" />
            <p className="font-sans text-xs text-warm-gray/50">Uploading...</p>
          </div>
        ) : value.url ? (
          <>
            <img
              src={value.url}
              alt={value.alt || label}
              className="w-full h-full object-cover absolute inset-0"
            />
            <div className="absolute inset-0 bg-rich-black/0 group-hover:bg-rich-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="text-center text-white">
                <HiPhoto className="w-8 h-8 mx-auto mb-1" />
                <p className="font-sans text-xs">Click to replace</p>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center p-4">
            <HiPhoto className="w-10 h-10 text-warm-gray/30 mx-auto mb-2" />
            <p className="font-sans text-xs text-warm-gray/50">Click to upload</p>
            <p className="font-sans text-[10px] text-warm-gray/30 mt-1">or use URL below</p>
          </div>
        )}
      </div>

      {value.url && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleDownload}
            className="px-3 py-1.5 border border-cream/60 text-warm-gray/60 font-sans text-[10px] hover:bg-cream/50 transition-all rounded"
          >
            <HiArrowDownTray className="w-3 h-3 inline mr-1" />
            Download
          </button>
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="px-3 py-1.5 border border-cream/60 text-warm-gray/60 font-sans text-[10px] hover:bg-cream/50 transition-all rounded"
          >
            URL
          </button>
          <button
            type="button"
            onClick={handleRemove}
            className="px-3 py-1.5 border border-rose-200 text-rose-500 font-sans text-[10px] hover:bg-rose-50 transition-all rounded"
          >
            <HiXMark className="w-3 h-3 inline mr-1" />
            Remove
          </button>
        </div>
      )}

      {showUrlInput && (
        <div className="flex gap-2">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Paste image URL..."
            className="flex-1 px-3 py-2 bg-white border border-cream/60 text-rich-black font-sans text-xs rounded focus:outline-none focus:border-magenta/40"
            onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-2 bg-rich-black text-white font-sans text-[10px] uppercase tracking-wider rounded hover:bg-charcoal transition-colors"
          >
            Add
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block font-sans text-[10px] text-warm-gray/50 uppercase tracking-wider mb-1">Alt Text</label>
          <input
            type="text"
            value={value.alt || ''}
            onChange={(e) => onChange({ ...value, alt: e.target.value })}
            placeholder="Image description"
            className="w-full px-3 py-1.5 bg-white border border-cream/60 text-rich-black font-sans text-xs rounded focus:outline-none focus:border-magenta/40"
          />
        </div>
        <div>
          <label className="block font-sans text-[10px] text-warm-gray/50 uppercase tracking-wider mb-1">Caption</label>
          <input
            type="text"
            value={value.caption || ''}
            onChange={(e) => onChange({ ...value, caption: e.target.value })}
            placeholder="Optional caption"
            className="w-full px-3 py-1.5 bg-white border border-cream/60 text-rich-black font-sans text-xs rounded focus:outline-none focus:border-magenta/40"
          />
        </div>
      </div>
    </div>
  );
}
