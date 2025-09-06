<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import CreateRecipe from '$lib/components/Recipe/CreateRecipe.svelte';
</script>

<AppLayout withName={false}>
	<Seo title="Phoenix - Create recipe" />

	<CreateRecipe />
</AppLayout>
