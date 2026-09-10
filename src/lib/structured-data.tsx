import { siteConfig } from '@/config/site';
import { resumeData } from '@/data/resume-data';
import type { Post } from '@/lib/posts';

/** Renders a JSON-LD object as a safe inline <script> tag. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escape "<" so a malicious/unexpected value can't close the script tag early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}

const sameAs = [`https://${resumeData.contact.linkedin}`, `https://${resumeData.contact.github}`];

/** Compact Person schema for site-wide use (header/footer, every page). */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.name,
    jobTitle: resumeData.title,
    description: resumeData.bio,
    url: siteConfig.url,
    image: `${siteConfig.url}/img/me.jpeg`,
    sameAs,
  };
}

/** Detailed Person schema (work history, education, skills) for the resume page. */
export function personDetailedJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: resumeData.name,
    jobTitle: resumeData.title,
    description: resumeData.bio,
    url: siteConfig.url,
    image: `${siteConfig.url}/img/me.jpeg`,
    email: `mailto:${resumeData.contact.email}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: resumeData.contact.location,
    },
    sameAs,
    knowsAbout: resumeData.skills,
    worksFor: resumeData.workExperience
      .filter((job) => job.endDate === 'Present')
      .map((job) => ({
        '@type': 'Organization',
        name: job.company,
      })),
    alumniOf: resumeData.education.map((edu) => ({
      '@type': 'EducationalOrganization',
      name: edu.institution,
    })),
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    author: { '@type': 'Person', name: resumeData.name },
  };
}

export function blogPostingJsonLd(post: Post) {
  const image = post.image
    ? `${siteConfig.url}${post.image}`
    : `${siteConfig.url}${siteConfig.ogImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image,
    datePublished: post.date,
    dateModified: post.date,
    keywords: post.tags,
    author: { '@type': 'Person', name: resumeData.name, url: siteConfig.url },
    publisher: { '@type': 'Person', name: resumeData.name },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteConfig.url}/blog/${post.slug}`,
    },
  };
}

export function blogJsonLd(posts: Post[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: `${siteConfig.name} Blog`,
    url: `${siteConfig.url}/blog`,
    author: { '@type': 'Person', name: resumeData.name },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      url: `${siteConfig.url}/blog/${post.slug}`,
      datePublished: post.date,
    })),
  };
}
