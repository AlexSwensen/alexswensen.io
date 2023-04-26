import { NODE_ENV } from '$env/static/private';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';
import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError } from '@sveltejs/kit';

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
		SentryNode.captureException(error, { contexts: { sveltekit: { event } } });
	}
	return {
		message: error.message
	};
}) satisfies HandleServerError;
