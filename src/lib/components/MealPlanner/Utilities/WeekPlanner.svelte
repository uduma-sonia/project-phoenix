<script lang="ts">
	import MealItem from './MealItem.svelte';
	import MealsUtils from './utils';
	import WeekLabels from './WeekLabels.svelte';
	import WeekScroller from './WeekScroller.svelte';
	import { MealRequest } from '$lib/requests';
	import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
	import type { Meal } from '../../../../types/meal';
	import { addToast } from '$lib/store/toast';
	import fetchMealsList from '$lib/hooks/fetchMealsList';

	let { selectedPlan } = $props();

	let currentWeek = $state(new Date());

	const weekDates = $derived(
		eachDayOfInterval({
			start: startOfWeek(currentWeek),
			end: endOfWeek(currentWeek)
		})
	);
	let mealsQuery = $derived(fetchMealsList(selectedPlan?.id, currentWeek));
	let mealsList = $derived($mealsQuery?.data?.data?.meals);

	function updateCurrentWeek(value: any) {
		currentWeek = value;
	}

	async function handleMealItemUpdate(mealId: string, data: Meal) {
		if (selectedPlan.id) {
			try {
				if (mealId) {
					await MealRequest.updateMeal(mealId, { ...data, mealPlanId: selectedPlan?.id });
				} else {
					await MealRequest.createMeal({ ...data, mealPlanId: selectedPlan?.id });
				}
			} catch (error) {
				addToast(`Meal could not be saved`, 'error');
			}
		} else {
			addToast(`Create a meal plan first`, 'error');
		}
	}
</script>

{#snippet timeOfDay(title: string)}
	<div
		class="font-lexend flex h-10 items-center justify-center border bg-[#cfc4e7] px-4 text-center text-sm md:text-base"
	>
		{title}
	</div>
{/snippet}

<div>
	<WeekScroller {currentWeek} {updateCurrentWeek} />

	<div class="px-3">
		<div class="relative overflow-hidden rounded-lg border bg-[#cfc4e7] pt-[0px] pl-[50px]">
			<WeekLabels />

			<div>
				{#key mealsList}
					<div
						class="no-scrollbar relative z-10 grid grid-cols-[repeat(4,minmax(200px,1fr))] overflow-x-auto bg-white md:grid-cols-4 md:overflow-x-visible"
					>
						{@render timeOfDay('Breakfast')}
						{@render timeOfDay('Lunch')}
						{@render timeOfDay('Dinner')}
						{@render timeOfDay('Snacks')}

						{#each MealsUtils.mapMealsToWeek(weekDates) as meal, index (index)}
							{@const mealData = MealsUtils.getMeal(meal, mealsList)}

							<MealItem {handleMealItemUpdate} {meal} {mealData} />
						{/each}

						{@render timeOfDay('Breakfast')}
						{@render timeOfDay('Lunch')}
						{@render timeOfDay('Dinner')}
						{@render timeOfDay('Snacks')}
					</div>
				{/key}
			</div>
		</div>
	</div>
</div>
