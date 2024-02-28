<script lang="ts">
	import { P } from 'flowbite-svelte';

	export let post: any; // TODO: Type this

	const datePosted = (date: string) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<div class="py-4">
	<a
		class="text-lg font-bold underline hover:text-blue-600"
		data-sveltekit-prefetch
		href="/blog/{post.slug}">{post.title}</a
	>
	<P class="pb-2">{datePosted(post.date)}</P>
	<P>{post.excerpt}</P>
</div>
