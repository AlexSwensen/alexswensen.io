import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import { getServerSession } from 'next-auth';
import type { Metadata } from 'next';

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
  const session = await getServerSession();

  return (
    <div className="flex flex-col gap-16 py-8 md:py-16 w-full">
      {session?.user && (
        <div className="text-center">
          <p>Welcome, {session.user.name || session.user.email}!</p>
        </div>
      )}
      <Hero />
      <Skills />
    </div>
  );
}
