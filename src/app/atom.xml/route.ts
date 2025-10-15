import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { cache } from 'react';

const siteUrl = 'https://alexswensen.io';

function escape(str: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return str.replace(/[&<>]/g, (c) => map[c] || c);
}

async function markdownToHtml(markdown: string): Promise<string> {
  const result = await remark().use(remarkGfm).use(html).process(markdown);
  return result.toString();
}

const generateAtomFeed = cache(async () => {
  const posts = await getAllPosts();
  
  const atomEntries = await Promise.all(
    posts.map(async (post) => {
      const htmlContent = await markdownToHtml(post.content);
      return `
    <entry>
      <title>${escape(post.title)}</title>
      <link href="${siteUrl}/blog/${post.slug}"/>
      <id>${siteUrl}/blog/${post.slug}</id>
      <updated>${new Date(post.date).toISOString()}</updated>
      <summary>${escape(post.excerpt || '')}</summary>
      <content type="html"><![CDATA[${htmlContent}]]></content>
    </entry>
    `;
    })
  );

  const atom = `<?xml version="1.0" encoding="UTF-8" ?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Alex Swensen Blog</title>
    <link href="${siteUrl}/atom.xml" rel="self"/>
    <link href="${siteUrl}/blog"/>
    <updated>${new Date().toISOString()}</updated>
    <id>${siteUrl}/blog</id>
    <subtitle>Latest posts from Alex Swensen</subtitle>
    ${atomEntries.join('')}
  </feed>`;

  return atom;
});

export async function GET() {
  const atom = await generateAtomFeed();
  
  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
