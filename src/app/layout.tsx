import type { Metadata } from 'next';
import { GeistSans } from 'geist/font';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getLastMigration } from '@/db';

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata: Metadata = {
  title: {
    template: '%s | Alexander Swensen',
    default: 'Alexander Swensen',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add these if you have them
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lastMigration = await getLastMigration();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          {lastMigration && (
            <p className="text-center py-2 text-xs text-muted-foreground/60">
              Last DB deployment: <code className="font-mono">{lastMigration.hash}</code>
              {' · '}
              {lastMigration.appliedAt}
            </p>
          )}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
