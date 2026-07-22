"use client";

import { useState, useEffect, useCallback } from 'react';
import { HiPlus, HiTrash, HiPencil, HiPhoto, HiArrowDownTray, HiArrowUpTray, HiLink, HiXMark, HiEye, HiChevronLeft, HiChevronRight } from 'react-icons/hi2';
import { uploadImageDirect } from '@/lib/uploadHelper';

interface GalleryItem {
  _id: string;
  src: string;
  publicId: string;
  alt: string;
  title: string;
  description: string;
  width: number;
  height: number;
  category: string;
  featured: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ['Newborn', 'Maternity', 'Family', 'Baby', 'Portrait', 'Wedding', 'Events', 'Other'];

export function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});

  const [formData, setFormData] = useState({
    id: '',
    src: '',
    publicId: '',
    alt: '',
    title: '',
    description: '',
    width: 1200,
    height: 1600,
    category: 'Portrait',
    featured: false,
    order: 0,
    uploadMethod: 'url' as 'url' | 'upload',
  });

  const fetchItems = useCallback(async () => {
    try {
      const response = await fetch('/api/gallery-images');
      if (!response.ok) throw new Error('Failed to fetch gallery items');
      const data = await response.json();
      setItems(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleImageUpload = async (
    file: File, 
    onProgress?: (percent: number) => void
  ): Promise<{ url: string; publicId: string; width: number; height: number }> => {
    const data = await uploadImageDirect(file, 'gallery', onProgress);
    return {
      url: data.url,
      publicId: data.publicId,
      width: data.width || 1200,
      height: data.height || 1600,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.src && formData.uploadMethod === 'url') {
      setError('Image URL is required');
      return;
    }

    const isEdit = !!editingItem;
    const tempId = isEdit ? editingItem._id : `optimistic-${Date.now()}`;
    const submitData = {
      ...formData,
      width: parseInt(String(formData.width)) || 1200,
      height: parseInt(String(formData.height)) || 1600,
      order: parseInt(String(formData.order)) || 0,
      featured: Boolean(formData.featured),
    };

    if (isEdit) {
      submitData.id = editingItem._id;
    }

    // 1. Prepare optimistic item
    const optimisticItem: GalleryItem = {
      _id: tempId,
      src: formData.src,
      publicId: formData.publicId,
      alt: formData.alt || formData.title || 'Gallery item',
      title: formData.title || 'Untitled',
      description: formData.description || '',
      width: submitData.width,
      height: submitData.height,
      category: formData.category || 'Portrait',
      featured: submitData.featured,
      order: submitData.order,
      createdAt: isEdit ? editingItem.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 2. Insert or update locally immediately
    if (isEdit) {
      setItems(prev => prev.map(item => item._id === editingItem._id ? optimisticItem : item));
    } else {
      setItems(prev => [optimisticItem, ...prev]);
    }

    // 3. Clear and close form
    setShowForm(false);
    setEditingItem(null);
    resetForm();

    // 4. Save metadata in the background
    try {
      const url = isEdit
        ? `/api/gallery-images?id=${tempId}`
        : '/api/gallery-images';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) throw new Error('Failed to save gallery item metadata');
      const savedRecord = await response.json();

      // 5. Replace the optimistic item with the final database record
      setItems(prev => prev.map(item => item._id === tempId ? savedRecord : item));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save metadata');
      // Only refetch or revert if save fails
      if (isEdit) {
        fetchItems(); // full sync to revert
      } else {
        setItems(prev => prev.filter(item => item._id !== tempId));
      }
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file');
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      setError('File size must be less than 50MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    try {
      const result = await handleImageUpload(file, (percent) => {
        setUploadProgress(percent);
      });

      const tempId = `optimistic-${Date.now()}`;
      const titleFromFilename = file.name.replace(/\.[^/.]+$/, '');
      const optimisticItem: GalleryItem = {
        _id: tempId,
        src: result.url,
        publicId: result.publicId,
        alt: formData.alt || titleFromFilename,
        title: formData.title || titleFromFilename,
        description: formData.description || '',
        width: result.width || 1200,
        height: result.height || 1600,
        category: formData.category || 'Portrait',
        featured: formData.featured || false,
        order: formData.order || 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // 1. Immediately insert optimistic item in state
      setItems(prev => [optimisticItem, ...prev]);
      
      // 2. Reset form and close
      setShowForm(false);
      resetForm();

      // 3. Save to database in the background!
      (async () => {
        try {
          const response = await fetch('/api/gallery-images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              src: optimisticItem.src,
              publicId: optimisticItem.publicId,
              alt: optimisticItem.alt,
              title: optimisticItem.title,
              description: optimisticItem.description,
              width: optimisticItem.width,
              height: optimisticItem.height,
              category: optimisticItem.category,
              featured: optimisticItem.featured,
              order: optimisticItem.order
            }),
          });

          if (!response.ok) throw new Error('Failed to save background metadata');
          const savedRecord = await response.json();
          
          // 4. Replace temporary optimistic item with the final database record
          setItems(prev => prev.map(item => item._id === tempId ? savedRecord : item));
        } catch (err) {
          console.error('Background metadata save failed:', err);
          setError('Background save failed. Reverting item.');
          // Remove the temporary optimistic item
          setItems(prev => prev.filter(item => item._id !== tempId));
        }
      })();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      id: item._id,
      src: item.src || '',
      publicId: item.publicId || '',
      alt: item.alt || '',
      title: item.title || '',
      description: item.description || '',
      width: item.width || 1200,
      height: item.height || 1600,
      category: item.category || 'Portrait',
      featured: item.featured || false,
      order: item.order || 0,
      uploadMethod: 'url',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string, publicId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    const originalItems = [...items];
    // Invalidate local cache and update UI immediately
    setItems(prev => prev.filter(item => item._id !== id));

    try {
      // Delete from database
      const response = await fetch(`/api/gallery-images?id=${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete gallery item');

      // Delete from Cloudinary/Vercel Blob in background
      if (publicId) {
        fetch(`/api/upload?publicId=${publicId}&isImage=true`, { method: 'DELETE' }).catch(console.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete');
      // Revert if delete fails
      setItems(originalItems);
    }
  };

  const handlePreview = (item: GalleryItem) => {
    setPreviewItem(item);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      src: '',
      publicId: '',
      alt: '',
      title: '',
      description: '',
      width: 800,
      height: 1000,
      category: 'Portrait',
      featured: false,
      order: 0,
      uploadMethod: 'url',
    });
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
  };

  const handleDownload = async (item: GalleryItem) => {
    try {
      const response = await fetch(item.src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = item.title || item.alt || 'image';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      setTimeout(() => {
        if (a.parentNode) document.body.removeChild(a);
      }, 0);
    } catch {
      setError('Failed to download image');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64">Loading gallery...</div>;
  if (error) return <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-rich-black">Gallery Management</h2>
          <p className="font-sans text-sm text-warm-gray/60 mt-1">Manage your portfolio images</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true); }}
          className="flex items-center gap-2 px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all"
        >
          <HiPlus className="w-4 h-4" />
          Add Image
        </button>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <div className="mb-4 p-4 bg-ivory border border-cream rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="font-sans text-sm text-rich-black">Uploading image...</span>
            <span className="font-mono text-sm text-magenta">{uploadProgress}%</span>
          </div>
          <div className="w-full h-2 bg-cream rounded-full overflow-hidden">
            <div 
              className="h-full bg-magenta transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white border border-cream/50 rounded-lg p-6 mb-6" role="dialog" aria-modal="true" aria-labelledby="form-title">
          <div className="flex items-center justify-between mb-6">
            <h3 id="form-title" className="font-serif text-xl text-rich-black">
              {editingItem ? 'Edit Gallery Image' : 'Add New Gallery Image'}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-cream rounded-lg transition-colors"
              aria-label="Close form"
            >
              <HiXMark className="w-5 h-5 text-warm-gray" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Upload Method Tabs */}
            <div className="flex gap-4 border-b border-cream">
              {['url', 'upload'].map(method => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, uploadMethod: method as 'url' | 'upload' }))}
                  className={`py-2 px-4 font-sans text-sm font-medium transition-colors ${
                    formData.uploadMethod === method
                      ? 'text-magenta border-b-2 border-magenta'
                      : 'text-warm-gray/60 hover:text-rich-black'
                  }`}
                >
                  {method === 'url' ? 'Image URL' : 'Upload from Computer'}
                </button>
              ))}
            </div>

            {/* URL Input */}
            {formData.uploadMethod === 'url' && (
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.src}
                  onChange={(e) => setFormData({ ...formData, src: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
            )}

            {/* File Upload */}
            {formData.uploadMethod === 'upload' && (
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Select Image File
                </label>
                <div
                  className="border-2 border-dashed border-cream/60 rounded-lg p-8 text-center hover:border-magenta/40 transition-colors cursor-pointer"
                  onClick={() => document.getElementById('gallery-image-upload')?.click()}
                >
                  <input
                    id="gallery-image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <HiPhoto className="w-12 h-12 mx-auto text-warm-gray/40 mb-3" />
                  <p className="font-sans text-sm text-warm-gray/60">Click or drag to upload</p>
                  <p className="font-sans text-xs text-warm-gray/40 mt-1">JPG, PNG, WebP up to 10MB</p>
                </div>
                {formData.src && (
                  <div className="mt-4 p-3 bg-ivory rounded-lg flex items-center justify-between">
                    <img src={formData.src} alt="Preview" className="w-16 h-16 object-cover rounded" />
                    <div className="ml-4 flex-1">
                      <p className="font-sans text-sm text-rich-black">Image selected</p>
                      <p className="font-sans text-xs text-warm-gray/60">{formData.src.substring(0, 60)}...</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Alt Text
                </label>
                <input
                  type="text"
                  value={formData.alt}
                  onChange={(e) => setFormData({ ...formData, alt: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  placeholder="Describe the image for accessibility"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  placeholder="Image title"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Width (px)
                </label>
                <input
                  type="number"
                  value={formData.width}
                  onChange={(e) => setFormData({ ...formData, width: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  min="1"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Height (px)
                </label>
                <input
                  type="number"
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  min="1"
                />
              </div>
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black font-sans text-sm appearance-none transition-all focus:outline-none focus:border-magenta/40"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40"
                  min="0"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="h-4 w-4 text-magenta focus:ring-magenta/50 border-cream/60 rounded"
                />
                <label htmlFor="featured" className="ml-2 font-sans text-sm text-warm-gray/70">
                  Featured Image
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-white border border-cream/60 text-rich-black placeholder:text-warm-gray/40 font-sans text-sm transition-all focus:outline-none focus:border-magenta/40 resize-none"
                placeholder="Optional description for this image"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-cream">
              <button
                type="button"
                onClick={handleCancel}
                className="px-5 py-3 border border-cream/60 text-warm-gray/70 font-sans text-xs tracking-wider uppercase hover:bg-cream transition-all"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-3 bg-rich-black text-white font-sans text-xs tracking-wider uppercase hover:bg-charcoal transition-all"
              >
                {editingItem ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <HiPhoto className="w-16 h-16 text-warm-gray/30 mb-4" />
            <p className="font-serif text-xl text-warm-gray/60">No gallery images yet</p>
            <p className="font-sans text-sm text-warm-gray/40 mt-1">Click "Add Image" to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {items.map((item) => (
              <div
                key={item._id}
                className="group bg-white border border-cream/50 rounded-lg overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-cream/50">
                  <img
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt || item.title || 'Gallery item'}
                    className={`w-full h-full object-contain transition-all duration-500 ${!loadedImages[item._id] ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'} group-hover:scale-105`}
                    loading="lazy"
                    onLoad={() => setLoadedImages(prev => ({ ...prev, [item._id]: true }))}
                  />
                  {!loadedImages[item._id] && !item._id.startsWith('optimistic-') && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cream/40 via-cream/60 to-cream/40 animate-pulse flex items-center justify-center">
                      <HiPhoto className="w-10 h-10 text-warm-gray/20 animate-pulse" />
                    </div>
                  )}
                  {item._id.startsWith('optimistic-') && (
                    <div className="absolute inset-0 bg-rich-black/30 backdrop-blur-[1px] flex flex-col items-center justify-center p-4">
                      <div className="w-8 h-8 border-2 border-magenta border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="font-sans text-[10px] text-white bg-rich-black/80 px-2 py-0.5 rounded tracking-wider uppercase">Saving...</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-rich-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
                    <button
                      onClick={() => handlePreview(item)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cream transition-colors"
                      aria-label="Preview"
                    >
                      <HiEye className="w-5 h-5 text-rich-black" />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cream transition-colors"
                      aria-label="Edit"
                    >
                      <HiPencil className="w-5 h-5 text-rich-black" />
                    </button>
                    <button
                      onClick={() => handleDownload(item)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-cream transition-colors"
                      aria-label="Download"
                    >
                      <HiArrowDownTray className="w-5 h-5 text-rich-black" />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id, item.publicId)}
                      className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-rose-50 transition-colors"
                      aria-label="Delete"
                    >
                      <HiTrash className="w-5 h-5 text-rose-500" />
                    </button>
                  </div>
                  {item.featured && (
                    <span className="absolute top-2 left-2 px-2 py-1 bg-magenta/90 text-white font-sans text-[10px] tracking-wider uppercase rounded">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-serif text-base text-rich-black truncate">{item.title || 'Untitled'}</h4>
                  <div className="flex items-center gap-2 mt-2 text-xs">
                    <span className="px-2 py-0.5 bg-cream text-warm-gray rounded">{item.category}</span>
                    <span className="text-warm-gray/50">Order: {item.order}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-rich-black/90 backdrop-blur-sm p-4"
          onClick={() => setPreviewItem(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 border-b border-cream">
              <h3 id="preview-title" className="font-serif text-lg text-rich-black truncate max-w-[60%]">
                {previewItem.title || 'Image Preview'}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(previewItem)}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                  aria-label="Download"
                >
                  <HiArrowDownTray className="w-5 h-5 text-rich-black" />
                </button>
                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 hover:bg-cream rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <HiXMark className="w-5 h-5 text-rich-black" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-center p-4 bg-gray-100 min-h-[60vh] max-h-[70vh] overflow-auto">
              <img
                src={previewItem.src}
                alt={previewItem.alt || previewItem.title}
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="p-4 border-t border-cream bg-cream/30">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm font-sans">
                <div>
                  <p className="text-warm-gray/60">Category</p>
                  <p className="text-rich-black">{previewItem.category}</p>
                </div>
                <div>
                  <p className="text-warm-gray/60">Dimensions</p>
                  <p className="text-rich-black">{previewItem.width} × {previewItem.height} px</p>
                </div>
                <div>
                  <p className="text-warm-gray/60">Order</p>
                  <p className="text-rich-black">{previewItem.order}</p>
                </div>
                <div>
                  <p className="text-warm-gray/60">Featured</p>
                  <p className="text-rich-black">{previewItem.featured ? 'Yes' : 'No'}</p>
                </div>
              </div>
              {previewItem.description && (
                <div className="mt-4">
                  <p className="text-warm-gray/60 text-sm mb-1">Description</p>
                  <p className="text-rich-black text-sm">{previewItem.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}