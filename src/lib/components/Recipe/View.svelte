<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import GroupScroller from './Utilities/GroupScroller.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';

	const recipeQuery = createQuery({
		queryKey: queryKeys.getRecipes,
		queryFn: () => recipeRequest.getRecipes()
	});

	let recipeList = $derived($recipeQuery?.data?.data?.recipe);
</script>

<div class="pb-24">
	<GroupScroller />

	<div class="relative z-30 mt-5 gap-3 px-3">
		<HabitSearch />
	</div>

	<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
		{#each recipeList as recipe, index (index)}
			<RecipeCard {recipe} />
		{/each}
	</div>
</div>
