'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

export default function EditorialAbout() {
  const { config } = useSiteConfig();

  const aboutData: any = config?.about || {
    eyebrow: 'THE ARTIST & VISION',
    heading: 'Indira Thakur',
    headingItalic: 'Fine Art Photographer',
    bio: [
      "With over a decade dedicated to mastering the delicate nuances of natural light and human connection, Indira Thakur creates fine art photography that transcends traditional portraiture.",
      "Specializing in luxury newborn, maternity, and expressive portraiture, her work is defined by emotional depth, soft organic tones, and timeless aesthetic restraint.",
      "Every frame is curated as a heirloom—preserving your family's most sacred chapters in museum-grade visual stories."
    ],
    philosophyQuote: "Photography is not merely capturing what stands before the lens; it is capturing how love feels in its most silent, profound moments.",
    milestones: [
      { year: '12+', label: 'Years of Experience', detail: 'Mastering fine art lighting & emotive posing' },
      { year: '800+', label: 'Milestone Families', detail: 'Newborns, mothers & couples documented' },
      { year: '15+', label: 'National Accolades', detail: 'Exhibited in premier editorial features' },
    ],
    mainImage: {
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200',
      alt: 'Indira Thakur Fine Art Portrait'
    },
    secondaryImage: {
      url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000',
      alt: 'Newborn Photography Artistry'
    }
  };

  const mainImageUrl =
    (config?.about?.images?.founderPortrait?.url && config.about.images.founderPortrait.url.trim()) ||
    ((config?.about as any)?.mainImage?.url && (config?.about as any).mainImage.url.trim()) ||
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1200';

  const secondaryImageUrl =
    (config?.about?.images?.storyImage?.url && config.about.images.storyImage.url.trim()) ||
    ((config?.about as any)?.secondaryImage?.url && (config?.about as any).secondaryImage.url.trim()) ||
    'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1000';

  return (
    <section className="py-24 md:py-36 bg-[#FAF6F3] text-[#2B2625] relative overflow-hidden">
      <div className="container-editorial">
        {/* Top Header */}
        <div className="max-w-3xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block mb-3 font-medium">
              {aboutData.eyebrow || 'THE ARTIST & VISION'}
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B2625] leading-[1.05] tracking-tight">
              {aboutData.heading || 'Indira Thakur'}
              <br />
              <span className="font-serif italic text-[#7C706D] font-normal text-3xl sm:text-4xl md:text-5xl">
                {aboutData.headingItalic || 'Fine Art Photographer'}
              </span>
            </h2>
            <div className="w-12 h-px bg-[#C39E96]/40 mt-6" />
          </motion.div>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Column: Portrait & Secondary Overlapping Artwork */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative min-h-[480px] md:min-h-[620px] rounded-sm overflow-hidden shadow-2xl border border-[#E7DDD2] bg-[#FAF6F3] p-2 md:p-3 flex items-center justify-center"
            >
              <PolaroidImage
                src={mainImageUrl}
                alt="Indira Thakur Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                objectFit="contain"
                className="!w-full !h-full"
                containerClassName="!w-full !h-full"
              />
            </motion.div>

            {/* Overlapping Floating Inset Image */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="hidden sm:flex absolute -bottom-8 -right-4 md:-right-8 w-56 md:w-72 min-h-[220px] md:min-h-[280px] bg-[#FAF6F3] p-2 border-4 border-[#FAF6F3] shadow-2xl overflow-hidden rounded-sm z-10 items-center justify-center"
            >
              <PolaroidImage
                src={secondaryImageUrl}
                alt="Fine Art Photography"
                fill
                sizes="300px"
                objectFit="contain"
                className="!w-full !h-full"
                containerClassName="!w-full !h-full"
              />
            </motion.div>
          </div>

          {/* Right Column: Bio Narrative & Milestones */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Quote Feature */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="p-8 md:p-10 bg-white border border-[#E7DDD2]/60 shadow-[0_10px_30px_rgba(0,0,0,0.02)] mb-8 rounded-sm relative"
            >
              <span className="font-serif text-5xl text-[#C39E96]/40 absolute top-3 left-4 font-normal">“</span>
              <p className="font-serif italic text-lg md:text-xl text-[#2B2625] leading-relaxed relative z-10 pt-2">
                {aboutData.philosophyQuote}
              </p>
            </motion.div>

            {/* Bio Paragraphs */}
            <div className="space-y-4 font-sans text-sm md:text-base text-[#7C706D] leading-relaxed">
              {Array.isArray(aboutData.bio) ? (
                aboutData.bio.map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))
              ) : (
                <p>{aboutData.bio}</p>
              )}
            </div>

            {/* Milestones Stats Bar */}
            <div className="grid grid-cols-3 gap-6 my-10 pt-8 border-t border-[#E7DDD2]">
              {aboutData.milestones?.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl text-[#2B2625] font-semibold">
                    {item.year}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#C39E96] font-medium mt-1">
                    {item.label}
                  </span>
                  {item.detail && (
                    <span className="font-sans text-[11px] text-[#7C706D]/70 mt-1 hidden sm:block">
                      {item.detail}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex items-center gap-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-[#2B2625] text-white font-sans text-[11px] uppercase tracking-[0.25em] font-medium hover:bg-[#3D3534] transition-all duration-500 shadow-sm"
              >
                Inquire With Indira
              </Link>
              <Link
                href="/services"
                className="font-sans text-[11px] text-[#C39E96] uppercase tracking-[0.25em] hover:text-[#2B2625] transition-colors"
              >
                View Experience →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
