import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
	const { slug } = params;
	const data = await fetch(`/api/v1/posts/${slug}`, {
		method: 'POST',
		body: JSON.stringify({})
	});
	const posts = await data.json();

	return posts;
};
