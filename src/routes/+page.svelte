<script lang="ts">
	import { Alert, Heading, Hr, List, P } from 'flowbite-svelte';
	import Hero from '$lib/components/Hero/Hero.svelte';
	import Skills from '$lib/components/Skills/Skills.svelte';
	import CompanyCarousel from '$lib/components/CompanyCarousel/CompanyCarousel.svelte';
</script>

<svelte:head>
	<title>alexswensen.io Home</title>
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
</svelte:head>
<div class="bg-gray-900">
	<Hero />
	<Skills />
	<!-- <CompanyCarousel /> -->
</div>
