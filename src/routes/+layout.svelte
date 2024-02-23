<script>
	import '../app.scss';
	import Nav from '../lib/components/Nav/Nav.svelte';
</script>

<Nav />
<div class="p-10 text-black dark:text-white dark:bg-black h-full">
	<slot />
</div>
