import { json, type RequestHandler } from '@sveltejs/kit';
import { lucia } from '$lib/server/auth';

export const GET: RequestHandler = async ({ cookies }) => {
	// const { email, password } = request.body;
	// @ts-ignore-next
	const session = await lucia.createSession('a8494e75-db19-4a33-8958-68a1c230ccc5', {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	const { user } = await lucia.validateSession(session.id);

	cookies.set(sessionCookie.name, sessionCookie.value, {
		...sessionCookie.attributes,
		path: '/'
	});
	return json({ user });
};
