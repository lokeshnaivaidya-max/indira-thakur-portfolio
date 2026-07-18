'use client';

export default function AdminSEOPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-warm-black mb-2">SEO Settings</h1>
      <p className="font-sans-alt text-sm text-earth-brown/60 mb-10">Manage your website&apos;s SEO and metadata.</p>

      <div className="max-w-3xl space-y-6">
        <div>
          <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">Site Title</label>
          <input type="text" className="premium-input" defaultValue="" />
        </div>

        <div>
          <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">Meta Description</label>
          <textarea className="premium-textarea" defaultValue="" rows={3} />
        </div>

        <div>
          <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">Keywords</label>
          <input type="text" className="premium-input" defaultValue="" />
          <p className="font-sans-alt text-xs text-earth-brown/40 mt-1">Separate keywords with commas</p>
        </div>

        <div>
          <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">OG Image URL</label>
          <input type="text" className="premium-input" defaultValue="" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">Twitter Handle</label>
            <input type="text" className="premium-input" defaultValue="" />
          </div>
          <div>
            <label className="block font-sans-alt text-xs tracking-wider uppercase text-earth-brown/60 mb-2">Canonical URL</label>
            <input type="text" className="premium-input" defaultValue="" />
          </div>
        </div>

        <div className="pt-4">
          <button className="premium-button">Save SEO Settings</button>
        </div>
      </div>
    </div>
  );
}
