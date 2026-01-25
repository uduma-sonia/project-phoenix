/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export const toasts: any = writable([]);

export function addToast(
	message: any,
	type: 'error' | 'success',
	options?: {
		imgLink?: string;
		withSound?: boolean;
		link?: string;
		linkName?: string;
		action?: () => void;
	}
) {
	const id = Date.now();

	toasts.update((all: any) => [
		...all,
		{
			id,
			message,
			type,
			imgLink: options?.imgLink,
			link: options?.link,
			linkName: options?.linkName
		}
	]);

	setTimeout(() => {
		toasts.update((all: any) => all.filter((toast: any) => toast.id !== id));
	}, 5000);
}

export function removeToast(id: string) {
	toasts.update((all: any) => all.filter((toast: any) => toast.id !== id));
}
