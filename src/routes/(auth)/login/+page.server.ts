import { AUTH_TOKEN } from '$lib/constants/global';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(AUTH_TOKEN);

	if (token) {
		throw redirect(302, '/tracker');
	}

	const response = await resolve(event);
	return response;
};
