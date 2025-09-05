<script lang="ts">
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import GroupScroller from './Utilities/GroupScroller.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';
</script>

<div class="pb-24">
	<GroupScroller />

	<div class="relative z-30 mt-5 gap-3 px-3">
		<HabitSearch />
	</div>

	<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
		<RecipeCard recipe={{ name: 'Fluffy pancakes' }} />
	</div>
</div>
