<script lang="ts">
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import UserRecipes from '$lib/components/Recipe/UserRecipes.svelte';
	import NameCard from '$lib/components/Recipe/Utilities/NameCard.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import { page } from '$app/state';
	import { recipeRequest } from '$lib/requests';

	const recipeQuery = createQuery({
		queryKey: queryKeys.getOtherUserRecipes(page.params.id),
		queryFn: () => recipeRequest.getOtherUserRecipes(page.params.id)
	});

	let recipeList = $derived($recipeQuery?.data?.data?.recipe);
	let user = $derived($recipeQuery?.data?.data?.user);
</script>

<AppLayout withName={false}>
	<NameCard username={user?.username || ''} />
	<UserRecipes {recipeList} {recipeQuery} />
</AppLayout>
