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
	if (redirectMap.has(url.pathname)) {
		const redirectUrl = redirectMap.get(url.pathname);
		if (redirectUrl) {
			throw redirect(307, new URL(redirectUrl, url).toString());
		}
	}

	return resolve(event);
};

