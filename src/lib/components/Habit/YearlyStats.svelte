<script lang="ts">
	import YearGrid from './Utilities/YearGrid.svelte';
	import { currentStatsYear, updateCurrentStatsYear } from '$lib/state/tracker.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TrackerLogRequest } from '$lib/requests';
	import { format, formatISO } from 'date-fns';
	import StatItem from './Utilities/StatItem.svelte';
	import TrackerUtils from './Utilities/utils';

	let { details } = $props();

	const trackerStatsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getLogStats(details._id, {
				year: format(new Date(currentStatsYear.year), 'yyyy')
			}),
			queryFn: () =>
				TrackerLogRequest.getLogStats(details._id, {
					year: format(new Date(currentStatsYear.year), 'yyyy')
				})
		})
	);

	const logListQuery = $derived(
		createQuery({
			queryKey: queryKeys.getLogList(details._id, {
				year: format(new Date(currentStatsYear.year), 'yyyy'),
				month: format(new Date(currentStatsYear.year), 'MM'),
				filterBy: 'year'
			}),
			queryFn: () =>
				TrackerLogRequest.getLogList(details._id, {
					year: format(new Date(currentStatsYear.year), 'yyyy'),
					month: format(new Date(currentStatsYear.year), 'MM'),
					filterBy: 'year'
				})
		})
	);
	let logsList = $derived($logListQuery?.data?.data?.logs);
	let _stats = $derived($trackerStatsQuery?.data?.data?.stats);

	let yearlyCompletionRate = $derived(
		TrackerUtils.getYearlyCompletionRate(
			logsList,
			details?.selectedDays,
			formatISO(currentStatsYear.year)
		)
	);

	function handleUpdateYear(arg: Date) {
		updateCurrentStatsYear(arg);
	}
</script>

<div class="rounded-lg bg-white pb-0">
	<div class="flex flex-col gap-4 sm:flex-row">
		<div class="h-fit w-full rounded-xl border-2 p-4 sm:w-[60%]">
			<YearGrid {handleUpdateYear} value={currentStatsYear.year} {logsList} />
		</div>

		<div class="w-full rounded-xl sm:w-[40%]">
			<div class="grid grid-cols-2 gap-6">
				<StatItem value={yearlyCompletionRate || 0} smallText={`%`} description="Completion Rate" />
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
		</div>
	</div>
</div>
