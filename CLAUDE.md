# alexswensen.io

Personal website and blog for Alex Swensen. Built with Next.js (App Router), React 19, Tailwind CSS v4, and TypeScript. Deployed on Vercel.

## Tech Stack

| Layer                | Technology                                               |
| -------------------- | -------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, Turbopack)                       |
| UI                   | React 19, Tailwind CSS v4, shadcn/ui (Radix primitives)  |
| Auth                 | Better Auth (email+password, Google, Discord, TOTP 2FA)  |
| Database ORM         | Drizzle ORM                                              |
| Database (prod)      | Neon (serverless Postgres)                               |
| Database (local dev) | Vanilla Postgres via Docker                              |
| Animations           | Motion (Framer Motion)                                   |
| Blog content         | Markdown files in `posts/` with gray-matter front-matter |
| Testing              | Playwright (E2E)                                         |
| Component dev        | Storybook 10                                             |
| Deployment           | Vercel (with Vercel Analytics + Speed Insights)          |

## Project Structure

```
posts/          # Markdown blog posts (front-matter: title, excerpt, date, tags, image)
scripts/        # Utility scripts (db-reset.mjs)
src/
  app/          # Next.js App Router pages and route handlers
    api/
      auth/[...all]/   # Better Auth catch-all handler
      comments/        # GET + POST comments API
    auth/              # Sign-in, sign-up, two-factor pages
    blog/[slug]/       # Blog post page (includes CommentSection)
  components/   # Shared React components (shadcn/ui + custom)
  config/       # Site-wide config (site.ts)
  data/         # Static data (resume-data.ts)
  db/           # Drizzle client (index.ts) and schema/
    schema/
      auth.ts          # Better Auth tables (user, session, account, verification, two_factor)
      comments.ts      # comments table (FK → user.id)
      index.ts         # re-exports all schema
  lib/          # Utilities
    auth.ts            # Better Auth server instance (server-only)
    auth-client.ts     # Better Auth browser client
    posts.ts           # Reads/parses markdown posts
    utils.ts
  styles/       # Global and markdown CSS
stories/        # Storybook stories mirroring src/components/
tests/          # Playwright E2E tests
drizzle/        # Drizzle migration SQL files and meta snapshots
```

## Authentication

Authentication is handled by [Better Auth](https://better-auth.com).

- Server instance: `src/lib/auth.ts` — imports `server-only`, uses the Drizzle adapter against the shared `db` pool
- Client instance: `src/lib/auth-client.ts` — `createAuthClient` from `better-auth/react` with `twoFactorClient` plugin
- API handler: `src/app/api/auth/[...all]/route.ts` — `toNextJsHandler(auth)`

Enabled features:

- Email + password
- Google OAuth (`GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`)
- Discord OAuth (`DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET`)
- TOTP two-factor authentication with backup codes (`twoFactor()` plugin)

## Comments

Each blog post page includes `<CommentSection slug={slug} />` (client component in `src/components/CommentSection.tsx`). It fetches from `GET /api/comments?slug=<slug>` and posts to `POST /api/comments`. POST requires a valid Better Auth session (checked via `auth.api.getSession`). Unauthenticated visitors see a sign-in/register prompt instead of the form.

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

Copy `.env.example` to `.env` and fill in the required values.

### Schema

| Table          | Key columns                                                                                     |
| -------------- | ----------------------------------------------------------------------------------------------- |
| `user`         | `id` (text PK), `name`, `email` (unique), `emailVerified`, `image`, `twoFactorEnabled`          |
| `session`      | `id` (text PK), `token` (unique), `userId` (FK → user), `expiresAt`                             |
| `account`      | `id` (text PK), `providerId`, `accountId`, `userId` (FK → user)                                 |
| `verification` | `id` (text PK), `identifier`, `value`, `expiresAt`                                              |
| `two_factor`   | `id` (text PK), `secret`, `backupCodes`, `userId` (FK → user)                                   |
| `comments`     | `id` (uuid PK), `postSlug`, `userId` (FK → user), `authorName`, `body`, `approved`, `createdAt` |

### Drizzle commands

```bash
pnpm db:generate   # generate a new migration from schema changes
pnpm db:migrate    # apply pending migrations
pnpm db:push       # push schema directly (no migration file, dev only)
pnpm db:studio     # open Drizzle Studio UI
pnpm db:reset      # ⚠️ drop ALL tables + drizzle schema (prompts for confirmation)
```

## Blog System

Posts are Markdown files in `posts/`. Each file has YAML front-matter:

```md
---
title: Post Title
excerpt: Short description
date: YYYY-MM-DD
tags: [tag1, tag2]
image: /img/post-banners/image.png # optional
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

BETTER_AUTH_SECRET=          # openssl rand -base64 32
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=
```

`DATABASE_URL` and the `BETTER_AUTH_*` variables are consumed by the app at runtime. The OAuth variables are only needed if you want social sign-in to work.

## Tech Stack

| Layer                | Technology                                               |
| -------------------- | -------------------------------------------------------- |
| Framework            | Next.js 16 (App Router, Turbopack)                       |
| UI                   | React 19, Tailwind CSS v4, shadcn/ui (Radix primitives)  |
| Database ORM         | Drizzle ORM                                              |
| Database (prod)      | Neon (serverless Postgres)                               |
| Database (local dev) | Vanilla Postgres via Docker                              |
| Animations           | Motion (Framer Motion)                                   |
| Blog content         | Markdown files in `posts/` with gray-matter front-matter |
| Testing              | Playwright (E2E)                                         |
| Component dev        | Storybook 10                                             |
| Deployment           | Vercel (with Vercel Analytics + Speed Insights)          |

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

| Table      | Key columns                                                                                                     |
| ---------- | --------------------------------------------------------------------------------------------------------------- |
| `users`    | `id` (uuid PK), `name`, `email` (unique)                                                                        |
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
image: /img/post-banners/image.png # optional
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
