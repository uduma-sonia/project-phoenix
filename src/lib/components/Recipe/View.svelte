<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import HabitSearch from '../Habit/Utilities/HabitSearch.svelte';
	import GroupScroller from './Utilities/GroupScroller.svelte';
	import RecipeCard from './Utilities/RecipeCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { RecipeRequest } from '$lib/requests';
	import LoaderError from '../Common/LoaderError.svelte';
	import RecipeUtils from './Utilities/utils';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import EmptyState from '../Common/EmptyState.svelte';
	import { onMount } from 'svelte';

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

	let isLoading = $derived($recipeQuery?.isLoading);
	let isError = $derived($recipeQuery?.isError);
	let hasRecipes = $derived((filteredRecipeList ?? []).length > 0);

	function handleChangeTab(tab: string) {
		currentTab = tab;
	}
	let hasMount = $state(false);

	onMount(() => {
		hasMount = true;
	});
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Manage and organize your recipes
	</p>

	<GroupScroller {handleChangeTab} {currentTab} />

	<div class="relative z-30 mt-5 flex items-center justify-between gap-3 px-3">
		<HabitSearch bind:searchQuery placeholder="Search recipe" />
	</div>

	<LoaderError {isLoading} error={isError} />

	{#if !isLoading && !isError}
		{#if hasRecipes}
			<div class="mt-14 grid grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-3">
				{#if !$recipeQuery?.isLoading && filteredRecipeList?.length > 0}
					{#each filteredRecipeList as recipe, index (index)}
						<RecipeCard {recipe} />
					{/each}
				{/if}
			</div>
		{:else if !isError}
			{#if hasMount}
				<EmptyState
					buttonText="Add Recipe"
					heading="No recipes saved"
					text=" Cooking inspiration starts here. Save your favorite recipes in one place."
					link="/recipe/create"
				/>
			{:else}
				<LoaderError isLoading={true} />
			{/if}
		{/if}
	{/if}
</div>
