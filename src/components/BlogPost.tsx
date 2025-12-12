'use client';

import { Markdown } from '@/components/Markdown';
import Image from 'next/image';
import '@/styles/markdown.css';

export interface BlogPostProps {
  title: string;
  date: string;
  tags: string[];
  content: string;
  image?: string;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogPost({ title, date, tags, content, image }: BlogPostProps) {
  return (
    <div className="container mx-auto px-6 py-8">
      <article className="max-w-4xl mx-auto">
        {image && (
          <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
        )}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={date}>{formatDate(date)}</time>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="text-sm bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </header>
        <Markdown content={content} />
      </article>
    </div>
  );
}
