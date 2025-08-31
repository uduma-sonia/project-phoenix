<script lang="ts">
	import DatePicker from '$lib/components/Common/DatePicker/DatePicker.svelte';
	import { TrackerLogRequest } from '$lib/requests';
	import { currentStatsMonth, updateCurrentStatMonth } from '$lib/state/tracker.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import { format, formatISO } from 'date-fns';
	import TrackerUtils from './utils';

	let { details, logsList } = $props();

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
