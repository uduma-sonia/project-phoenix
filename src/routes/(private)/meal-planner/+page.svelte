<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import View from '$lib/components/MealPlanner/View.svelte';
</script>

<AppLayout withName={false}>
	<Seo title="Meal Planner" />
	<View />
</AppLayout>
