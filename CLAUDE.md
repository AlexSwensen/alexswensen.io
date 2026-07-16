# alexswensen.io

Personal website and blog for Alex Swensen. Built with Next.js (App Router), React 19, Tailwind CSS v4, and TypeScript. Deployed on Vercel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| UI | React 19, Tailwind CSS v4, shadcn/ui (Radix primitives) |
| Database ORM | Drizzle ORM |
| Database (prod) | Neon (serverless Postgres) |
| Database (local dev) | Vanilla Postgres via Docker |
| Animations | Motion (Framer Motion) |
| Blog content | Markdown files in `posts/` with gray-matter front-matter |
| Testing | Playwright (E2E) |
| Component dev | Storybook 10 |
| Deployment | Vercel (with Vercel Analytics + Speed Insights) |

## Project Structure

```
posts/          # Markdown blog posts (front-matter: title, excerpt, date, tags, image)
src/
  app/          # Next.js App Router pages and route handlers
  components/   # Shared React components (shadcn/ui + custom)
  config/       # Site-wide config (site.ts)
  data/         # Static data (resume-data.ts)
  db/           # Drizzle client and schema
  lib/          # Utilities (posts.ts reads/parses markdown, utils.ts)
  styles/       # Global and markdown CSS
stories/        # Storybook stories mirroring src/components/
tests/          # Playwright E2E tests
drizzle/        # Drizzle migration SQL files and meta snapshots
```

## Database Setup

The project uses **Drizzle ORM** with the **Neon serverless driver** (`@neondatabase/serverless`). The driver communicates over WebSockets, which lets it work in Vercel's Edge/serverless runtime.

### Important: fully vanilla Postgres compatible

Although the Neon driver is used, the schema and all queries are standard PostgreSQL — no Neon-specific extensions or APIs are used. In local development the Neon driver is transparently proxied to a plain Postgres container via a WebSocket proxy (`neon-proxy`). This means:

- You can swap `DATABASE_URL` to point at any standard Postgres instance.
- `drizzle-kit` CLI commands (`db:generate`, `db:migrate`, `db:push`, `db:studio`) use a direct TCP connection to Postgres, not the WebSocket proxy.
- The singleton `Pool` in `src/db/index.ts` is re-used across Next.js hot reloads to prevent connection exhaustion.

### Local dev database

Start the stack with Docker Compose:

```bash
docker compose up -d
```

This starts two services:
- **`db`** — `postgres:18-alpine` on port `5432`
- **`neon-proxy`** — Neon's open-source `wsproxy` on port `4444`, forwarding WebSocket connections from the app to `db:5432`

Copy `.env.example` to `.env` and fill in `POSTGRES_PASSWORD` at minimum.

### Schema

| Table | Key columns |
|---|---|
| `users` | `id` (uuid PK), `name`, `email` (unique) |
| `comments` | `id` (uuid PK), `postSlug`, `userId` (FK → users), `authorName`, `authorEmail`, `body`, `approved`, `createdAt` |

### Drizzle commands

```bash
pnpm db:generate   # generate a new migration from schema changes
pnpm db:migrate    # apply pending migrations
pnpm db:push       # push schema directly (no migration file, dev only)
pnpm db:studio     # open Drizzle Studio UI
```

## Blog System

Posts are Markdown files in `posts/`. Each file has YAML front-matter:

```md
---
title: Post Title
excerpt: Short description
date: YYYY-MM-DD
tags: [tag1, tag2]
image: /img/post-banners/image.png  # optional
---
```

`src/lib/posts.ts` reads all `.md` files at build time using React's `cache()` for deduplication. The slug is derived from the filename (minus extension). The blog renders at `/blog` and `/blog/[slug]`.

## Development Commands

```bash
pnpm dev              # Next.js dev server (Turbopack)
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint
pnpm format           # Prettier
pnpm storybook        # Storybook dev server on :6006
pnpm test:e2e         # Playwright tests (headless)
pnpm test:e2e:ui      # Playwright tests (UI mode)
```

## Environment Variables

See `.env.example`:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=app
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/app
```

`DATABASE_URL` is the only variable consumed by the app at runtime. In production it points to the Neon connection string.
