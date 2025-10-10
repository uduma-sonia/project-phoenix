<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/Recipe/View.svelte';
</script>

<AppLayout floatingLink="/recipe/create" tooltipText="Add Recipe">
	<Seo title="Recipe" />
	<View />
</AppLayout>
