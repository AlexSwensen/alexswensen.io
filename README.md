# alexswensen.io

This is the source code for my personal website, [alexswensen.io](https://alexswensen.io). It is built using [SvelteKit](https://kit.svelte.dev/).

## Development

**Just a quick note to get started, the default password for most of this project is `L3tM3In!`.**

This is intentional for easy local development and pull requests.
> An easy way to remember is to think of the phrase "Let me in!" but with the `e` replaced with `3`.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or later)
- [pnpm](https://pnpm.io/) (v8 or later)
- [Docker](https://www.docker.com/) (v25 or later)

### Getting started

1. Clone the repository
2. Install the dependencies
3. Start the development server

```bash
docker compose up -d
pnpm install
pnpm run dev
```

### Shutting down the development server

When you're done working on the project,
you can shut down the development server with the following command:

```bash
docker compose down
```


# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
pnpm create svelte@latest

# create a new project in my-app
pnpm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `pnpm install` (or `pnpm install` or `yarn`), start a development server:

```bash
pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
pnpm run build
```

You can preview the production build with `pnpm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
