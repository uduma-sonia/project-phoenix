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
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { addToast } from '$lib/store/toast';

	const token = $derived(Helpers.getCookie(AUTH_TOKEN));
	const ownerId = $derived(page.url.searchParams.get('owner'));

	let userQuery = $derived(useCurrentUser(Boolean(token)));
	let user = $derived($userQuery?.data?.data?.user);

	const detailsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getSingleRecipe(page.params.id, ownerId as string),
			queryFn: () => recipeRequest.getSingleRecipe(page.params.id, ownerId as string)
		})
	);
	const recipe: RecipeResponse = $derived($detailsQuery?.data?.data?.recipe);

	const savesQuery = $derived(
		createQuery({
			queryKey: queryKeys.getRecipeSaveList(recipe?._id),
			queryFn: () => recipeRequest.getRecipeSaveList(recipe?._id),
			enabled: !!recipe?._id
		})
	);

	const saves: { users: string[]; total: number } = $derived($savesQuery?.data?.data);

	onMount(() => {
		if (!ownerId) {
			addToast('Invalid link', 'error');
			goto('/recipe');
		}
	});
</script>

<AppLayout withName={false}>
	<SEO title={recipe?.name || 'Recipe'} />
	<LoaderError isLoading={$detailsQuery?.isLoading} error={$detailsQuery?.isError} />
	<DetailsView
		savesList={saves?.users}
		saveTotal={saves?.total}
		{recipe}
		{detailsQuery}
		{user}
		isLoggedIn={Boolean(token)}
	/>
</AppLayout>

<DeleteRecipeModal label="Recipe" />
<ImageCarousel />
