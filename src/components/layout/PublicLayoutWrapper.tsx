'use client';

import { usePathname } from 'next/navigation';
import FloatingNavbar from './FloatingNavbar';
import LuxuryFooter from './LuxuryFooter';
import PageTransition from '@/components/premium/PageTransition';
import { AnimatePresence } from 'framer-motion';

export default function PublicLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <FloatingNavbar />
      <main className="min-h-screen flex flex-col">
        <AnimatePresence mode="wait">
          <PageTransition key={pathname}>
            {children}
          </PageTransition>
        </AnimatePresence>
      </main>
      <LuxuryFooter />
    </>
  );
}


