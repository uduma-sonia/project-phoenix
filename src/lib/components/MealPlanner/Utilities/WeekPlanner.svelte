<script lang="ts">
	import { mealsChart } from '$lib/constants/meals';
	import { createQuery, useQueryClient } from '@tanstack/svelte-query';
	import MealItem from './MealItem.svelte';
	import MealsUtils from './utils';
	import WeekLabels from './WeekLabels.svelte';
	import WeekScroller from './WeekScroller.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { MealRequest } from '$lib/requests';
	import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
	import TrackerUtils from '$lib/components/Habit/Utilities/utils';
	import type { Meal } from '../../../../types/meal';
	import { addToast } from '$lib/store/toast';

	let { selectedPlan } = $props();

	let currentWeek = $state(new Date());
	const queryClient = useQueryClient();

	function getDaysList(currentWeek: any) {
		const daysInterval = eachDayOfInterval({
			start: startOfWeek(currentWeek),
			end: endOfWeek(currentWeek)
		});

		const result = daysInterval.map((item) => TrackerUtils.getISODate(item));

		return JSON.stringify(result);
	}

	let mealsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getMeals({
				mealPlanId: selectedPlan?.id,
				days: getDaysList(currentWeek)
			}),
			queryFn: () =>
				MealRequest.getMeals({ mealPlanId: selectedPlan?.id, days: getDaysList(currentWeek) })
		})
	);
	let mealsList = $derived($mealsQuery?.data?.data?.meals);

	function updateCurrentWeek(value: any) {
		currentWeek = value;
	}

	async function handleMealItemUpdate(mealId: string, data: Meal) {
		try {
			if (mealId) {
				await MealRequest.updateMeal(mealId, { ...data, mealPlanId: selectedPlan?.id });
			} else {
				await MealRequest.createMeal({ ...data, mealPlanId: selectedPlan?.id });
			}
		} catch (error) {
			addToast(`Meal could not be saved`, 'error');
		}
	}

	const weekDates = $derived(
		eachDayOfInterval({
			start: startOfWeek(currentWeek),
			end: endOfWeek(currentWeek)
		})
	);
</script>

<div>
	<WeekScroller {currentWeek} {updateCurrentWeek} />

	<div class="px-4">
		<div class="relative overflow-hidden rounded-lg border bg-[#cfc4e7] pt-[40px] pl-[50px]">
			<WeekLabels />

			<div class="item_wrapper">
				{#key mealsList}
					<div class="relative z-10 grid grid-cols-4 bg-white">
						{#each MealsUtils.mapMealsToWeek(weekDates) as meal, index (index)}
							{@const mealData = MealsUtils.getMeal(meal, mealsList)}

							<MealItem {handleMealItemUpdate} {meal} {mealData} />
						{/each}
					</div>
				{/key}
			</div>
		</div>
	</div>
</div>

<style>
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 4px;
		left: 4px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}
</style>
