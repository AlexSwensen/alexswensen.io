<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;

	const datePosted = (date: string) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<svelte:head>
	<title>Alex Swensen's Blog</title>
	<meta name="description" content="Alex Swensen's personal blog" />
	<meta name="keywords" content="Alex Swensen, Alex, Swensen, Blog, Posts, Articles" />
	<meta name="author" content="Alex Swensen" />
	<meta name="robots" content="index, follow" />
	<meta name="googlebot" content="index, follow" />
	<meta name="bingbot" content="index, follow" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
	<meta name="theme-color" content="#000000" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black" />
	<meta name="apple-mobile-web-app-title" content="alexswensen.io" />
	<meta name="application-name" content="alexswensen.io" />
	<meta name="msapplication-TileColor" content="#000000" />
	<meta name="msapplication-TileImage" content="/images/ms-icon-144x144.png" />
	<meta name="msapplication-config" content="/images/browserconfig.xml" />
	<meta name="theme-color" content="#000000" />
	<link rel="apple-touch-icon" sizes="57x57" href="/images" />
	<link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png" />
	<link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
	<link rel="shortcut icon" href="/images/favicon.ico" />
</svelte:head>

<div>
	{#each posts as post}
		<div class="py-4">
			<a class="text-lg font-bold underline hover:text-blue-600" href="/blog/{post.slug}"
				>{post.title}</a
			>
			<P class="pb-2">{datePosted(post.date)}</P>
			<P>{post.excerpt}</P>
		</div>
	{/each}
</div>
