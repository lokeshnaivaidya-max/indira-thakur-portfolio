'use client';

export default function AdminAboutPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl md:text-4xl text-rich-black mb-2">About Page</h1>
      <p className="font-sans text-sm text-warm-gray/60 mb-10">Manage the About section content.</p>

      <div className="max-w-3xl space-y-6">
        <div>
          <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">About Image</label>
          <div className="aspect-4-5 max-w-sm bg-cream/50 rounded-sm border-2 border-dashed border-warm-beige/40 flex items-center justify-center cursor-pointer hover:border-magenta/60/40 transition-colors">
            <span className="font-sans text-sm text-warm-gray/40">Click to upload image</span>
          </div>
        </div>

        <div>
          <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">Personal Story</label>
          <textarea
            className="premium-textarea"
            defaultValue=""
            rows={6}
          />
        </div>

        <div>
          <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">Philosophy</label>
          <textarea
            className="premium-textarea"
            defaultValue=""
            rows={4}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">Years Experience</label>
            <input type="text" className="input-field" defaultValue="" />
          </div>
          <div>
            <label className="block font-sans text-xs tracking-wider uppercase text-warm-gray/60 mb-2">Happy Clients</label>
            <input type="text" className="input-field" defaultValue="" />
          </div>
        </div>

        <div className="pt-4">
          <button className="btn-primary">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
