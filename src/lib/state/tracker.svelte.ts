/* eslint-disable svelte/prefer-svelte-reactivity */
export const trackerState = $state({
	data: {
		selectedDay: new Date()
	}
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function updateSelectedDay(arg: any) {
	trackerState.data.selectedDay = arg;
}
