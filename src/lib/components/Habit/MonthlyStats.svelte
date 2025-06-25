<script lang="ts">
	import StatItem from './Utilities/StatItem.svelte';
	import Calendar from './Utilities/Calendar.svelte';
	import NameCard from './Utilities/NameCard.svelte';
</script>

<div class="rounded-lg border-2 bg-white p-4 pb-20">
	<NameCard />

	<div>
		<Calendar />

		<div class="mt-6">
			<div class="grid grid-cols-3 gap-6">
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
