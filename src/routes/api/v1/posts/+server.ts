import { json, type RequestHandler } from '@sveltejs/kit';
import { compareDesc } from 'date-fns';
// @ts-ignore-next
const posts = import.meta.compileTime('../../../../lib/static-content/get-posts.ts');

export const GET: RequestHandler = async () => {
	// sort posts by date
	const sortedPosts = posts.posts.sort((a: any, b: any) =>
		compareDesc(new Date(a.date), new Date(b.date))
	);
	return json({ posts: sortedPosts });
};
