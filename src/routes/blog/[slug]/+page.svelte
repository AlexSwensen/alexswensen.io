<script lang="ts">
	import { Blockquote, Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';
	import { formatRelative } from 'date-fns';
	import { marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';

	export let data: PageData;
	const post = data;

	const datePosted = formatRelative(new Date(post.date), new Date());

	const htmlMarkup = DOMPurify.sanitize(marked.parse(post.content) as string);
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta name="description" content={post.excerpt} />
	<meta name="keywords" content={post.tags.join(', ')} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={post.title} />
	<meta property="og:image" content={post.image} />
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

<div class="">
	<article class="prose prose-gray mx-auto max-w-4xl break-words text-pretty">
		<img src={post.image} alt={post.title} class="mx-auto" />
		<Heading size="2xl">{post.title}</Heading>
		<Blockquote class="">{post.excerpt}</Blockquote>
		<p class="text-gray-500 dark:text-gray-400">Published: {datePosted}</p>
		<div
			class="dark:text-white dark:prose-p:text-white dark:prose-headings:text-white dark:prose-strong:text-white dark:prose-code:text-white dark:prose-a:text-white mx-auto prose-img:mx-auto"
		>
			{@html htmlMarkup}
		</div>
	</article>
</div>
