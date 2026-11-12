import { writable, type Writable } from 'svelte/store';

export type ToastType = 'error' | 'success';

export interface Toast {
	id: number;
	message: string;
	type: ToastType;
	imgLink?: string;
	link?: string;
	linkName?: string;
	action?: () => void;
}

export const toasts: Writable<Toast[]> = writable([]);

export function addToast(
	message: string,
	type: ToastType,
	options?: {
		imgLink?: string;
		withSound?: boolean;
		link?: string;
		linkName?: string;
		action?: () => void;
	}
): void {
	const id = Date.now();

	toasts.update((all) => [
		...all,
		{
			id,
			message,
			type,
			imgLink: options?.imgLink,
			link: options?.link,
			linkName: options?.linkName,
			action: options?.action
		}
	]);

	setTimeout(() => {
		toasts.update((all) => all.filter((toast) => toast.id !== id));
	}, 5000);
}

export function removeToast(id: number): void {
	toasts.update((all) => all.filter((toast) => toast.id !== id));
}
