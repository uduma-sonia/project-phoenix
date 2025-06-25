<script lang="ts">
	import YearGrid from './Utilities/YearGrid.svelte';
	import NameCard from './Utilities/NameCard.svelte';
	import StatItem from './Utilities/StatItem.svelte';
</script>

<div class="rounded-lg border-2 bg-white p-4 pb-20">
	<NameCard />

	<div class="mt-4">
		<YearGrid />

		<div class="mt-16 grid grid-cols-3 gap-6">
			<StatItem />
			<StatItem />
			<StatItem />
			<StatItem />
		</div>
	</div>
</div>
