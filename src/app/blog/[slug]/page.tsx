import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const ogImage = post.image || '/images/default-og.png'; // Fallback OG image

  return {
    title: `${post.title} | Alexander Swensen`,
    description: post.excerpt,
    authors: [{ name: 'Alexander Swensen' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `https://alexswensen.io/blog/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
      creator: '@alexswensen_', // Replace with your Twitter handle
    },
    alternates: {
      canonical: `https://alexswensen.io/blog/${slug}`,
    },
    keywords: post.tags,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back navigation */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 
                       dark:hover:text-gray-100 transition-colors group"
          >
            <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
            Back to blog
          </Link>
        </div>

        <article className="prose prose-gray dark:prose-invert max-w-none">
          {post.image && (
            <div className="relative w-full h-64 md:h-80 mb-8 rounded-xl overflow-hidden shadow-lg">
              <Image
                src={post.image}
                alt={post.title}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          )}

          <header className="mb-8 not-prose">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">{post.title}</h1>

            <div
              className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 
                          mb-6 pb-6 border-b border-gray-200 dark:border-gray-700"
            >
              <time dateTime={post.date} className="font-medium">
                {formatDate(post.date)}
              </time>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full
                               text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {post.excerpt && (
              <p
                className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8 
                           border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic"
              >
                {post.excerpt}
              </p>
            )}
          </header>

          <div className="prose-lg">
            <Markdown content={post.content} />
          </div>
        </article>

        {/* Footer navigation */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 
                         dark:hover:text-gray-100 transition-colors group"
            >
              <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span>
              All posts
            </Link>

            <div className="text-sm text-gray-500 dark:text-gray-400">
              Published {formatDate(post.date)}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
