import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import { sentryVitePlugin } from '@sentry/vite-plugin';
import type { PluginOption } from 'vite';
import compileTime from 'vite-plugin-compile-time';
import tailwindcss from '@tailwindcss/vite';

// const isProduction = process.env.NODE_ENV === 'production';
const sentryAuthToken = process.env.SENTRY_AUTH_TOKEN;
const org = process.env.SENTRY_ORG;
const project = process.env.SENTRY_PROJECT;

const plugins: PluginOption[] = [];

if (sentryAuthToken && org && project) {
	console.log('Sentry enabled');
	plugins.push(
		sentryVitePlugin({
			telemetry: false,
			org: org,
			project: project,
			authToken: sentryAuthToken,
			sourcemaps: {
				assets: './dist/**'
			}
		})
	);
}

const pluginOptions: PluginOption[] = [tailwindcss(), sveltekit(), compileTime(), ...plugins];

export default defineConfig({
	plugins: pluginOptions as any,
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}'],
		globals: true,
		environment: 'jsdom'
	}
});
