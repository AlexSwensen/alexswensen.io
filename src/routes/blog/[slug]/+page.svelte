<script lang="ts">
	import { Heading, P } from 'flowbite-svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	const post = data;
</script>

<div>
	<div class="p-4">
		<Heading size="2xl">{post.title}</Heading>
		<P>{post.content}</P>
	</div>
</div>
