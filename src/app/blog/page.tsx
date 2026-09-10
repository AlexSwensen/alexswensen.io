import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { JsonLd, blogJsonLd } from '@/lib/structured-data';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Writings from Alexander Swensen on software development, web technologies, and career experiences.',
  openGraph: {
    type: 'website',
    url: `${siteConfig.url}/blog`,
    title: `Blog | ${siteConfig.name}`,
    description:
      'Writings from Alexander Swensen on software development, web technologies, and career experiences.',
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: `${siteConfig.name} Blog` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Blog | ${siteConfig.name}`,
    description:
      'Writings from Alexander Swensen on software development, web technologies, and career experiences.',
    creator: siteConfig.twitterHandle,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate every hour

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-6 py-8">
      <JsonLd data={blogJsonLd(posts)} />
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-8 md:grid-cols-2">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="border rounded-lg overflow-hidden hover:border-blue-500 transition-colors"
          >
            <Link href={`/blog/${post.slug}`}>
              {post.image && (
                <div className="relative w-full h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  />
                </div>
              )}
              <div className="p-6">
                <time className="text-sm text-gray-500 dark:text-gray-400 mb-2 block">
                  {formatDate(post.date)}
                </time>
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm bg-gray-600 dark:bg-gray-800 px-2 py-1 rounded text-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
