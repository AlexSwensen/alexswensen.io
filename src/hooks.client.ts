import * as SentrySvelte from '@sentry/svelte';
// import { BrowserTracing } from '@sentry/tracing';
import { BrowserTracing } from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';
import { PUBLIC_NODE_ENV, PUBLIC_SENTRY_DSN } from '$env/static/public';

const sentryEnabled = PUBLIC_SENTRY_DSN;

if (sentryEnabled) {
	SentrySvelte.init({
		dsn: PUBLIC_SENTRY_DSN,
		integrations: [new BrowserTracing(), new SentrySvelte.Replay()],
		environment: PUBLIC_NODE_ENV,
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 0.5
	});

	SentrySvelte.setTag('svelteKit', 'browser');
}
// This will catch errors in load functions from +page.ts files
export const handleError = (({ error, event }) => {
	if (sentryEnabled) {
		SentrySvelte.captureException(error, { contexts: { sveltekit: { event } } });
	}
	return {
		message: error.message
	};
}) satisfies HandleClientError;
