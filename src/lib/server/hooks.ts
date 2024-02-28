import { redirectMap } from '$lib/services/redirects';
import { redirect, type Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { lucia } from './auth';

export const redirectHook = (async ({ event, resolve }) => {
	const { request } = event;
	const url = new URL(request.url);
	// redirect old URLs
	// if the URL is in the map, redirect to the new URL
	// if the URL has a trailing slash, redirect to the URL without the trailing slash (which is the sveltekit default)
	if (
		redirectMap.has(url.pathname) ||
		redirectMap.has(url.pathname + '/') ||
		redirectMap.has(url.pathname.slice(0, -1))
	) {
		const redirectUrl =
			redirectMap.get(url.pathname) ||
			redirectMap.get(url.pathname + '/') ||
			redirectMap.get(url.pathname.slice(0, -1));
		if (redirectUrl) {
			redirect(301, new URL(redirectUrl, url).toString());
		}
	}
	return await resolve(event);
}) satisfies Handle;

export const authHook = (async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		// sveltekit types deviates from the de-facto standard
		// you can use 'as any' too
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}
	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
}) satisfies Handle;

export const hooks = sequence(redirectHook, authHook);
