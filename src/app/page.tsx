import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import ContactCTA from '@/components/ContactCTA';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: '%s | Alexander Swensen',
  },
  description: siteConfig.description,
  keywords: [
    'Alexander Swensen',
    'Software Engineer',
    'Full Stack Developer',
    'React',
    'Next.js',
    'TypeScript',
    'AWS',
    'Node.js',
    'Frontend Development',
    'Backend Development',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: '/img/me.jpeg',
        width: 150,
        height: 150,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: siteConfig.twitterHandle,
    images: ['/img/me.jpeg'],
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
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <div className="relative isolate min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(100,100,255,0.15),transparent_50%)]"></div>
      <div className="flex-grow flex flex-col gap-16 py-8 md:py-16">
        <Hero />
        <Skills />
        <ContactCTA />
      </div>
    </div>
  );
}
