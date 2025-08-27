<script lang="ts">
	import YearGrid from './Utilities/YearGrid.svelte';
	import StatItem from './Utilities/StatItem.svelte';
</script>

<div class="rounded-lg bg-white pb-20">
	<div class="flex flex-col items-start gap-4 sm:flex-row">
		<div class="w-full rounded-xl border-2 p-4 sm:w-1/2">
			<YearGrid />
		</div>

		<div class="grid grid-cols-3 gap-6">
			<StatItem />
			<StatItem />
			<StatItem />
			<StatItem />
		</div>
	</div>
</div>
