<script lang="ts">
	import DatePicker from '$lib/components/Common/DatePicker/DatePicker.svelte';

	let { details } = $props();
</script>

<div class="mt-4">
	<DatePicker {details} />
</div>
