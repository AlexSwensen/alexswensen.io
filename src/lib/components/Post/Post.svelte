<script lang="ts">
	import { formatRelative } from 'date-fns';
	import { Blockquote, Heading, Hr, P } from 'flowbite-svelte';
	import { Image } from '@unpic/svelte';

	import { Marked } from 'marked';
	import DOMPurify from 'isomorphic-dompurify';
	import { markedHighlight } from 'marked-highlight';
	import hljs from 'highlight.js';

	export let post: any; // TODO: Type this

	const datePosted = formatRelative(new Date(post.date), new Date());

	const marked = new Marked(
		markedHighlight({
			langPrefix: 'hljs language-',
			highlight(code, lang, info) {
				const language = hljs.getLanguage(lang) ? lang : 'plaintext';
				return hljs.highlight(code, { language }).value;
			}
		})
	);

	const htmlMarkup = DOMPurify.sanitize(marked.parse(post.content) as string);
</script>

<article
	class="prose prose-gray mx-auto max-w-4xl text-pretty break-words prose-img:mx-auto dark:text-white dark:prose-headings:text-white dark:prose-p:text-white dark:prose-a:text-white dark:prose-strong:text-white dark:prose-code:text-white"
>
	<Heading size="2xl">{post.title}</Heading>
	<Blockquote class="">{post.excerpt}</Blockquote>
	<p class="text-sm text-gray-500 dark:text-gray-400">Published: {datePosted}</p>
	<Hr />
	{#if post.image}
		<Image
			src={post.image}
			alt={post.title}
			class="mx-auto rounded-lg"
			layout="fullWidth"
			background="auto"
			priority
		/>
	{/if}
	<div>
		{@html htmlMarkup}
	</div>
</article>
