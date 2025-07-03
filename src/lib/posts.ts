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

export interface PaginatedPosts {
  posts: Post[];
  totalPages: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
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

export const getPaginatedPosts = cache(
  async (page: number = 1, postsPerPage: number = 6): Promise<PaginatedPosts> => {
    const allPosts = await getAllPosts();
    const totalPages = Math.ceil(allPosts.length / postsPerPage);
    const startIndex = (page - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const posts = allPosts.slice(startIndex, endIndex);

    return {
      posts,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };
  }
);

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
