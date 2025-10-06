<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import EditRecipe from '$lib/components/Recipe/EditRecipe.svelte';
	import { recipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import type { RecipeResponse } from '../../../../../types/recipe';

	const ownerId = $derived(page.url.searchParams.get('owner'));

	const recipeQuery = $derived(
		createQuery({
			queryKey: queryKeys.getSingleRecipe(page.params.id, ownerId as string),
			queryFn: () => recipeRequest.getSingleRecipe(page.params.id, ownerId as string)
		})
	);

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => recipeRequest.getRecipeGroups()
	});

	let recipe: RecipeResponse = $derived($recipeQuery?.data?.data?.recipe);
	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);
</script>

<AppLayout withName={false}>
	<Seo title={recipe?.name || 'Edit recipe'} />

	{#if recipe?._id}
		<EditRecipe {recipe} {groupList} />
	{/if}
</AppLayout>
