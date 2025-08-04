import type { Habit } from '../../types/tracker';

/* eslint-disable svelte/prefer-svelte-reactivity */
export const trackerState = $state<{ data: { selectedDay: Date; trackerDetails: Habit | null } }>({
	data: {
		selectedDay: new Date(),
		trackerDetails: null
	}
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSelectedDay(arg: any) {
	trackerState.data.selectedDay = arg;
}

export function updateTrackerDetails(arg: Habit) {
	trackerState.data.trackerDetails = arg;
}
