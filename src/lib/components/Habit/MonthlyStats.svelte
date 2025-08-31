<script lang="ts">
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import { currentStatsMonth } from '$lib/state/tracker.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import { format } from 'date-fns';

	let { details } = $props();

	const trackerStatsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getLogStats(details._id, {
				year: format(new Date(currentStatsMonth.month), 'yyyy'),
				month: format(new Date(currentStatsMonth.month), 'MM')
			}),
			queryFn: () =>
				TrackerLogRequest.getLogStats(details._id, {
					year: format(new Date(currentStatsMonth.month), 'yyyy'),
					month: format(new Date(currentStatsMonth.month), 'MM')
				})
		})
	);

	let _stats = $derived($trackerStatsQuery?.data?.data?.stats);
</script>

<div class="rounded-lg bg-white pb-20">
	<div class="flex flex-col gap-4 sm:flex-row">
		<div class="w-full rounded-xl border-2 px-4 pb-4 sm:w-1/2">
			<Calendar {details} />
		</div>

		<div class="w-full rounded-xl sm:w-1/2">
			<div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
				<StatItem
					value={_stats?.completed || 0}
					smallText={`Day${_stats?.completed > 1 ? 's' : ''}`}
					description="Completed"
				/>
				<StatItem
					value={_stats?.skipped || 0}
					smallText={`Day${_stats?.skipped > 1 ? 's' : ''}`}
					description="Skipped"
				/>
				<StatItem
					value={_stats?.failed || 0}
					smallText={`Day${_stats?.failed > 1 ? 's' : ''}`}
					description="Failed"
				/>
			</div>
		</div>
	</div>
</div>
