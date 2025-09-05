<script lang="ts">
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import TravelCard from './Utilities/TravelCard.svelte';
</script>

<div class="pt-5">
	<div class="flex items-center justify-between gap-4 px-3">
		<HabitSearch />
	</div>
	<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
		<TravelCard />
		<TravelCard />
		<TravelCard />
	</div>
</div>
