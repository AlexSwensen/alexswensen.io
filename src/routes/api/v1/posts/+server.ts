import { json, type RequestHandler } from '@sveltejs/kit';
const posts = import.meta.compileTime('../../../../lib/static-content/get-posts.ts');

export const GET: RequestHandler = async () => {
	return json(posts);
};
