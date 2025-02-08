<script>
	import { Footer, FooterCopyright, FooterLinkGroup, FooterLink } from 'flowbite-svelte';

	const currentYear = new Date().getFullYear();
</script>

<Footer class="bg-white dark:bg-gray-900">
	<div class="container mx-auto px-6">
		<hr class="dark:bg-grey-900 border-gray-200 dark:border-gray-700 sm:mx-auto lg:my-8" />
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterCopyright
				href="/"
				by="Alexander Swensen"
				year={currentYear}
				class="text-gray-800 dark:text-white"
			/>
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mt-3 text-sm text-gray-600 dark:text-gray-300 sm:mt-0"
			>
				<FooterLink href="/about">About</FooterLink>
				<FooterLink href="https://github.com/AlexSwensen" target="_blank">Github</FooterLink>
			</FooterLinkGroup>
		</div>
	</div>
</Footer>
