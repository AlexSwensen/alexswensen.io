import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Markdown } from '@/components/Markdown';
import { CommentSection } from '@/components/CommentSection';
import Image from 'next/image';
import '@/styles/markdown.css';
import { siteConfig } from '@/config/site';
import { JsonLd, blogPostingJsonLd } from '@/lib/structured-data';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-static';
export const revalidate = 3600; // revalidate every hour

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const ogImage = post.image || siteConfig.ogImage;

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt,
    authors: [{ name: siteConfig.name }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
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
      creator: siteConfig.twitterHandle,
    },
    alternates: {
      canonical: `${siteConfig.url}/blog/${slug}`,
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
      <JsonLd data={blogPostingJsonLd(post)} />
      <article className="max-w-4xl mx-auto">
        {post.image && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
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
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <Markdown content={post.content} />
        <CommentSection slug={slug} />
      </article>
    </div>
  );
}
