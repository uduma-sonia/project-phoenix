<script lang="ts">
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import { currentStatsMonth } from '$lib/state/tracker.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import { format, formatISO } from 'date-fns';
	import TrackerUtils from './Utilities/utils';
	import Helpers from '$lib/utils/helpers';

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

	const logListQuery = $derived(
		createQuery({
			queryKey: queryKeys.getLogList(details._id, {
				year: format(new Date(currentStatsMonth.month), 'yyyy'),
				month: format(new Date(currentStatsMonth.month), 'MM'),
				filterBy: 'month'
			}),
			queryFn: () =>
				TrackerLogRequest.getLogList(details._id, {
					year: format(new Date(currentStatsMonth.month), 'yyyy'),
					month: format(new Date(currentStatsMonth.month), 'MM'),
					filterBy: 'month'
				})
		})
	);

	let logsList = $derived($logListQuery?.data?.data?.logs);
	let currentStreak = $derived(
		TrackerUtils.getCurrentStreak(
			logsList,
			details?.selectedDays,
			formatISO(currentStatsMonth.month)
		)
	);
	let monthlyCompletionRate = $derived(
		TrackerUtils.getMonthlyCompletionRate(
			logsList,
			details?.selectedDays,
			formatISO(currentStatsMonth.month)
		)
	);
	let bestStreak = $derived(
		TrackerUtils.getBestStreak(logsList, details?.selectedDays, formatISO(currentStatsMonth.month))
	);

	let _stats = $derived($trackerStatsQuery?.data?.data?.stats);
</script>

<div class="rounded-lg bg-white pb-20">
	<div class="flex flex-col gap-4 sm:flex-row">
		<div class="w-full rounded-xl border-2 px-4 pb-4 sm:w-1/2">
			<Calendar {details} {logsList} />
		</div>

		<div class="w-full rounded-xl sm:w-1/2">
			<div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
				<StatItem
					value={currentStreak || 0}
					smallText={`Day${Helpers.returnS(currentStreak)}`}
					description="Current Streak"
				/>
				<StatItem
					value={bestStreak || 0}
					smallText={`Day${Helpers.returnS(bestStreak)}`}
					description={`Best Streak ${format(new Date(currentStatsMonth.month), 'LLL')}`}
				/>
				<StatItem
					value={monthlyCompletionRate || 0}
					smallText={`%`}
					description="Completion Rate"
				/>
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
			</div>

			<br />
			<br />
			<div>
				<p class="font-lexend text-sm font-light">
					{details.description}
				</p>
			</div>
		</div>
	</div>
</div>
