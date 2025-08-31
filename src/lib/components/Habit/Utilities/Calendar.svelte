<script lang="ts">
	import DatePicker from '$lib/components/Common/DatePicker/DatePicker.svelte';
	import { TrackerLogRequest } from '$lib/requests';
	import { currentStatsMonth, updateCurrentStatMonth } from '$lib/state/tracker.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import { format } from 'date-fns';
	import TrackerUtils from './utils';

	let { details } = $props();

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
			TrackerUtils.getISODate(currentStatsMonth.month)
		)
	);

	$effect(() => console.log(currentStreak));

	function handleUpdate(arg: Date) {
		updateCurrentStatMonth(arg);
	}
</script>

<div class="mt-4">
	<DatePicker
		canClick={false}
		{logsList}
		{details}
		{handleUpdate}
		value={currentStatsMonth.month}
	/>
</div>
