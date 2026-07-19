'use client';

import { useState, useEffect } from 'react';

let cachedTheme: any = null;
let fetchPromise: Promise<any> | null = null;

export function useThemeSettings() {
  const [theme, setTheme] = useState(cachedTheme);
  const [loading, setLoading] = useState(!cachedTheme);

  useEffect(() => {
    if (cachedTheme) {
      setTheme(cachedTheme);
      setLoading(false);
      return;
    }

    const fetchTheme = async () => {
      try {
        if (!fetchPromise) {
          fetchPromise = fetch('/api/theme').then(r => r.ok ? r.json() : null);
        }
        const data = await fetchPromise;
        if (data) {
          cachedTheme = data;
          setTheme(data);
        }
      } catch {
        // use defaults
      } finally {
        setLoading(false);
      }
    };

    fetchTheme();
  }, []);

  return { theme, loading };
}
