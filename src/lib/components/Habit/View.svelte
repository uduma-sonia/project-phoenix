<script lang="ts">
	import NameCard from '../Common/NameCard.svelte';
	import NavBar from '../Common/NavBar.svelte';
	import HabitSearch from '../Habit/HabitSearch.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px]">
	<NavBar />
	<NameCard />
	<div class="mt-4">
		<HabitSearch />
	</div>
</div>
