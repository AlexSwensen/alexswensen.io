'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';

interface Comment {
  id: string;
  authorName: string;
  body: string;
  createdAt: string;
}

interface Props {
  slug: string;
}

export function CommentSection({ slug }: Props) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/comments?slug=${encodeURIComponent(slug)}`)
      .then((r) => r.json())
      .then((data: Comment[]) => setComments(data))
      .catch(() => {});
  }, [slug]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setError('');
    setSubmitting(true);

    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, body }),
    });

    if (res.ok) {
      const newComment: Comment = await res.json();
      setComments((prev) => [...prev, newComment]);
      setBody('');
    } else {
      const data = await res.json().catch(() => ({}));
      setError((data as { error?: string }).error ?? 'Failed to post comment.');
    }

    setSubmitting(false);
  }

  return (
    <section className="mt-12 border-t pt-10">
      <h2 className="text-2xl font-bold mb-6">Comments</h2>

      {/* Existing comments */}
      {comments.length > 0 ? (
        <ul className="space-y-6 mb-8">
          {comments.map((c) => (
            <li key={c.id} className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">{c.authorName}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(c.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{c.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground text-sm mb-8">No comments yet. Be the first!</p>
      )}

      {/* Comment form or sign-in prompt */}
      {session?.user ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Commenting as <span className="font-medium text-foreground">{session.user.name}</span>
          </p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment…"
            rows={4}
            maxLength={2000}
            required
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-ring resize-none"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !body.trim()}
            className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm font-medium shadow hover:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
          >
            {submitting ? 'Posting…' : 'Post comment'}
          </button>
        </form>
      ) : (
        <div className="rounded-lg border bg-muted/40 px-6 py-5 text-sm">
          <p className="text-muted-foreground">
            Want to join the discussion?{' '}
            <Link
              href="/auth/sign-in"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              Sign in
            </Link>{' '}
            or{' '}
            <Link
              href="/auth/sign-up"
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            >
              create a free account
            </Link>{' '}
            to leave a comment.
          </p>
        </div>
      )}
    </section>
  );
}
