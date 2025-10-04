<script lang="ts">
	import { page } from '$app/state';
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import DeleteRecipeModal from '$lib/components/Modals/DeleteRecipeModal.svelte';
	import DetailsView from '$lib/components/Recipe/DetailsView.svelte';
	import { AUTH_TOKEN } from '$lib/constants/global';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import Helpers from '$lib/utils/helpers';
	import { createQuery } from '@tanstack/svelte-query';
	import type { RecipeResponse } from '../../../../types/recipe';
	import { recipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import SEO from '$lib/components/Common/SEO.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import ImageCarousel from '$lib/components/Modals/ImageCarousel.svelte';

	const token = $derived(Helpers.getCookie(AUTH_TOKEN));

	let userQuery = $derived(useCurrentUser(Boolean(token)));
	let user = $derived($userQuery?.data?.data?.user);

	const detailsQuery = createQuery({
		queryKey: queryKeys.getSingleRecipe(page.params.id),
		queryFn: () => recipeRequest.getSingleRecipe(page.params.id)
	});
	const recipe: RecipeResponse = $derived($detailsQuery?.data?.data?.recipe);

	const savesQuery = $derived(
		createQuery({
			queryKey: queryKeys.getRecipeSaveList(recipe?._id),
			queryFn: () => recipeRequest.getRecipeSaveList(recipe?._id),
			enabled: !!recipe?._id && !!Boolean(token)
		})
	);

	const saves: { users: string[] } = $derived($savesQuery?.data?.data);
</script>

<AppLayout withName={false}>
	<SEO title={recipe?.name || 'Recipe'} />
	<LoaderError isLoading={$detailsQuery?.isLoading} error={$detailsQuery?.isError} />
	<DetailsView
		savesList={saves?.users}
		{recipe}
		{detailsQuery}
		{user}
		isLoggedIn={Boolean(token)}
	/>
</AppLayout>

<DeleteRecipeModal label="Recipe" />
<ImageCarousel />
