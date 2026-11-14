<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import GroupScroller from './Utilities/GroupScroller.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { RecipeRequest } from '$lib/requests';
	import RecipeUtils from './Utilities/utils';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import ManageRecipeGroup from '../Modals/ManageRecipeGroup.svelte';
	import ProgressLoader from '../Common/ProgressLoader.svelte';

	let searchQuery = $state('');
	let currentTab = $state('All');

	let userQuery = useCurrentUser(Boolean());
	let user = $derived($userQuery?.data?.data?.user);

	let recipeQuery = createQuery({
		queryKey: queryKeys.getRecipes,
		queryFn: () => RecipeRequest.getRecipes()
	});

	let recipeList = $derived($recipeQuery?.data?.data?.recipes);
	let filteredRecipeList = $derived(
		RecipeUtils.getlist(recipeList, currentTab, user?._id, searchQuery)
	);

	let groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => RecipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);
	let isLoading = $derived($recipeQuery?.status === 'pending' || $recipeQuery?.isLoading);
	let isError = $derived($recipeQuery?.status === 'error' || $recipeQuery?.isError);

	function handleChangeTab(tab: string) {
		currentTab = tab;
	}
</script>

<div class="pb-44">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Manage, organize and share your recipes
	</p>
	<div class="relative z-30 mt-5 flex items-center justify-between gap-3 px-3">
		<HabitSearch bind:searchQuery placeholder="Search recipes..." />
	</div>

	<GroupScroller {groupList} {handleChangeTab} {currentTab} {user} />
	<ProgressLoader
		{isLoading}
		error={isError}
		isEmpty={!isLoading && !isError && recipeList?.length === 0}
		emptyTitle="No recipes saved"
		emptyDescription="Cooking inspiration starts here. Save your favorite recipes in one place."
	/>

	{#if !isLoading && !isError}
		<div class="mt-6 grid grid-cols-1 gap-3 px-3 sm:gap-6 md:mt-8 md:grid-cols-2">
			{#if !$recipeQuery?.isLoading && filteredRecipeList?.length > 0}
				{#each filteredRecipeList as recipe, index (index)}
					<RecipeCard {recipe} />
				{/each}
			{/if}
		</div>
	{/if}
</div>

<ManageRecipeGroup {groupList} />
