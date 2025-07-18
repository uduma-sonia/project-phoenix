// import { AUTH_TOKEN } from '$lib/constants/global';
// import type { Handle } from '@sveltejs/kit';
// import { redirect } from '@sveltejs/kit';

// export const handle: Handle = async ({ event, resolve }) => {
// 	const token = event.cookies.get(AUTH_TOKEN);

// 	if (event.route.id?.includes('private')) {
// 		if (!token) {
// 			throw redirect(302, '/login');
// 		}
// 	}

// 	if (event.url.pathname === '/login' || event.url.pathname === '/') {
// 		if (token) {
// 			throw redirect(302, '/tracker');
// 		}
// 	}

// 	const response = await resolve(event);
// 	return response;
// };
