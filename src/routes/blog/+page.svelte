<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;
</script>

	<div>
	{#each posts as post}
		<div class="p-4">
			<h3 class="text-lg font-bold">{post.title}</h3>
			<P>{post.content}</P>
		</div>
	{/each}
	</div>

