'use client';

import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/Footer';
import { HiArrowLeft } from 'react-icons/hi2';

const servicesData: Record<string, { title: string; description: string; heroGradient: string; benefits: string[]; price: string }> = {};

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
