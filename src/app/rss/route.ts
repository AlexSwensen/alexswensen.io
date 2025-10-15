import { getAllPosts } from '@/lib/posts';
import { NextResponse } from 'next/server';

const siteUrl = 'https://alexswensen.io';

function escape(str: string) {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
  };
  return str.replace(/[&<>]/g, (c) => map[c] || c);
}

export async function GET() {
  const posts = await getAllPosts();
  const rssItems = posts
    .map(
      (post) => `
      <item>
        <title>${escape(post.title)}</title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description>${escape(post.excerpt || '')}</description>
        <content:encoded><![CDATA[${post.content}]]></content:encoded>
      </item>
    `
    )
    .join('');

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/">
      <channel>
        <title>Alex Swensen Blog</title>
        <link>${siteUrl}/blog</link>
        <description>Latest posts from Alex Swensen</description>
        ${rssItems}
      </channel>
    </rss>`;

  return new NextResponse(rss, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=UTF-8',
    },
  });
}
