import type { Trip } from '../../types/trip';

export const selectedTrip = $state<{ data: null | Trip }>({
	data: null
});

export function handleSelectTrip(arg: Trip) {
	selectedTrip.data = arg;
}
