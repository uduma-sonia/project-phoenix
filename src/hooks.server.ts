import { AUTH_TOKEN } from '$lib/constants/global';
import type { Handle } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get(AUTH_TOKEN);

	if (event.route.id?.includes('private')) {
		if (
			event.route.id?.includes('/(private)/recipe/[id') ||
			event.route.id?.includes('/(private)/recipe/user/[id')
		) {
			console.log('don"t redirect');
		} else {
			if (!token) {
				throw redirect(302, '/login');
			}
		}
	}

	if (event.url.pathname === '/login') {
		if (token) {
			throw redirect(302, '/expense');
		}
	}

	const response = await resolve(event);
	return response;
};
