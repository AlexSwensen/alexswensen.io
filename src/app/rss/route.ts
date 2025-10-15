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

const generateRssFeed = cache(async () => {
  const posts = await getAllPosts();
  
  const rssItems = await Promise.all(
    posts.map(async (post) => {
      const htmlContent = await markdownToHtml(post.content);
      return `
      <item>
        <title>${escape(post.title)}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${escape(post.excerpt || '')}</description>
        <content:encoded><![CDATA[${htmlContent}]]></content:encoded>
      </item>
    `;
    })
  );

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Alex Swensen Blog</title>
        <link>${siteUrl}/blog</link>
        <description>Latest posts from Alex Swensen</description>
        ${rssItems.join('')}
      </channel>
    </rss>`;

  return rss;
});

export async function GET() {
  const rss = await generateRssFeed();
  
  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
