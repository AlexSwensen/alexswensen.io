This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Setup pnpm:

```bash
curl -fsSL https://pnpm.io/install.sh | sh
```

Install dependencies:

```bash
pnpm install
```

First, run the development server:

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

## Linktree Clone (React + NestJS)

This repository now includes:

- A server-rendered React linktree page in Next.js at `/links/:username`
- A NestJS API in `/apps/api` with SQLite persistence and analytics tracking

### Run the API

```bash
pnpm dev:api
```

The API runs on `http://localhost:4000` by default and seeds a default profile at `alex`.

### Run the web app

```bash
pnpm dev
```

### Environment variables

- `LINKTREE_API_URL` (server-side Next.js fetch base URL)
- `NEXT_PUBLIC_LINKTREE_API_URL` (client-side analytics POST base URL)
- `LINKTREE_WEB_ORIGIN` (CORS origin for NestJS API)
- `LINKTREE_DB_PATH` (SQLite path for NestJS API, defaults to `data/linktree.sqlite`)

### Routes

- Linktree page: `http://localhost:3000/links/alex`
- Analytics dashboard: `http://localhost:3000/links/alex/analytics`
- API profile endpoint: `GET http://localhost:4000/profiles/alex`
- API analytics endpoint: `POST http://localhost:4000/analytics/events`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
