<script lang="ts">
	import MealItem from './MealItem.svelte';
	import MealsUtils from './utils';
	import { MealRequest } from '$lib/requests';
	import {
		addMonths,
		eachDayOfInterval,
		endOfWeek,
		format,
		isSameDay,
		startOfWeek,
		subMonths
	} from 'date-fns';
	import { TimeOfDay, type Meal, type MealResponse } from '../../../../types/meal';
	import { addToast } from '$lib/store/toast';
	import fetchMealsList from '$lib/hooks/fetchMealsList';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import GeneratedShoppingList from '../GeneratedShoppingList.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import SelectField from '$lib/components/Common/Form/SelectField.svelte';
	import DateScroller from '$lib/components/Expense/Utilities/DateScroller.svelte';
	import { BudgetCycle } from '../../../../types/transaction';
	import MonthScroller from './MonthScroller.svelte';
	import Helpers from '$lib/utils/helpers';
	import MealCard from './MealCard.svelte';
	import TrackerUtils from '$lib/components/Habit/Utilities/utils';

	let { selectedPlan, currentWeek = $bindable(new Date()), mealsOptions, moreOptions } = $props();

	const queryClient = useQueryClient();

	let userQuery = useCurrentUser();
	let meal_items_container: any;
	let currentMonth = $state(new Date());
	let currentDay = $derived(new Date());

	const weekDates = $derived(
		eachDayOfInterval({
			start: startOfWeek(currentWeek),
			end: endOfWeek(currentWeek)
		})
	);

	let mealsQuery = $derived(fetchMealsList(selectedPlan?.id, currentDay));
	let mealsList = $derived($mealsQuery?.data?.data?.meals);
	let user = $derived($userQuery?.data?.data?.user);

	function updateCurrentWeek(value: any) {
		currentWeek = value;
	}

	function updateSelectedDay(value: any) {
		currentDay = value;
	}

	async function handleMealItemUpdate(data: any, mealId?: string) {
		try {
			console.log(data);
			if (data?.name) {
				if (mealId) {
					await MealRequest.updateMeal(mealId, { ...data, mealPlanId: selectedPlan?.id });
				} else {
					await MealRequest.createMeal({ ...data, mealPlanId: selectedPlan?.id });
				}
			}

			queryClient.invalidateQueries({
				queryKey: queryKeys.getMeals({
					mealPlanId: selectedPlan?.id,
					days: JSON.stringify([TrackerUtils.getISODate(currentDay)])
				})
			});
		} catch (error) {
			addToast(`Meal could not be saved`, 'error');
		}
	}

	const prevMonth = () => {
		currentMonth = subMonths(currentMonth, 1);
	};

	const nextMonth = () => {
		currentMonth = addMonths(currentMonth, 1);
	};

	const getMealDetails = (mealsList: MealResponse[], timeOfDay: TimeOfDay) => {
		const meal = mealsList?.find(
			(meal) => (meal?.timeOfDay || 'breakfast').toLowerCase() === timeOfDay.toLowerCase()
		);
		return meal as Meal;
	};
</script>

{#snippet dayOfWeek(title: string, sub: string, isToday: boolean)}
	<div
		class="font-lexend flex h-10 w-[150px] min-w-[150px] items-center justify-center border border-t-0 border-r-0 bg-[#cfc4e7] px-4 text-center text-sm font-normal"
		id={isToday ? 'today-button' : undefined}
	>
		<div class="flex flex-col" class:border-2={isToday} class:border-brand-error={isToday}>
			<span>
				{title}
			</span>
			<span class="text-13 font-light">
				{sub}
			</span>
		</div>
	</div>
{/snippet}

<div>
	<div class="my-4 px-3">
		<DateScroller {nextMonth} {prevMonth} {currentMonth} budgetCycle={BudgetCycle.MONTHLY} />
	</div>

	<MonthScroller {currentDay} {updateSelectedDay} {currentMonth} />

	<div class="mt-4 px-3">
		<p class="font-suez mb-4 inline-block text-lg font-medium md:text-xl">
			{Helpers.getRelativeDate(currentMonth)}
		</p>

		<MealCard
			timeOfDay={TimeOfDay.breakfast}
			meal={getMealDetails(mealsList, TimeOfDay.breakfast) as MealResponse}
			{handleMealItemUpdate}
			{currentDay}
			{selectedPlan}
		/>
		<MealCard
			timeOfDay={TimeOfDay.lunch}
			meal={getMealDetails(mealsList, TimeOfDay.lunch) as MealResponse}
			{handleMealItemUpdate}
			{currentDay}
			{selectedPlan}
		/>
		<MealCard
			timeOfDay={TimeOfDay.dinner}
			meal={getMealDetails(mealsList, TimeOfDay.dinner) as MealResponse}
			{handleMealItemUpdate}
			{currentDay}
			{selectedPlan}
		/>
		<MealCard
			timeOfDay={TimeOfDay.snack}
			meal={getMealDetails(mealsList, TimeOfDay.snack) as MealResponse}
			{handleMealItemUpdate}
			{currentDay}
			{selectedPlan}
		/>
	</div>

	<!-- <div class="px-3 pt-50">
		<div
			class="relative overflow-hidden rounded-lg border bg-[#cfc4e7] pt-[0px] pl-[70px] md:pl-[75px]"
		>
			<Ylabels {weekDates} />

			<div class="h-[650px]">
				<div
					bind:this={meal_items_container}
					class="meal_items_container grid h-full grid-cols-7 overflow-x-auto border"
					style="grid-template-columns: repeat(7, minmax(150px, 1fr));"
				>
					{#each weekDates as item, index (index)}
						{@const isToday = isSameDay(new Date(item), new Date())}

						{@render dayOfWeek(
							format(new Date(item), 'iii'),
							format(new Date(item), 'dd'),
							isToday
						)}
					{/each}

					{#each MealsUtils.mapMealsToWeek(weekDates) as meal, index (index)}
						{@const mealData = MealsUtils.getMeal(meal, mealsList)}

						<MealItem
							{handleMealItemUpdate}
							{meal}
							{mealData}
							hasMealPlan={Boolean(selectedPlan?.id)}
						/>
					{/each}
				</div>
			</div>
		</div>

		<div class="mt-6 flex items-center justify-center gap-5">
			<div>
				<button
					class="shadow_button shadow_button_sm shadow_button_thin"
					onclick={handleScrollLeft}
				>
					<span class="block rotate-180">
						<Play />
					</span>
				</button>
			</div>

			<div>
				<button
					onclick={handleScrollRight}
					class="shadow_button shadow_button_sm shadow_button_thin"
				>
					<Play />
				</button>
			</div>
		</div>
	</div> -->
</div>

<GeneratedShoppingList {mealsList} {user} />

<!-- <style>
	.meal_items_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}
</style> -->
