import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Alexander Swensen',
  description: 'Thoughts and writings on software development, technology, and more.',
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
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Thoughts and writings on software development, technology, and more.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden 
                         hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-lg 
                         transition-all duration-300 hover:scale-[1.02] bg-white dark:bg-gray-900"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                {post.image && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                    />
                  </div>
                )}
                <div className="p-6">
                  <time className="text-sm text-gray-500 dark:text-gray-400 mb-3 block">
                    {formatDate(post.date)}
                  </time>
                  <h2
                    className="text-xl font-semibold mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 
                                 transition-colors truncate"
                  >
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 
                                     dark:hover:bg-gray-700 px-3 py-1 rounded-full text-gray-700 
                                     dark:text-gray-300 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 3 && (
                        <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                          +{post.tags.length - 3} more
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-gray-500 dark:text-gray-400">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
