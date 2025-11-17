<script>
	import AppLayout from '$lib/components/Common/AppLayout.svelte';
	import View from '$lib/components/MealPlanner/View.svelte';
	import DeleteMealPlan from '$lib/components/Modals/DeleteMealPlan.svelte';
</script>

<AppLayout withName={false}>
	<View />
</AppLayout>

<DeleteMealPlan />
