import { NODE_ENV } from '$env/static/private';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import { redirectMap } from '$lib/services/redirects';
import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError, Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import { URL } from 'url';

const sentryEnabled = PUBLIC_SENTRY_DSN;

if (sentryEnabled) {
	SentryNode.init({
		dsn: PUBLIC_SENTRY_DSN,
		tracesSampleRate: 1.0,
		environment: NODE_ENV,
		// Add the Http integration for tracing
		integrations: [new SentryNode.Integrations.Http()]
	});

	SentryNode.setTag('svelteKit', 'server');
}
// use handleError to report errors during server-side data loading
export const handleError = (({ error, event }) => {
	if (sentryEnabled) {
		SentryNode.captureException(error as Error, { contexts: { sveltekit: { event } } });
	}
	return {
		message: (error as Error).message
	};
}) satisfies HandleServerError;

export const handle: Handle = async ({ event, resolve }) => {
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

	return resolve(event);
};
