'use client';

import { useThemeSettings } from '@/hooks/useThemeSettings';
import { useEffect } from 'react';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useThemeSettings();

  useEffect(() => {
    if (!theme) return;
    const root = document.documentElement;
    root.style.setProperty('--color-primary', theme.primaryColor);
    root.style.setProperty('--color-secondary', theme.secondaryColor);
    root.style.setProperty('--color-accent', theme.accentColor);
    root.style.setProperty('--color-bg', theme.backgroundColor);
    root.style.setProperty('--color-surface', theme.surfaceColor);
    root.style.setProperty('--color-text', theme.textColor);
    root.style.setProperty('--color-muted', theme.mutedTextColor);
    root.style.setProperty('--color-card-bg', theme.cardBackground);
    root.style.setProperty('--color-card-border', theme.cardBorder);
    root.style.setProperty('--radius-card', theme.cardRadius);
    root.style.setProperty('--radius-button', theme.buttonRadius);
    root.style.setProperty('--color-nav-bg', theme.navBackground);
    root.style.setProperty('--color-nav-text', theme.navTextColor);
    root.style.setProperty('--color-footer-bg', theme.footerBackground);
    root.style.setProperty('--color-footer-text', theme.footerTextColor);
  }, [theme]);

  return <>{children}</>;
}
