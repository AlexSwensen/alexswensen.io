import { getAllPosts } from '@/lib/posts';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';
import { Calendar, Clock, User } from 'lucide-react';

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
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Blog</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Thoughts and writings on software development, technology, and more.
          </p>
        </header>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group"
              aria-label={`Read article: ${post.title}`}
            >
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50 hover:border-border">
                {post.image && (
                  <div className="relative w-full h-40 md:h-48 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                )}
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      {formatReadingTime(calculateReadingTime(post.content || post.excerpt))}
                    </div>
                  </div>
                  <CardTitle className="text-lg md:text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-sm md:text-base mb-4 line-clamp-3">
                    {post.excerpt}
                  </CardDescription>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <User className="h-4 w-4" aria-hidden="true" />
                      <span>Alexander Swensen</span>
                    </div>
                  </div>

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {posts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
