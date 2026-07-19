'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSiteConfig } from '@/hooks/useSiteConfig';
import { PolaroidImage } from '@/components/ui/PolaroidImage';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder';

export default function About() {
  const { config } = useSiteConfig();

  const about = config?.about || {
    eyebrow: 'The Story',
    heading: 'A Once-in-a-Lifetime Experience',
    subheading: '',
    story: 'Hello! I am Indira Thakur, a passionate storyteller and professional photographer. I come from a background in Journalism and Public Relations, where I developed a deep appreciation for storytelling and human emotions. In 2013, I transformed that passion into photography, and what started as a creative journey soon became my life\'s purpose.',
    storyContinued: 'Photography, for me, is much more than taking pictures. It is about preserving emotions, celebrating families, documenting milestones, and creating timeless memories that people will treasure for generations.',
    philosophy: 'I believe every family is unique, and every session deserves patience, warmth, creativity, and genuine care. My goal is not just to deliver photographs but to create memories that families will revisit with love for decades.',
    philosophyContinued: '',
    journey: 'One of the proudest milestones in my journey was creating a film for Dadasaheb Phalke Chitranagri (Filmcity), Goregaon. The film premiered at the Chitrapataka Film Festival. Since my very first project, I have earned the trust of countless families by providing a personalized and comfortable experience during every shoot.',
    journeyContinued: '',
    welcomeMessage: 'I warmly invite you to become a part of the Indira Thakur Photography family. Let us create something beautiful together.',
    signature: 'Indira Thakur',
    specializations: ['Maternity Photography', 'Birth Photography', 'Newborn Photography', 'Family Portraits', 'Child Photography'],
    achievements: [],
    stats: [],
    values: [],
    ctaText: 'View Portfolio',
    ctaLink: '/gallery',
    images: {
      founderPortrait: { url: '', alt: '' },
      journeyImage: { url: '', alt: '' },
      storyImage: { url: '', alt: '' },
      achievementImage: { url: '', alt: '' },
      behindTheScenes: { url: '', alt: '' },
      welcomeImage: { url: '', alt: '' },
      editorial1: { url: '', alt: '' },
      editorial2: { url: '', alt: '' },
    },
  };

  const hasImage = (url: string) => url && url.trim() !== '';

  return (
    <section id="about" className="relative bg-ivory">

      {/* 1. Editorial Hero */}
      <div className="min-h-[90vh] flex items-end relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-ivory to-beige/20" />
        <div className="container-editorial relative z-10 w-full pb-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0">
            <div className="lg:col-span-7 lg:h-[85vh] relative">
              {hasImage(about.images.founderPortrait.url) ? (
                <PolaroidImage
                  src={about.images.founderPortrait.url}
                  alt={about.images.founderPortrait.alt || 'Indira Thakur - Portrait'}
                  fill
                  objectPosition="top"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                />
              ) : (
                <ImagePlaceholder aspect="h-full" label="Founder Portrait" icon="portrait" className="w-full h-full" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ivory/30 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="lg:col-span-5 flex items-end pb-12 md:pb-20 pl-0 lg:pl-14 pt-8 lg:pt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">{about.eyebrow}</span>
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-rich-black leading-[1.1] mt-4 max-w-sm">{about.heading}</h2>
                <div className="w-5 h-px bg-magenta/25 mt-6" />
                <p className="font-sans text-sm text-warm-gray/50 mt-5 max-w-xs leading-relaxed">
                  {about.specializations?.slice(0, 3).join(' · ') || 'Newborn · Maternity · Portrait'}
                </p>
                <Link
                  href={about.ctaLink || '/gallery'}
                  className="inline-flex items-center gap-2 mt-6 font-sans text-[9px] text-magenta/50 uppercase tracking-[0.3em] hover:text-magenta transition-colors duration-500"
                >
                  <span className="w-3 h-px bg-magenta/25" />
                  {about.ctaText || 'View Portfolio'}
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Story */}
      <div className="py-24 md:py-32 lg:py-40 bg-white">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col justify-center"
            >
              <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">My Story</span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black leading-[1.15] mt-4">
                From Words to <span className="italic font-normal text-warm-gray/60">Frames</span>
              </h3>
              <div className="w-5 h-px bg-magenta/25 mt-6" />
              <p className="font-sans text-sm text-warm-gray/50 mt-6 leading-[1.8]">{about.story}</p>
              {about.storyContinued && (
                <p className="font-sans text-sm text-warm-gray/50 mt-4 leading-[1.8]">{about.storyContinued}</p>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-7 relative"
            >
              {hasImage(about.images.storyImage.url) ? (
                <PolaroidImage
                  src={about.images.storyImage.url}
                  alt={about.images.storyImage.alt || 'Story - Photography Journey'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '50vh' }}
                />
              ) : (
                <ImagePlaceholder aspect="h-[50vh] md:h-[65vh]" label="Story Image" icon="landscape" />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 3. Philosophy */}
      <div className="py-24 md:py-32 bg-cream/15">
        <div className="container-editorial">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Philosophy</span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black leading-[1.15] mt-4">
                Every Session is a <span className="italic font-normal text-warm-gray/60">Love Story</span>
              </h3>
              <div className="w-5 h-px bg-magenta/25 mt-6 mx-auto" />
              <p className="font-sans text-sm md:text-base text-warm-gray/50 mt-6 leading-[1.8] max-w-2xl mx-auto">{about.philosophy}</p>
              {about.philosophyContinued && (
                <p className="font-sans text-sm md:text-base text-warm-gray/50 mt-4 leading-[1.8] max-w-2xl mx-auto">{about.philosophyContinued}</p>
              )}
            </motion.div>

            {about.specializations && about.specializations.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 flex flex-wrap justify-center gap-3"
              >
                {about.specializations.map((spec: string, i: number) => (
                  <span
                    key={i}
                    className="px-5 py-2 border border-beige/40 font-sans text-[10px] text-warm-gray/50 uppercase tracking-[0.2em] rounded-full hover:border-magenta/20 hover:text-magenta/60 transition-all duration-500"
                  >
                    {spec}
                  </span>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 4. Journey */}
      <div className="py-24 md:py-32 lg:py-40 bg-rich-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1110] via-[#2C1810] to-rich-black opacity-80" />
        <div className="container-editorial relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 order-2 lg:order-1"
            >
              {hasImage(about.images.journeyImage.url) ? (
                <PolaroidImage
                  src={about.images.journeyImage.url}
                  alt={about.images.journeyImage.alt || 'Journey - Creative Path'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '40vh' }}
                />
              ) : (
                <ImagePlaceholder aspect="h-[40vh] md:h-[55vh]" label="Journey Image" icon="film" className="[&_*]:!text-white/10" />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 order-1 lg:order-2"
            >
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-[0.35em]">The Journey</span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-[1.15] mt-4">
                Capturing <span className="italic font-normal text-white/50">Milestones</span>
              </h3>
              <div className="w-5 h-px bg-white/15 mt-6" />
              <p className="font-sans text-sm text-white/40 mt-6 leading-[1.8]">{about.journey}</p>
              {about.journeyContinued && (
                <p className="font-sans text-sm text-white/40 mt-4 leading-[1.8]">{about.journeyContinued}</p>
              )}

              {about.stats && about.stats.length > 0 && (
                <div className="mt-10 grid grid-cols-3 gap-6">
                  {about.stats.map((stat: { label: string; value: string }, i: number) => (
                    <div key={i}>
                      <p className="font-serif text-2xl md:text-3xl text-white">{stat.value}</p>
                      <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 5. Achievements */}
      {about.achievements && about.achievements.length > 0 && (
        <div className="py-24 md:py-32 bg-ivory">
          <div className="container-editorial">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Milestones</span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black leading-[1.15] mt-4">
                Proud <span className="italic font-normal text-warm-gray/60">Moments</span>
              </h3>
              <div className="w-5 h-px bg-magenta/25 mt-6 mx-auto" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {about.achievements.map((ach: { title: string; description: string; year?: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className="p-8 bg-white border border-cream/40 hover:border-magenta/15 transition-colors duration-500"
                >
                  {ach.year && (
                    <p className="font-mono text-[9px] text-magenta/30 uppercase tracking-[0.2em] mb-3">{ach.year}</p>
                  )}
                  <h4 className="font-serif text-lg text-rich-black">{ach.title}</h4>
                  <div className="w-4 h-px bg-magenta/15 mt-3 mb-3" />
                  <p className="font-sans text-sm text-warm-gray/50 leading-relaxed">{ach.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. Editorial Gallery */}
      <div className="py-12 md:py-16 bg-cream/15">
        <div className="container-editorial">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {hasImage(about.images.editorial1.url) ? (
                <PolaroidImage
                  src={about.images.editorial1.url}
                  alt={about.images.editorial1.alt || 'Editorial - Behind the Scenes'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '35vh' }}
                />
              ) : (
                <ImagePlaceholder aspect="h-[35vh] md:h-[45vh]" label="Editorial Image" icon="camera" />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {hasImage(about.images.behindTheScenes.url) ? (
                <PolaroidImage
                  src={about.images.behindTheScenes.url}
                  alt={about.images.behindTheScenes.alt || 'Behind the Scenes'}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '35vh' }}
                />
              ) : (
                <ImagePlaceholder aspect="h-[35vh] md:h-[45vh]" label="Behind The Scenes" icon="film" />
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* 7. Values */}
      {about.values && about.values.length > 0 && (
        <div className="py-24 md:py-32 bg-ivory">
          <div className="container-editorial">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-center mb-14"
              >
                <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Core Values</span>
                <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black leading-[1.15] mt-4">
                  What <span className="italic font-normal text-warm-gray/60">Drives Us</span>
                </h3>
                <div className="w-5 h-px bg-magenta/25 mt-6 mx-auto" />
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {about.values.map((val: { title: string; description: string }, i: number) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="w-px bg-magenta/15 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-serif text-lg text-rich-black">{val.title}</h4>
                      <p className="font-sans text-sm text-warm-gray/50 mt-2 leading-relaxed">{val.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Welcome CTA */}
      <div className="py-24 md:py-32 bg-cream/15 relative overflow-hidden">
        <div className="container-editorial">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6"
            >
              <span className="font-mono text-[8px] text-magenta/40 uppercase tracking-[0.35em]">Welcome</span>
              <h3 className="font-serif text-2xl md:text-3xl lg:text-4xl text-rich-black leading-[1.15] mt-4">
                Join the <span className="italic font-normal text-warm-gray/60">Family</span>
              </h3>
              <div className="w-5 h-px bg-magenta/25 mt-6" />
              <p className="font-sans text-sm md:text-base text-warm-gray/50 mt-6 leading-[1.8]">{about.welcomeMessage}</p>

              {about.signature && (
                <div className="mt-8">
                  <p className="font-serif text-xl italic text-rich-black/70">{about.signature}</p>
                  <p className="font-mono text-[9px] text-warm-gray/30 uppercase tracking-[0.2em] mt-1">Indira Thakur Photography</p>
                </div>
              )}

              <div className="mt-8 flex items-center gap-6">
                <Link
                  href={about.ctaLink || '/gallery'}
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-rich-black text-white font-sans text-[10px] uppercase tracking-[0.25em] font-medium transition-all duration-700 hover:bg-charcoal"
                >
                  {about.ctaText || 'View Portfolio'}
                </Link>
                <Link
                  href="/contact"
                  className="font-sans text-[10px] text-magenta/50 uppercase tracking-[0.2em] hover:text-magenta transition-colors duration-500"
                >
                  Get in Touch
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6"
            >
              {hasImage(about.images.welcomeImage.url) ? (
                <PolaroidImage
                  src={about.images.welcomeImage.url}
                  alt={about.images.welcomeImage.alt || 'Welcome to Indira Thakur Photography'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '40vh' }}
                />
              ) : hasImage(about.images.achievementImage.url) ? (
                <PolaroidImage
                  src={about.images.achievementImage.url}
                  alt={about.images.achievementImage.alt || 'Indira Thakur Photography'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="!w-full !h-full"
                  containerClassName="!w-full !h-full"
                  style={{ height: '40vh' }}
                />
              ) : (
                <ImagePlaceholder aspect="h-[40vh] md:h-[55vh]" label="Welcome Image" icon="portrait" />
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
