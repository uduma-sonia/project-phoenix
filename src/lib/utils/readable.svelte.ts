/* eslint-disable @typescript-eslint/no-explicit-any */
import { tick } from 'svelte';

export function readable(initialVvalue: any, start: (arg0: (fn: any) => any) => any) {
	let value = $state(initialVvalue);

	let subscribers = 0;
	let stop: (() => void) | null = null;

	return {
		get value() {
			// If in a tracking context ...
			if ($effect.tracking()) {
				$effect(() => {
					// ...and there's no subscribers yet...
					if (subscribers === 0) {
						// ...invoke the function and listen to changes to update state
						stop = start((fn: (arg0: any) => any) => (value = fn(value)));
					}

					subscribers++;

					// The return callback is called once a listener unlistens
					return () => {
						tick().then(() => {
							subscribers--;
							// If it was the last subscriber...
							if (subscribers === 0) {
								// ...stop listening to changes
								stop?.();
								stop = null;
							}
						});
					};
				});
			}

			return value;
		}
	};
}
