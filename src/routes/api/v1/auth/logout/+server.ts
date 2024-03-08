import { lucia } from '$lib/server/auth';
import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get('auth_session');
	if (sessionCookie) {
		lucia.invalidateSession(sessionCookie);
		lucia.deleteExpiredSessions();
		cookies.delete('auth_session', { path: '/' });
		return json({ message: 'Logged out' });
	}
	return json({ message: 'No session' });
};
