import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Alexander Swensen',
  description: 'Thoughts and writings on software development, technology, and more.',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.slug} className="border rounded-lg p-6 hover:border-primary transition-colors">
            <a href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="text-sm bg-secondary px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          </article>
        ))}
      </div>
    </div>
  );
} 