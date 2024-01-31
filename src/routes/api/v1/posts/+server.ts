import { json, type RequestHandler } from '@sveltejs/kit';
// @ts-ignore-next
const posts = import.meta.compileTime('../../../../lib/static-content/get-posts.ts');

export const GET: RequestHandler = async () => {
	return json(posts);
};
