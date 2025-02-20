import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';

export interface Post {
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  slug: string;
  content: string;
  image?: string;
}

export const getAllPosts = cache(async () => {
  const postsDirectory = path.join(process.cwd(), 'posts');
  const files = await fs.readdir(postsDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === '.md')
      .map(async (file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContent = await fs.readFile(filePath, 'utf8');
        const { data, content } = matter(fileContent);

        return {
          ...data,
          slug: path.basename(file, '.md'),
          content,
        } as Post;
      })
  );

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
} 