<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import CreateRecipe from '$lib/components/Recipe/CreateRecipe.svelte';
	import { recipeRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';

	const groupQuery = createQuery({
		queryKey: queryKeys.getRecipeGroups,
		queryFn: () => recipeRequest.getRecipeGroups()
	});

	let groupList = $derived($groupQuery?.data?.data?.recipeGroups);
</script>

<AppLayout withName={false}>
	<Seo title="Create recipe" />

	<CreateRecipe {groupList} />
</AppLayout>
