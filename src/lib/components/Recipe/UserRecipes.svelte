<script lang="ts">
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';

	let { recipeList, recipeQuery } = $props();
</script>

<div>
	<div>
		<h3 class="font-suez p-3 text-xl">All recipes</h3>

		<div class="relative z-30 mt-4 gap-3 px-3">
			<HabitSearch />
		</div>

		<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#if !$recipeQuery?.isLoading && recipeList?.length > 0}
				{#each recipeList as recipe, index (index)}
					<RecipeCard {recipe} />
				{/each}
			{/if}
		</div>
	</div>
</div>
