<script lang="ts">
	import { P } from 'flowbite-svelte';

	interface Props {
		post: any;
	}

	let { post }: Props = $props();

	const datePosted = (date: string) => {
		return new Date(date).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	};
</script>

<div class="m-auto py-2">
	<a class="hover:cursor-pointer" data-sveltekit-prefetch href="/blog/{post.slug}">
		<div class="gap-4 md:flex">
			<!-- {#if post.image}
				<img
					class="h-64 w-full max-w-sm rounded-lg object-cover object-center"
					src={post.image}
					alt={post.title}
				/>
			{:else}
				<div class="w-full max-w-sm"></div>
			{/if} -->
			<div>
				<span class="text-lg font-bold underline hover:text-blue-600">{post.title}</span>
				<P class="pb-2">{datePosted(post.date)}</P>
				<P>{post.excerpt}</P>
			</div>
		</div>
	</a>
</div>
