<script>
	import { Code, Database, Globe, Server } from 'lucide-svelte';

	const skills = [
		{
			name: 'Frontend Development',
			icon: Globe,
			description: 'React, Next.js, Vue.js, Svelte'
		},
		{ name: 'Backend Development', icon: Server, description: 'Node.js, Express, Django' },
		{ name: 'Database Management', icon: Database, description: 'SQL, MongoDB, PostgreSQL' },
		{ name: 'Languages', icon: Code, description: 'Typescript, JavaScript, Python, Go' }
	];
</script>

<section id="skills" class="bg-gray-100 py-16 dark:bg-gray-900">
	<div class="container mx-auto px-6">
		<h2 class="mb-8 text-center text-3xl font-bold text-gray-800 dark:text-white">Skills</h2>
		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each skills as skill (skill.name)}
				<div class="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
					<svelte:component this={skill.icon} class="mx-auto mb-4 h-12 w-12 text-blue-500" />
					<h3 class="mb-2 text-center text-xl font-semibold text-gray-800 dark:text-white">
						{skill.name}
					</h3>
					<p class="text-center text-gray-600 dark:text-gray-300">
						{skill.description}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>
