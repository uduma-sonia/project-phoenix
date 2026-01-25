<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import UserRecipes from '$lib/components/Recipe/UserRecipes.svelte';
	import NameCard from '$lib/components/Recipe/Utilities/NameCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import { RecipeRequest } from '$lib/requests';
	import BackComponent from '$lib/components/Common/BackComponent.svelte';

	const slug = $derived(page.url.searchParams.get('s'));
	const owner = $derived(page.url.searchParams.get('o'));

	const recipeQuery = createQuery({
		queryKey: queryKeys.getOtherUserRecipes(page.params.id),
		queryFn: () => RecipeRequest.getOtherUserRecipes(page.params.id)
	});

	let recipeList = $derived($recipeQuery?.data?.data?.recipe);
	let user = $derived($recipeQuery?.data?.data?.user);
	let backLink = $derived(`/recipe/${slug}?owner=${owner}`);
</script>

<AppLayout withName={false}>
	{#if slug && owner}
		<div class="px-4 pt-3">
			<BackComponent {backLink} />
		</div>
	{/if}

	<NameCard username={user?.username || ''} avatar={user?.avatar} />
	<UserRecipes {recipeList} {user} {recipeQuery} />
</AppLayout>
