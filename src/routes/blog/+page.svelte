<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;
</script>

<div>
	{#each posts as post}
		<div class="p-4">
			<a class="text-lg font-bold underline hover:text-blue-600" href="/blog/{post.slug}"
				>{post.title}</a
			>
			<P>{post.excerpt}</P>
		</div>
	{/each}
</div>
