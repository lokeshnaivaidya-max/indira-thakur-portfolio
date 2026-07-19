import { connectToDatabase } from '@/lib/mongodb';
import SiteConfig from '@/models/SiteConfig';
import ThemeSettings from '@/models/ThemeSettings';
import AppProviders from './AppProviders';

interface ServerData {
  config: any;
  theme: any;
}

async function fetchServerData(): Promise<ServerData> {
  let config = null;
  let theme = null;

  try {
    if (process.env.MONGODB_URI) {
      await connectToDatabase();
      config = await SiteConfig.findOne().lean();
      theme = await ThemeSettings.findOne().lean();
    }
  } catch (error) {
    console.warn('[ServerDataProvider] fetch failed', error);
  }

  return { config, theme };
}

export default async function ServerDataProvider({ children }: { children: React.ReactNode }) {
  console.log('[ServerDataProvider] render');
  const { config, theme } = await fetchServerData();

  return (
    <AppProviders initialConfig={config} initialTheme={theme}>
      {children}
    </AppProviders>
  );
}