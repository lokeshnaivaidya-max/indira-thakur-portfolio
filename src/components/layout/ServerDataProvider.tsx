import { connectToDatabase } from '@/lib/mongodb';
import SiteConfig from '@/models/SiteConfig';
import ThemeSettings from '@/models/ThemeSettings';
import BrandSettings from '@/models/BrandSettings';
import AppProviders from './AppProviders';

interface ServerData {
  config: any;
  theme: any;
  brand: any;
}

async function fetchServerData(): Promise<ServerData> {
  let config = null;
  let theme = null;
  let brand = null;

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      config = await SiteConfig.findOne().lean();
      theme = await ThemeSettings.findOne().lean();
      brand = await BrandSettings.findOne().lean();
    }
  } catch (error) {
    console.warn('[ServerDataProvider] fetch failed', error);
  }

  return { config, theme, brand };
}

export default async function ServerDataProvider({ children }: { children: React.ReactNode }) {
  console.log('[ServerDataProvider] render');
  const { config, theme, brand } = await fetchServerData();

  const mergedConfig = config
    ? { ...config, brand: brand || config.brand || {} }
    : (brand ? { brand } : null);

  return (
    <AppProviders initialConfig={mergedConfig} initialTheme={theme} initialBrand={brand}>
      {children}
    </AppProviders>
  );
}