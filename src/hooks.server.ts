import { NODE_ENV } from '$env/static/private';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError } from '@sveltejs/kit';
import { Response, redirect } from '@sveltejs/kit';
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



const redirectMap = new Map([
	['/old-page', '/blog/new-page'],
	['/another-old-page', '/blog/another-new-page']
]);

export async function handle({ event, resolve }: { event: FetchEvent, resolve: (request: Request) => Response }): Promise<Response> {
	
	const request = event.request;
	const url = new URL(request.url);
	if (redirectMap.has(url.pathname)) {
		const redirectUrl = redirectMap.get(url.pathname);
		if (redirectUrl) {
			throw redirect(307, new URL(redirectUrl, url).toString());
		}
	}

	return resolve(event);
}

