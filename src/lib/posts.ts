import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import { cache } from 'react';
import { z } from 'zod';

const PostFrontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
  image: z.string().optional(),
});

const PostSchema = PostFrontmatterSchema.extend({
  slug: z.string(),
  content: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

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

        return PostSchema.parse({
          ...data,
          slug: path.basename(file, '.md'),
          content,
        });
      })
  );

  // Sort posts by date
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
});

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug);
}
