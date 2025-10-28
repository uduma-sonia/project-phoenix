<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import CreateRecipe from '$lib/components/Recipe/CreateRecipe.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import { RecipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => RecipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);
</script>

<AppLayout withName={false}>
	<Seo title="Create recipe" />
	{#if user}
		<CreateRecipe {groupList} {user} />
	{/if}
</AppLayout>
