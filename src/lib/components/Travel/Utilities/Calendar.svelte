<script lang="ts">
	import { page } from '$app/state';
	import DateRangePicker from '$lib/components/Common/DatePicker/DateRangePicker.svelte';
	import { tripRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { trip } = $props();
	const queryClient = useQueryClient();

	let dateRange: { start: Date; end: Date } = $state({
		start: new Date(trip?.start),
		end: new Date(trip?.end)
	});

	async function updateDate() {
		if (dateRange?.start && dateRange.end) {
			try {
				const payload = {
					name: trip.name,
					start: dateRange.start,
					end: dateRange.end
				};
				const result = await tripRequest.updateTrip(page.params.id, payload);

				if (result) {
					queryClient.invalidateQueries({ queryKey: queryKeys.getSingleTrip(page.params.id) });
				}
			} catch (error: any) {
				addToast(error?.message || 'An error occured', 'error');
			}
		}
	}
</script>

<div class="retro_wrapper mt-4 bg-white">
	<div class="retro_wrapper_inner">
		<DateRangePicker selectComplete={updateDate} bind:range={dateRange} isClickable={true} />
	</div>
</div>
