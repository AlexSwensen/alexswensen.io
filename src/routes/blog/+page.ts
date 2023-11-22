import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const data = await fetch('/api/v1/posts');
	const posts = await data.json();

	return posts;
};
