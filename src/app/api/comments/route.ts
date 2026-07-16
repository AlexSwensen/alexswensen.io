import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { db } from '@/db';
import { commentsTable } from '@/db/schema';
import { eq, asc } from 'drizzle-orm';

// GET /api/comments?slug=<postSlug>
export async function GET(request: NextRequest) {
  const slug = request.nextUrl.searchParams.get('slug');
  if (!slug) {
    return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
  }

  const comments = await db
    .select()
    .from(commentsTable)
    .where(eq(commentsTable.postSlug, slug))
    .orderBy(asc(commentsTable.createdAt));

  return NextResponse.json(comments);
}

// POST /api/comments
export async function POST(request: NextRequest) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { slug?: string; body?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const slug = typeof body.slug === 'string' ? body.slug.trim() : '';
  const commentBody = typeof body.body === 'string' ? body.body.trim() : '';

  if (!slug || !commentBody) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (commentBody.length > 2000) {
    return NextResponse.json({ error: 'Comment too long (max 2000 chars)' }, { status: 422 });
  }

  const [comment] = await db
    .insert(commentsTable)
    .values({
      postSlug: slug,
      userId: session.user.id,
      authorName: session.user.name,
      body: commentBody,
      approved: true,
    })
    .returning();

  return NextResponse.json(comment, { status: 201 });
}
