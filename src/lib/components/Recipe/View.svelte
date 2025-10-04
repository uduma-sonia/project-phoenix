<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import GroupScroller from './Utilities/GroupScroller.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { recipeRequest } from '$lib/requests';
	import LoaderError from '../Common/LoaderError.svelte';
	import RecipeUtils from './Utilities/utils';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import type { RecipeResponse } from '../../../types/recipe';

	let searchQuery = $state('');
	let currentTab = $state('All');

	let userQuery = useCurrentUser(Boolean());
	let user = $derived($userQuery?.data?.data?.user);

	let recipeQuery = createQuery({
		queryKey: queryKeys.getRecipes,
		queryFn: () => recipeRequest.getRecipes()
	});

	let recipeList = $derived($recipeQuery?.data?.data?.recipes);
	let filteredRecipeList = $derived(RecipeUtils.getlist(recipeList, currentTab));

	function handleChangeTab(tab: string) {
		currentTab = tab;
	}
</script>

<div class="pb-24">
	<GroupScroller {handleChangeTab} {currentTab} />

	<div class="relative z-30 mt-5 gap-3 px-3">
		<HabitSearch bind:searchQuery placeholder="Search recipe" />
	</div>

	<LoaderError isLoading={$recipeQuery?.isLoading} error={$recipeQuery?.isError} />

	{#if filteredRecipeList?.length > 0}
		<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4">
			{#if !$recipeQuery?.isLoading && filteredRecipeList?.length > 0}
				{#each filteredRecipeList as recipe, index (index)}
					<RecipeCard {recipe} userId={user?._id} />
				{/each}
			{/if}
		</div>
	{/if}
</div>
