<script lang="ts">
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import BackComponent from '../Common/BackComponent.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { MealRequest } from '$lib/requests';
	import { Plus, SquarePen, Trash, ChartNetwork } from '@lucide/svelte';
	import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';
	import type { MealPlan } from '../../../types/meal';
	import WeekPlanner from './Utilities/WeekPlanner.svelte';
	import Seo from '$lib/components/Common/SEO.svelte';
	import { openCreateMealPlanModal, openDeleteMealPlanModal } from '$lib/state/modal.svelte';

	let mealPlansQuery = createQuery({
		queryKey: queryKeys.getMealPlans,
		queryFn: () => MealRequest.getMealPlans()
	});

	let mealPlansList = $derived($mealPlansQuery?.data?.data?.mealPlans);
	let mealsOptions = $derived(
		mealPlansList?.map((item: MealPlan) => {
			return {
				id: item._id,
				value: item.name
			};
		}) || []
	);
	let selectedPlan = $derived(mealsOptions[0] || []);
	let seoTitle = $derived(selectedPlan?.value || 'Meal planner');

	function deleteMealPlanner() {
		openDeleteMealPlanModal(selectedPlan);
	}

	function createMealPlan() {
		openCreateMealPlanModal();
	}
	function updateMealPlan() {
		openCreateMealPlanModal({
			...selectedPlan,
			isEditing: true,
			description: mealPlansList[0]?.description
		});
	}

	const moreOptions = [
		{
			label: 'Create new plan',
			icon: Plus,
			action: createMealPlan
		},
		{
			label: 'Edit plan',
			icon: SquarePen,
			action: updateMealPlan
		},
		{
			label: 'Insight',
			icon: ChartNetwork
			// action: updateMealPlan
		},
		{
			label: 'Delete plan',
			icon: Trash,
			iconColor: 'red',
			action: deleteMealPlanner
		}
	];
</script>

<Seo title={seoTitle} />

<div class="relative pb-24">
	<div class="my-6 justify-between gap-3 space-y-3 px-3 md:flex md:space-y-0">
		<BackComponent backLink="/recipe" title={selectedPlan?.value} />

		<div class="flex items-center gap-4">
			<div class="rounded-xl bg-white">
				<Dropdown options={mealsOptions} shouldSearch={false} bind:selectedOption={selectedPlan} />
			</div>

			<div>
				<HamburgerDropdown variant="solid" options={moreOptions} />
			</div>
		</div>
	</div>

	<WeekPlanner {selectedPlan} />
</div>
