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
  const atomEntries = posts
    .map(
      (post) => `
    <entry>
      <title>${escape(post.title)}</title>
      <link href="${siteUrl}/blog/${post.slug}"/>
      <id>${siteUrl}/blog/${post.slug}</id>
      <updated>${new Date(post.date).toISOString()}</updated>
      <summary>${escape(post.excerpt || '')}</summary>
      <content type="html"><![CDATA[${post.content}]]></content>
    </entry>
    `
    )
    .join('');

  const atom = `<?xml version="1.0" encoding="UTF-8" ?>
  <feed xmlns="http://www.w3.org/2005/Atom">
    <title>Alex Swensen Blog</title>
    <link href="${siteUrl}/atom" rel="self"/>
    <link href="${siteUrl}/blog"/>
    <updated>${new Date().toISOString()}</updated>
    <id>${siteUrl}/blog</id>
    <subtitle>Latest posts from Alex Swensen</subtitle>
    ${atomEntries}
  </feed>`;

  return new NextResponse(atom, {
    headers: {
      'Content-Type': 'application/atom+xml; charset=UTF-8',
    },
  });
}
