import Hero from '@/components/sections/Hero';
import FAQ from '@/components/sections/FAQ';

export const metadata = {
  title: 'Home',
};

export default function Home() {
  return (
    <>
      <Hero />
      <FAQ />
    </>
  );
}
