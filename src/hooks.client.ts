import * as SentrySvelte from '@sentry/svelte';
// import { BrowserTracing } from '@sentry/tracing';
import { BrowserTracing } from '@sentry/svelte';
import type { HandleClientError } from '@sveltejs/kit';
import * as _publicEnvVars from '$env/static/public';

const sentryEnabled =
	_publicEnvVars.PUBLIC_SENTRY_DSN && _publicEnvVars.PUBLIC_NODE_ENV === 'production';

if (sentryEnabled) {
	SentrySvelte.init({
		dsn: _publicEnvVars.PUBLIC_SENTRY_DSN,
		integrations: [new BrowserTracing(), new SentrySvelte.Replay()],
		environment: _publicEnvVars.PUBLIC_NODE_ENV,
		tracesSampleRate: 1.0,
		replaysSessionSampleRate: 1.0, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
		replaysOnErrorSampleRate: 1.0
		// If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
	});

	SentrySvelte.setTag('svelteKit', 'browser');
}
// This will catch errors in load functions from +page.ts files
export const handleError = (({ error, event }) => {
	if (sentryEnabled) {
		SentrySvelte.captureException(error as Error, { contexts: { sveltekit: { event } } });
	}
	return {
		message: (error as Error).message
	};
}) satisfies HandleClientError;
