<script lang="ts">
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';

	let { details } = $props();
</script>

<div class="rounded-lg bg-white pb-20">
	<div class="flex flex-col gap-4 sm:flex-row">
		<div class="w-full rounded-xl border-2 px-4 pb-4 sm:w-1/2">
			<Calendar {details} />
		</div>

		<div class="w-full rounded-xl sm:w-1/2">
			<div class="grid grid-cols-2 gap-6 sm:grid-cols-3">
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
				<StatItem />
			</div>
		</div>
	</div>
</div>
