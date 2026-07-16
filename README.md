# alexswensen.io

Personal website and blog for Alex Swensen. Built with Next.js (App Router), React 19, Tailwind CSS v4, and TypeScript. Deployed on Vercel.

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/) (for the local database)

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

Fill in the required values:

| Variable | Description |
| --- | --- |
| `POSTGRES_PASSWORD` | Password for the local Postgres container |
| `DATABASE_URL` | Postgres connection string (defaults work for local dev) |
| `BETTER_AUTH_SECRET` | 32+ char secret — generate with `openssl rand -base64 32` |
| `BETTER_AUTH_URL` | Base URL of the app (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | [Google OAuth credentials](https://console.cloud.google.com/) |
| `DISCORD_CLIENT_ID` / `DISCORD_CLIENT_SECRET` | [Discord OAuth credentials](https://discord.com/developers/applications) |

For production, set `DATABASE_URL` to your [Neon](https://neon.tech) connection string and `BETTER_AUTH_URL` to your deployed domain.

### 3. Start the local database

This project uses PostgreSQL via Docker Compose, with a [Neon-compatible WebSocket proxy](https://github.com/neondatabase/wsproxy) so the same `@neondatabase/serverless` driver works locally and in production.

```bash
docker compose up -d
```

| Service | Port | Purpose |
| --- | --- | --- |
| `db` | `5432` | PostgreSQL 18 |
| `neon-proxy` | `4444` | WebSocket proxy (Neon driver compatibility) |

### 4. Run database migrations

```bash
pnpm db:migrate
```

| Command | Description |
| --- | --- |
| `pnpm db:generate` | Generate a new migration file from schema changes |
| `pnpm db:migrate` | Apply pending migrations |
| `pnpm db:push` | Push schema directly to the database (dev only, no migration files) |
| `pnpm db:studio` | Open Drizzle Studio to browse the database |
| `pnpm db:reset` | ⚠️ Drop all tables and clear migration history (requires confirmation) |

Schema files live in `src/db/schema/`. The auth tables (`user`, `session`, `account`, `verification`, `two_factor`) are managed by Better Auth and defined in `src/db/schema/auth.ts`.

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Authentication

Authentication is handled by [Better Auth](https://better-auth.com).

- **Email + password** sign-up and sign-in
- **Google** and **Discord** OAuth
- **Two-factor authentication** (TOTP via authenticator app + one-time backup codes)
- Auth routes live under `/auth/sign-in`, `/auth/sign-up`, and `/auth/two-factor`
- The header shows Sign in / Register when logged out, and the user's name + Sign out when logged in

## Comments

Each blog post has a comment section at `/blog/[slug]`. Authenticated users can post comments. Unauthenticated visitors see a prompt to sign in or register.

Comments API: `GET /api/comments?slug=<slug>` and `POST /api/comments`.

## Storybook

```bash
pnpm storybook        # dev server on :6006
pnpm build-storybook  # production build
```

All components in `src/components` and `src/components/ui` have corresponding `.stories.tsx` files.

## Deploy on Vercel

Push to `main` — Vercel deploys automatically. Set the environment variables listed above in the Vercel project settings.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
