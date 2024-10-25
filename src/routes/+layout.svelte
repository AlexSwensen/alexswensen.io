<script>
	import '../app.scss';
	import Nav from '../lib/components/Nav/Nav.svelte';
	import Footer from '../lib/components/Footer/Footer.svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	/**
	 * @typedef {Object} Props
	 * @property {import('svelte').Snippet} [children]
	 */

	/** @type {Props} */
	let { children } = $props();
	inject({ mode: dev ? 'development' : 'production' });
</script>

<svelte:head>
	<title>alexswensen.io</title>
	<meta name="description" content="Alex Swensen's personal website" />
	<meta
		name="keywords"
		content="Alex Swensen, Alex, Swensen, Software, Developer, Engineer, Programmer, Web, Fullstack, Full, Stack, JavaScript, TypeScript, Svelte, Sapper, Node, Express, MongoDB, PostgreSQL, MySQL, SQLite, GraphQL, REST, API, HTML, CSS, SCSS, Tailwind, TailwindCSS, Bootstrap, Flowbite, FlowbiteSvelte, Flowbite-Svelte, Flowbite-Svelte-Components, Flowbite-Svelte-UI, UI, UX, User, Interface, Experience, Design, Designer, Web, Website, App, Application, Development, Developer, Engineer, Programmer, Software, Computer, Science, ComputerScience, Computer-Science, Computer-Engineering, ComputerEngineering, Computer-Information, ComputerInformation, Information, Technology, IT, Tech, Technology, Code, Coding, Programming, Software, Development, Engineer, Engineering, Computer, Science, ComputerScience, Computer-Science, Computer-Engineering, ComputerEngineering, Computer-Information, ComputerInformation, Information, Technology, IT, Tech, Technology, Code, Coding, Programming, Software, Development, Engineer, Engineering"
	/>
	<meta name="author" content="Alex Swensen" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="alexswensen.io" />
	<meta name="application-name" content="alexswensen.io" />
	<meta name="msapplication-TileColor" content="#000000" />
	<meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
	<meta name="msapplication-config" content="/images/browserconfig.xml" />
	<meta name="theme-color" content="#000000" />
	<link rel="apple-touch-icon" sizes="57x57" href="/images" />
</svelte:head>

<Nav />
<div class="mx-auto h-full max-w-4xl px-6 py-6 text-black dark:text-white md:py-10 lg:px-0">
	{@render children?.()}
	<Footer />
</div>
