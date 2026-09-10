import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
import { resumeData } from '@/data/resume-data';
import { JsonLd, personDetailedJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Resume',
  description: resumeData.bio,
  openGraph: {
    type: 'profile',
    url: `${siteConfig.url}/resume`,
    title: `Resume | ${siteConfig.name}`,
    description: resumeData.bio,
    siteName: siteConfig.name,
    images: [{ url: '/img/me.jpeg', width: 150, height: 150, alt: siteConfig.name }],
  },
  twitter: {
    card: 'summary',
    title: `Resume | ${siteConfig.name}`,
    description: resumeData.bio,
    creator: siteConfig.twitterHandle,
    images: ['/img/me.jpeg'],
  },
  alternates: {
    canonical: `${siteConfig.url}/resume`,
  },
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={personDetailedJsonLd()} />
      {children}
    </>
  );
}
