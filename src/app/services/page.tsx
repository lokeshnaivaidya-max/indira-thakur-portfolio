'use client';

import Link from 'next/link';

const allServices: { title: string; slug: string; gradient: string; description: string }[] = [];

export default function ServicesPage() {
  return (
    <div className="pt-20 md:pt-24 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="font-sans-alt text-sm text-muted-gold tracking-wider uppercase">What I Offer</span>
          <h1 className="font-serif text-4xl md:text-5xl text-warm-black mt-3">All Services</h1>
          <p className="mt-4 text-warm-brown/70 font-sans-alt max-w-xl mx-auto">Every session is a unique experience designed to capture your most cherished moments.</p>
        </div>

        {allServices.length === 0 ? (
          <div className="text-center p-16 bg-cream/30 rounded-sm">
            <p className="text-warm-brown/60 font-sans-alt">Service details coming soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allServices.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="card group block">
                <div className={`aspect-4-3 bg-gradient-to-br ${s.gradient}`} />
                <div className="p-6">
                  <h3 className="font-serif text-xl text-warm-black group-hover:text-muted-gold transition-colors">{s.title}</h3>
                  <p className="mt-2 text-warm-brown/70 font-sans-alt text-sm">{s.description}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
