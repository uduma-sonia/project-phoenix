<script lang="ts">
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import { currentStatsMonth } from '$lib/state/tracker.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import TrackerUtils from './Utilities/utils';
	import { endOfYear, startOfYear } from 'date-fns';
	import { HabitStatus } from '../../../types/tracker';

	let { details } = $props();

	const selectedDays = details?.selectedDays;

	const trackerStatsQuery = createQuery({
		queryKey: queryKeys.getLogStats(details._id, {
			date: TrackerUtils.getISODate(currentStatsMonth.month)
		}),
		queryFn: () =>
			TrackerLogRequest.getLogStats(details._id, {
				startDate: TrackerUtils.getISODate(startOfYear(currentStatsMonth.month)),
				endDate: TrackerUtils.getISODate(endOfYear(currentStatsMonth.month)),
				selectedDays: JSON.stringify(selectedDays)
			})
	});

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
					value={_stats?.totalCompleted}
					smallText={`Day${_stats?.totalCompleted > 1 ? 's' : ''}`}
					description="Completed"
				/>
				<StatItem
					value={_stats?.totalSkipped}
					smallText={`Day${_stats?.totalSkipped > 1 ? 's' : ''}`}
					description="Skipped"
				/>
				<StatItem
					value={_stats?.totalFailed}
					smallText={`Day${_stats?.totalFailed > 1 ? 's' : ''}`}
					description="Skipped"
				/>
			</div>
		</div>
	</div>
</div>
