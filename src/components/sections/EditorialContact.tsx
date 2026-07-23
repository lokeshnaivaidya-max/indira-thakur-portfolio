'use client';

import { motion } from 'framer-motion';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';

const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSd-LdjuiUE9RSb-rlFMKYj1nJ9az_SQ5RiDeBSTNMQVu5OFYw/viewform';

export default function EditorialContact() {
  const { config } = useSiteConfig();

  const contactData: any = config?.contact || {
    eyebrow: "COMMISSION INQUIRIES",
    heading: 'Begin Your Story',
    description: 'Every bespoke photograph begins with a quiet conversation. Reach out to reserve your date or inquire about fine art sessions.',
    email: 'photography@indirathakur.com',
    phone: '+91 9819620484',
    location: 'Mumbai, India · Available Worldwide',
    studioImage: { url: '', alt: '' }
  };

  const hasImage = (url?: string) => url && url.trim() !== '';

  return (
    <section id="contact" className="py-24 md:py-36 bg-white text-[#2B2625] relative">
      <div className="container-editorial">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Left Column: Direct Info & Studio Atmosphere */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.div
                initial={{ opacity: 0.95 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                {contactData.eyebrow && (
                  <span className="font-mono text-[11px] text-[#C39E96] uppercase tracking-[0.35em] block font-medium mb-2">
                    {contactData.eyebrow}
                  </span>
                )}
                {contactData.heading && (
                  <h2 className="font-serif text-4xl sm:text-5xl text-[#2B2625] leading-none mb-4">
                    {contactData.heading}
                  </h2>
                )}
                <div className="w-10 h-px bg-[#C39E96]/40 my-6" />
                <p className="font-sans text-sm md:text-base text-[#7C706D] leading-relaxed mb-8">
                  {contactData.description}
                </p>
              </motion.div>

              {/* Direct Details */}
              <div className="space-y-6 pt-6 border-t border-[#E7DDD2]">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C39E96] block mb-1">
                    Studio Email
                  </span>
                  <a href={`mailto:${contactData.email}`} className="font-serif text-xl text-[#2B2625] hover:text-[#C39E96] transition-colors">
                    {contactData.email}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C39E96] block mb-1">
                    Direct Line / WhatsApp
                  </span>
                  <a href={`tel:${contactData.phone?.replace(/\s/g, '')}`} className="font-serif text-xl text-[#2B2625] hover:text-[#C39E96] transition-colors">
                    {contactData.phone}
                  </a>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C39E96] block mb-1">
                    Primary Studio Location
                  </span>
                  <p className="font-sans text-sm text-[#7C706D]">
                    {contactData.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Studio Image OR Clean Luxury Quote Frame */}
            {hasImage(contactData.studioImage?.url) ? (
              <div className="mt-12 relative h-64 md:h-80 rounded-sm overflow-hidden border border-[#E7DDD2] hidden lg:block">
                <PolaroidImage
                  src={contactData.studioImage.url}
                  alt={contactData.studioImage.alt || 'Studio Atmosphere'}
                  fill
                  sizes="400px"
                  className="!w-full !h-full object-cover"
                  containerClassName="!w-full !h-full"
                />
              </div>
            ) : (
              <div className="mt-12 pt-8 border-t border-[#E7DDD2] space-y-4">
                <p className="font-serif italic text-lg text-[#2B2625]/90 leading-relaxed">
                  "Photography for me is all about preserving emotions, celebrating families, documenting milestones, and creating timeless memories that people will treasure for generations."
                </p>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-px bg-[#C39E96]" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#C39E96]">
                    Indira Thakur
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Google Form Redirect */}
          <div className="lg:col-span-7 bg-white p-8 md:p-14 border border-[#E7DDD2] shadow-[0_10px_40px_rgba(0,0,0,0.02)] rounded-sm">
            <h3 className="font-serif text-2xl text-[#2B2625] mb-2">
              Send a Private Message
            </h3>
            <p className="font-sans text-xs text-[#7C706D] mb-8">
              Please share a few details regarding your desired session date and vision.
            </p>

            <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-[#FAF6F3] border border-[#E7DDD2] rounded-sm my-8 text-center">
              <span className="font-serif text-3xl text-[#2B2625] block mb-3">We'd Love to Hear From You</span>
              <p className="font-sans text-sm text-[#7C706D] leading-relaxed max-w-md mx-auto mb-8">
                Click below to open our inquiry form. It will open in a new tab, and we'll get back to you promptly.
              </p>
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#2B2625] text-white font-sans text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#3D3534] transition-all duration-500 shadow-md"
              >
                Open Inquiry Form
              </a>
              <p className="font-mono text-[9px] text-[#7C706D]/50 uppercase tracking-[0.25em] mt-4">
                Powered by Google Forms
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
