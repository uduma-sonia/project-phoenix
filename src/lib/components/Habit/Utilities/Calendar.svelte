<script lang="ts">
	import DatePicker from '$lib/components/Common/DatePicker/DatePicker.svelte';
	import { currentStatsMonth, updateCurrentStatMonth } from '$lib/state/tracker.svelte';

	let { details } = $props();

	function handleUpdate(arg: Date) {
		updateCurrentStatMonth(arg);
	}
</script>

<div class="mt-4">
	<DatePicker {details} {handleUpdate} value={currentStatsMonth.month} />
</div>
