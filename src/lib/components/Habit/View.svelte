<script lang="ts">
	import NameCard from '../Common/NameCard.svelte';
	import NavBar from '../Common/NavBar.svelte';
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px]">
	<NavBar />
	<NameCard />
	<DateScroller />
	<div class="mt-3 flex items-center gap-6">
		<HabitSearch />
		<FilterForm />
	</div>
</div>
