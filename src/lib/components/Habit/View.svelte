<script lang="ts">
	import NameCard from '../Common/NameCard.svelte';
	import NavBar from '../Common/NavBar.svelte';
	import DateScroller from './Utilities/DateScroller.svelte';
	import FilterForm from './Utilities/FilterForm.svelte';
	import HabitItem from './Utilities/HabitItem.svelte';
	import HabitSearch from './Utilities/HabitSearch.svelte';
</script>

<div class="mx-auto w-full max-w-[1000px]">
	<NavBar />
	<NameCard />
	<DateScroller />
	<div class="mt-3 flex items-start gap-6">
		<HabitSearch />
		<FilterForm />
	</div>

	<div class="mt-6 flex items-start gap-4">
		<div class="h-20 w-1/2 bg-black">
			<div class="space-y-4">
				<HabitItem />
				<HabitItem />
			</div>
		</div>
		<div class="h-20 w-1/2 bg-black">RIGHT</div>
	</div>
</div>
