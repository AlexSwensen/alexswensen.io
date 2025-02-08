<script>
	import { Button } from 'flowbite-svelte';
	import { TwitterIcon } from 'lucide-svelte';

	// import { Button } from "$lib/components/ui/button";
	import GithubIcon from 'lucide-svelte/icons/github';
	import LinkedinIcon from 'lucide-svelte/icons/linkedin';
</script>

<section class="bg-white dark:bg-gray-800">
	<div class="container mx-auto px-6 py-16 text-center">
		<div class="mx-auto max-w-lg">
			<img
				src="/img/me.jpeg?height=150&width=150"
				alt="Alexander Swensen"
				width="150"
				height="150"
				class="mx-auto rounded-full"
			/>
			<h1 class="mt-6 text-3xl font-bold text-gray-800 dark:text-white md:text-4xl">
				Alexander Swensen
			</h1>
			<p class="mt-2 text-gray-600 dark:text-gray-300">Software Engineer</p>
			<p class="mt-4 text-gray-600 dark:text-gray-300">
				Passionate about building scalable and efficient software solutions. Experienced in
				full-stack development with a focus on modern web technologies.
			</p>
			<div class="mt-6 flex justify-center space-x-4">
				<a href="https://github.com/AlexSwensen" target="_blank" rel="noopener noreferrer">
					<Button variant="outline" size="icon">
						<GithubIcon class="h-5 w-5" />
					</Button>
				</a>
				<a href="https://linkedin.com/in/alexswensen" target="_blank" rel="noopener noreferrer">
					<Button variant="outline" size="icon">
						<LinkedinIcon class="h-5 w-5" />
					</Button>
				</a>
				<a href="https://x.com/alexswensen_" target="_blank" rel="noopener noreferrer">
					<Button variant="outline" size="icon">
						<TwitterIcon class="h-5 w-5" />
					</Button>
				</a>
			</div>
		</div>
	</div>
</section>
