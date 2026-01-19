<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { MealRequest, RecipeRequest } from '$lib/requests';
	import { Plus, SquarePen, Trash, ChartNetwork, Import } from '@lucide/svelte';
	import { type Options } from '../Common/HamburgerDropdown.svelte';
	import type { MealPlan } from '../../../types/meal';
	import Seo from '$lib/components/Common/SEO.svelte';
	import { openCreateMealPlanModal, openDeleteMealPlanModal } from '$lib/state/modal.svelte';
	import WeekPlannerV2 from './Utilities/WeekPlannerV2.svelte';
	import AddMeal from '../Modals/AddMeal.svelte';
	import { addToast } from '$lib/store/toast';
	import Helpers from '$lib/utils/helpers';

	let mealPlansQuery = createQuery({
		queryKey: queryKeys.getMealPlans,
		queryFn: () => MealRequest.getMealPlans()
	});
	let currentWeek = $state(new Date());

	let mealPlansList = $derived($mealPlansQuery?.data?.data?.mealPlans);
	let mealsOptions = $derived(
		mealPlansList?.map((item: MealPlan) => {
			return {
				id: item._id,
				value: item.name
			};
		}) || []
	);

	let recipeQuery = createQuery({
		queryKey: queryKeys.getRecipes,
		queryFn: () => RecipeRequest.getRecipes()
	});
	// let uniqueMealsQuery = createQuery({
	// 	queryKey: queryKeys.getUserUniqueMeals,
	// 	queryFn: () => MealRequest.getUserUniqueMeals()
	// });

	let recipeList = $derived($recipeQuery?.data?.data?.recipes);
	let selectedPlan = $derived(mealsOptions[0] || {});
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

	function _comingsoon() {
		addToast('Coming soon', 'success');
	}

	const moreOptions: Options[] = $derived([
		{
			label: 'Create new plan',
			icon: Plus,
			action: createMealPlan
		},
		{
			label: 'Import last week plan',
			icon: Import,
			action: _comingsoon
		},
		{
			label: 'Edit plan',
			icon: SquarePen,
			action: updateMealPlan
		},
		{
			label: 'Insight',
			icon: ChartNetwork,
			link: `/meal-planner/insight?plan=${selectedPlan?.value}`
		},
		{
			label: 'Delete plan',
			icon: Trash,
			iconColor: 'red',
			action: deleteMealPlanner
		}
	]);

	$effect(() => {
		if (mealPlansList?.length === 0) {
			openCreateMealPlanModal();
		}
	});
</script>

<Seo title={seoTitle} />

<div class="pb-24">
	<!-- <p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Keep track of your meals</p> -->

	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		What are you eating this {Helpers.getTimeOfDay()}?
	</p>

	<WeekPlannerV2 {moreOptions} {mealsOptions} {currentWeek} {selectedPlan} />
</div>

<AddMeal {recipeList} {selectedPlan} {currentWeek} />
