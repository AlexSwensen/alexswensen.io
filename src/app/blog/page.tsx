import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | Alexander Swensen',
  description: 'Thoughts and writings on software development, technology, and more.',
};

export const revalidate = 3600;

const POSTS_PER_PAGE = 6;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const allPosts = await getAllPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
  const posts = allPosts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  return (
    <div className="container mx-auto px-6 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group border rounded-lg overflow-hidden hover:shadow-lg hover:border-blue-500 transition-all duration-200"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              {post.image && (
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-5">
                <time className="text-xs text-gray-500 dark:text-gray-400 mb-2 block">
                  {formatDate(post.date)}
                </time>
                <h2 className="text-lg font-semibold mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300"
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

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-10" aria-label="Pagination">
          {currentPage > 1 ? (
            <Link
              href={`/blog?page=${currentPage - 1}`}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              ← Previous
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-md border text-sm font-medium opacity-40 cursor-not-allowed">
              ← Previous
            </span>
          )}

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <Link
                key={pageNum}
                href={`/blog?page=${pageNum}`}
                className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
                  pageNum === currentPage
                    ? 'bg-blue-600 text-white'
                    : 'border hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-current={pageNum === currentPage ? 'page' : undefined}
              >
                {pageNum}
              </Link>
            ))}
          </div>

          {currentPage < totalPages ? (
            <Link
              href={`/blog?page=${currentPage + 1}`}
              className="px-4 py-2 rounded-md border text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Next →
            </Link>
          ) : (
            <span className="px-4 py-2 rounded-md border text-sm font-medium opacity-40 cursor-not-allowed">
              Next →
            </span>
          )}
        </nav>
      )}
    </div>
  );
}
