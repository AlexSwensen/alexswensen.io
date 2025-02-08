<script lang="ts">
	import { Heading, Hr, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import PostCard from '$lib/components/PostCard/PostCard.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const posts = data.posts;
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
	<link rel="apple-touch-icon" sizes="57x57" href="/images" />
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon.png" />
	<link rel="mask-icon" href="/images/safari-pinned-tab.svg" color="#5bbad5" />
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>
<div class="container mx-auto px-6 py-6">
	<Heading tag="h1">Alex Swensen's Blog</Heading>
	<Hr />
	<P size="xl">Recent Posts:</P>
	<div>
		{#each posts as post}
			<PostCard {post} />
		{/each}
	</div>
</div>
