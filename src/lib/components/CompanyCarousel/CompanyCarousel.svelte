<script lang="ts">
	import Carousel from 'svelte-carousel';
	import { onMount } from 'svelte';

	let carouselComponent: Carousel;

	export let companies: {
		name: string;
		logo: string;
	}[] = [
		{
			name: 'Microsoft',
			logo: '/logos/microsoft.svg'
		},
		{
			name: 'Google',
			logo: '/logos/google.svg'
		},
		{
			name: 'Apple',
			logo: '/logos/apple.svg'
		},
		{
			name: 'Amazon',
			logo: '/logos/amazon.svg'
		},
		{
			name: 'Meta',
			logo: '/logos/meta.svg'
		},
		{
			name: 'Netflix',
			logo: '/logos/netflix.svg'
		}
	];

	// Carousel settings
	const settings = {
		autoplayDuration: 0,
		duration: 5000,
		autoplay: true,
		timingFunction: 'linear',
		dots: false,
		arrows: false,
		swiping: false,
		infinite: true
	};

	// Responsive settings
	let slidesPerPage = 5;

	function updateSlidesPerPage() {
		if (window.innerWidth <= 480) {
			slidesPerPage = 2;
		} else if (window.innerWidth <= 600) {
			slidesPerPage = 3;
		} else if (window.innerWidth <= 1024) {
			slidesPerPage = 4;
		} else {
			slidesPerPage = 5;
		}
	}

	// Only initialize carousel on the client side
	let mounted = false;
	onMount(() => {
		mounted = true;
		updateSlidesPerPage();
		window.addEventListener('resize', updateSlidesPerPage);
		return () => window.removeEventListener('resize', updateSlidesPerPage);
	});
</script>

{#if mounted}
	<section class="overflow-hidden bg-gray-100 py-16 dark:bg-gray-800">
		<div class="container mx-auto px-6">
			<h2 class="mb-12 text-center text-3xl font-bold text-gray-800 dark:text-gray-200">
				Featured Collaborations
			</h2>
			<Carousel bind:this={carouselComponent} {...settings} particlesToShow={slidesPerPage}>
				{#each companies as company (company.name)}
					<div class="px-4">
						<div class="flex h-20 items-center justify-center">
							<img
								src={company.logo || '/placeholder.svg'}
								alt={company.name}
								width="150"
								height="50"
								class="max-h-12 w-auto opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
							/>
						</div>
					</div>
				{/each}
			</Carousel>
		</div>
	</section>
{/if}
