<script>
	import '../app.scss';
	import Nav from '../lib/components/Nav/Nav.svelte';
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
<div class="p-6 text-black dark:text-white dark:bg-black h-full md:p-10">
	<slot />
</div>
