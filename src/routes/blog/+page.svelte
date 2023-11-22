<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const posts = data.posts;
</script>

<h1 class="text-xl font-bold">This is a blog page... or it will be soon</h1>

<h2>another element</h2>

<!-- <div class="w-full">
	{#each posts as post}
		<div class="p-4">
			<h3 class="text-lg font-bold">{post.title}</h3>
			<p>{post.content}</p>
		</div>
	{/each}
</div> -->
