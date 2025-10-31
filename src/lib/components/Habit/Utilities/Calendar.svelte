<script lang="ts">
	import DatePicker from '$lib/components/Common/DatePicker/TrackerDatePicker.svelte';
	import { currentStatsMonth, updateCurrentStatMonth } from '$lib/state/tracker.svelte';

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
