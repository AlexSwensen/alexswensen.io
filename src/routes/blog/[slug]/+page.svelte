<script lang="ts">
	import type { PageData } from './$types';
	import Post from '$lib/components/Post/Post.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const post = data;
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.excerpt} />
	<meta name="keywords" content={post.tags.join(', ')} />

	<!-- OpenGraph Tags -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:description" content={post.excerpt} />
	<meta property="og:site_name" content="alexswensen.io" />
	<meta property="og:url" content={`https://alexswensen.io/blog/${post.slug}`} />
	{#if post.image}
		<meta property="og:image" content={post.image} />
		<meta property="og:image:alt" content={post.title} />
	{/if}

	<!-- Twitter Card Tags -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={post.title} />
	<meta name="twitter:description" content={post.excerpt} />
	{#if post.image}
		<meta name="twitter:image" content={post.image} />
		<meta name="twitter:image:alt" content={post.title} />
	{/if}

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

<div class="container mx-auto px-6 py-6">
	<Post {post} />
</div>
