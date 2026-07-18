'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';
import { HiArrowLeft } from 'react-icons/hi2';

const servicesData: Record<string, { title: string; description: string; heroGradient: string; benefits: string[]; price: string }> = {
  newborn: {
    title: 'Newborn Photography',
    description: 'Preserve the purest moments of your little one\'s first days with gentle, artistic newborn photography. I create a safe, warm, and comfortable environment for your baby\'s first photoshoot, capturing those tiny fingers, delicate features, and peaceful expressions that change so quickly.',
    heroGradient: 'from-soft-rose to-warm-blush',
    benefits: [
      'In-home or studio session at your convenience',
      'Gentle, baby-led posing for safety and comfort',
      'Professional styling and prop selection',
      'Family and sibling inclusion',
      'High-resolution digital gallery with printing rights',
      'Heirloom-quality album options',
    ],
    price: 'Starting from $450',
  },
  maternity: {
    title: 'Maternity Photography',
    description: 'Celebrate the beauty of motherhood with elegant and emotional maternity sessions. These photographs capture the radiant glow, the anticipation, and the profound love that grows as you prepare to welcome your little one.',
    heroGradient: 'from-warm-blush to-cream',
    benefits: [
      'Professional wardrobe options available',
      'Flattering posing guidance',
      'Studio or outdoor location options',
      'Hair and makeup coordination available',
      'Partner and family inclusion',
      'High-resolution digital gallery',
    ],
    price: 'Starting from $350',
  },
  portrait: {
    title: 'Portrait Photography',
    description: 'Timeless portraits that capture your unique personality and natural beauty. Whether for professional branding, personal milestones, or just because — every portrait session is designed to make you feel confident and celebrated.',
    heroGradient: 'from-cream to-beige',
    benefits: [
      'Personalized concept consultation',
      'Wardrobe styling guidance',
      'Multiple outfit changes',
      'Studio or location options',
      'Professional retouching included',
      'Digital and print packages available',
    ],
    price: 'Starting from $300',
  },
  events: {
    title: 'Personal Events',
    description: 'From milestone birthdays to intimate family gatherings, document your special moments with cinematic storytelling. I capture the genuine emotions, candid interactions, and beautiful details that make your event unique.',
    heroGradient: 'from-warm-cream to-beige',
    benefits: [
      'Full event coverage options',
      'Candid and posed photography',
      'Detail and decor documentation',
      'Quick turnaround time',
      'Online gallery for sharing with guests',
      'Print-ready digital files',
    ],
    price: 'Starting from $600',
  },
  corporate: {
    title: 'Corporate Events',
    description: 'Professional event coverage that captures the essence of your brand and corporate culture. From conferences and galas to team-building events, I provide polished, brand-appropriate photography.',
    heroGradient: 'from-cream to-warm-cream',
    benefits: [
      'Professional, unobtrusive coverage',
      'Brand-consistent editing style',
      'Headshot opportunities',
      'Quick delivery for press-ready images',
      'Commercial usage rights included',
      'Multi-event packages available',
    ],
    price: 'Starting from $800',
  },
  brand: {
    title: 'Brand Collaborations',
    description: 'Creative visual content for brands looking to tell their story through stunning photography. Let\'s create compelling images that elevate your brand identity and connect with your audience.',
    heroGradient: 'from-warm-beige to-cream',
    benefits: [
      'Creative direction and concept development',
      'Product and lifestyle photography',
      'Content for social media and web',
      'Brand-aligned aesthetic',
      'Fast turnaround for time-sensitive content',
      'Long-term partnership options',
    ],
    price: 'Contact for custom quote',
  },
};

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-warm-black mb-4">Service Not Found</h1>
          <Link href="/#services" className="text-muted-gold underline font-sans-alt">Back to Services</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="pt-24 md:pt-32">
        {/* Hero */}
        <section className={`relative py-24 md:py-32 bg-gradient-to-br ${service.heroGradient}`}>
          <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Link href="/#services" className="inline-flex items-center gap-2 text-earth-brown/60 hover:text-warm-black font-sans-alt text-xs tracking-[0.15em] uppercase transition-colors mb-8">
                <HiArrowLeft className="w-3.5 h-3.5" />
                Back to Services
              </Link>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-warm-black leading-tight">
                {service.title}
              </h1>
              <p className="mt-6 max-w-2xl text-earth-brown/80 font-sans-alt text-lg leading-relaxed">
                {service.description}
              </p>
              <div className="mt-8">
                <Button href="/#contact">Book This Session</Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits */}
        <section className="section-padding bg-soft-white">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <SectionHeading
                  subtitle="What&apos;s Included"
                  title="The Experience"
                  align="left"
                />
                <ul className="space-y-4 mt-8">
                  {service.benefits.map((benefit, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="text-muted-gold mt-1">✦</span>
                      <span className="text-earth-brown/80 font-sans-alt">{benefit}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className={`aspect-4-5 rounded-sm bg-gradient-to-br ${service.heroGradient}`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-warm-black/20 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border border-muted-gold/30 rounded-sm -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="section-padding bg-cream/30">
          <div className="max-w-7xl mx-auto">
            <SectionHeading
              subtitle="Recent Work"
              title="Related Gallery"
              description="A glimpse into the beautiful moments captured in this category."
            />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className={`aspect-${i % 3 === 0 ? '4-5' : i % 3 === 1 ? '1-1' : '3-2'} rounded-sm bg-gradient-to-br ${service.heroGradient} opacity-${70 + i * 5}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Pricing CTA */}
        <section className="section-padding bg-warm-black text-soft-white text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-soft-white mb-6">Ready to Create Memories?</h2>
            <p className="text-earth-brown/70 font-sans-alt text-lg mb-4">{service.price}</p>
            <p className="text-earth-brown/60 font-sans-alt mb-8">Contact me for a personalized quote and to check availability.</p>
            <Button href="/#contact" variant="outline" className="border-soft-white text-soft-white hover:bg-soft-white hover:text-warm-black">
              Book Your Session
            </Button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
