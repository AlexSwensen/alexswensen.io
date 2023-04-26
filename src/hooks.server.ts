import { NODE_ENV } from '$env/static/private';
import * as SentryNode from '@sentry/node';
import '@sentry/tracing';
import type { HandleServerError } from '@sveltejs/kit';

const { PUBLIC_SENTRY_DSN, SENTRY_ORG, SENTRY_PROJECT } = process.env;

const sentryEnabled = PUBLIC_SENTRY_DSN && SENTRY_ORG && SENTRY_PROJECT;

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
