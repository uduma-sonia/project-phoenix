<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import EditRecipe from '$lib/components/Recipe/EditRecipe.svelte';
	import { recipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import type { RecipeResponse } from '../../../../../types/recipe';

	const recipeQuery = createQuery({
		queryKey: queryKeys.getRecipes,
		queryFn: () => recipeRequest.getSingleRecipe(page.params.id)
	});

	let recipe: RecipeResponse = $derived($recipeQuery?.data?.data?.recipe);
</script>

<AppLayout withName={false}>
	<Seo title="Edit recipe" />

	{#if recipe?._id}
		<EditRecipe {recipe} />
	{/if}
</AppLayout>
