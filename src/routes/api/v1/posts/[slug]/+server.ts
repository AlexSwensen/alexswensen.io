import { json, type RequestHandler } from '@sveltejs/kit';
// @ts-ignore-next
const postData = import.meta.compileTime('../../../../../lib/static-content/get-posts.ts');

export const POST: RequestHandler = async (request) => {
	const { slug } = request.params;
	const post = postData.posts.find((post: any) => post.slug === slug);
	return json(post);
};
