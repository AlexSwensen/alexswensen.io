This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Prerequisites

- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/) (for the local database)

```bash
curl -fsSL https://pnpm.io/install.sh | sh
```

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

The defaults in `.env.example` work out of the box for local development. For production, set `DATABASE_URL` to your [Neon](https://neon.tech) connection string.

### 3. Start the local database

This project uses PostgreSQL via Docker Compose, with a [Neon-compatible WebSocket proxy](https://github.com/neondatabase/wsproxy) so the same `@neondatabase/serverless` driver works locally and in production.

```bash
docker compose up -d
```

| Service      | Port   | Purpose                                     |
| ------------ | ------ | ------------------------------------------- |
| `db`         | `5432` | PostgreSQL 18                               |
| `neon-proxy` | `4444` | WebSocket proxy (Neon driver compatibility) |

### 4. Run database migrations

```bash
pnpm db:migrate
```

| Command            | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `pnpm db:generate` | Generate a new migration file from schema changes                   |
| `pnpm db:migrate`  | Apply pending migrations                                            |
| `pnpm db:push`     | Push schema directly to the database (dev only, no migration files) |
| `pnpm db:studio`   | Open Drizzle Studio to browse the database                          |

Schema files live in `src/db/schema/`. Add a new file per domain and re-export it from `src/db/schema/index.ts`.

### 5. Start the development server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Storybook

This project includes Storybook for component development and documentation.

To run Storybook:

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to view the component library.

To build Storybook for production:

```bash
pnpm build-storybook
```

All components in `src/components` and `src/components/ui` have corresponding `.stories.tsx` files for documentation and interactive testing.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
