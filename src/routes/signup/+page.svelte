<!-- routes/signup/+page.svelte -->
<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	export let form: ActionData;
</script>

<h1>Sign up</h1>
<form method="post" use:enhance>
	<label for="username">Username</label>
	<input name="username" id="username" class="text-black" /><br />
	<label for="password">Password</label>
	<input type="password" name="password" id="password" class="text-black" /><br />
	<button>Continue</button>
</form>

{#if form?.failure}
	<p class="text-red-500">Error: {form.message}</p>
{/if}
