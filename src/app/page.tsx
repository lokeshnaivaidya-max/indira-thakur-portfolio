import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Stats from '@/components/sections/Stats';
import Services from '@/components/sections/Services';
import GalleryPreview from '@/components/sections/GalleryPreview';
import Journey from '@/components/sections/Journey';
import WhyChooseMe from '@/components/sections/WhyChooseMe';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import GoogleReviews from '@/components/sections/GoogleReviews';
import InstagramFeed from '@/components/sections/InstagramFeed';
import FAQ from '@/components/sections/FAQ';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Services />
      <GalleryPreview />
      <Journey />
      <WhyChooseMe />
      <Process />
      <Testimonials />
      <GoogleReviews />
      <InstagramFeed />
      <FAQ />
      <Contact />
      <Footer />
    </>
  );
}
