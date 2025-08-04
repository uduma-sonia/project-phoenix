/* eslint-disable @typescript-eslint/no-explicit-any */
import { writable } from 'svelte/store';

export const toasts: any = writable([]);

export function addToast(message: any, type: 'error' | 'success', imgLink?: string) {
	const id = Date.now();

	toasts.update((all: any) => [...all, { id, message, type, imgLink }]);

	setTimeout(() => {
		toasts.update((all: any) => all.filter((toast: any) => toast.id !== id));
	}, 4000);
}

export function removeToast(id: string) {
	toasts.update((all: any) => all.filter((toast: any) => toast.id !== id));
}
