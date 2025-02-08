declare module 'svelte-carousel' {
	import { SvelteComponentTyped } from 'svelte';
	export default class Carousel extends SvelteComponentTyped<{
		particlesToShow?: number;
		autoplayDuration?: number;
		duration?: number;
		autoplay?: boolean;
		timingFunction?: string;
		dots?: boolean;
		arrows?: boolean;
		swiping?: boolean;
		infinite?: boolean;
	}> {}
}
