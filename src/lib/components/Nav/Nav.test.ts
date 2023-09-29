import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Nav from './Nav.svelte';

describe('Nav', () => {
	test('that nav is rendered', () => {
		const { getByLabelText, getByText, component } = render(Nav, {});
		const nav = getByText('alexswensen.io');
		expect(nav).toBeDefined();
	});
});
