import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import ContactCTA from '@/components/ContactCTA';
import type { Metadata } from 'next';
import { auth } from '@/auth';
import { SignOut } from '@/components/auth/signout-button';

export const metadata: Metadata = {
  title: {
    default: 'Alexander Swensen | Software Engineer',
    template: '%s | Alexander Swensen',
  },
  description:
    'Software Engineer specializing in full-stack development with expertise in React, Next.js, AWS, and modern web technologies.',
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
  authors: [{ name: 'Alexander Swensen' }],
  creator: 'Alexander Swensen',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alexswensen.io',
    title: 'Alexander Swensen | Software Engineer',
    description:
      'Software Engineer specializing in full-stack development with expertise in React, Next.js, AWS, and modern web technologies.',
    siteName: 'Alexander Swensen Portfolio',
    images: [
      {
        url: '/img/me.jpeg',
        width: 150,
        height: 150,
        alt: 'Alexander Swensen',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Alexander Swensen | Software Engineer',
    description:
      'Software Engineer specializing in full-stack development with expertise in React, Next.js, AWS, and modern web technologies.',
    creator: '@alexswensen_',
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
  metadataBase: new URL('https://alexswensen.io'),
  verification: {
    // Add these if you have them
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
  },
  alternates: {
    canonical: '/',
  },
};

export default async function Home() {
  const session = await auth();
  return (
    <div className="relative isolate min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_50%,rgba(79,70,229,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_50%,rgba(100,100,255,0.15),transparent_50%)]"></div>
      <div className="flex-grow flex flex-col gap-16 py-8 md:py-16">
        <Hero />
        <Skills />
        <ContactCTA />
        {session && <SignOut />}
        {/* {session && <p>signed in as {session?.user?.email}</p>} */}
      </div>
    </div>
  );
}
