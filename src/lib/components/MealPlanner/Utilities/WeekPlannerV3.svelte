<script lang="ts">
	import { MealRequest } from '$lib/requests';
	import { addMonths, subMonths } from 'date-fns';
	import { TimeOfDay, type Meal, type MealResponse } from '../../../../types/meal';
	import { addToast } from '$lib/store/toast';
	import fetchMealsList from '$lib/hooks/fetchMealsList';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import GeneratedShoppingList from '../GeneratedShoppingList.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import DateScroller from '$lib/components/Expense/Utilities/DateScroller.svelte';
	import { BudgetCycle } from '../../../../types/transaction';
	import MonthScroller from './MonthScroller.svelte';
	import Helpers from '$lib/utils/helpers';
	import MealCard from './MealCard.svelte';
	import TrackerUtils from '$lib/components/Habit/Utilities/utils';
	import ProgressLoader from '$lib/components/Common/ProgressLoader.svelte';
	import ButtonV2 from '$lib/components/Common/Form/ButtonV2.svelte';
	// import { openGeneratedShoppingListModal } from '$lib/state/modal.svelte';

	let { selectedPlan, currentWeek = $bindable(new Date()), isError, isLoading } = $props();

	const queryClient = useQueryClient();

	let userQuery = useCurrentUser();
	let currentMonth = $state(new Date());
	let currentDay = $derived(new Date());

	let mealsQuery = $derived(fetchMealsList(selectedPlan?.id, currentDay));
	let mealsList = $derived($mealsQuery?.data?.data?.meals);
	let user = $derived($userQuery?.data?.data?.user);

	let _isLoading = $derived(
		isLoading || $mealsQuery?.status === 'pending' || $mealsQuery?.isLoading
	);
	let _isError = $derived(isError || $mealsQuery?.status === 'error' || $mealsQuery?.isError);

	// let getRecipes = $derived(mealsList?.filter((meal: MealResponse) => meal.recipeDetails?.length));

	function updateSelectedDay(value: any) {
		currentDay = value;
	}

	async function handleMealItemUpdate(data: any, mealId?: string) {
		try {
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

	async function handleSaveNote(data: { note: string }, mealId: string) {
		try {
			await MealRequest.updateMealNote(mealId, data);

			queryClient.invalidateQueries({
				queryKey: queryKeys.getMeals({
					mealPlanId: selectedPlan?.id,
					days: JSON.stringify([TrackerUtils.getISODate(currentDay)])
				})
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	async function handleHasEaten(mealId: string) {
		try {
			await MealRequest.updateHasEaten(mealId);
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
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

<div>
	<div class="my-4 px-3">
		<DateScroller {nextMonth} {prevMonth} {currentMonth} budgetCycle={BudgetCycle.MONTHLY} />
	</div>

	<MonthScroller {currentDay} {updateSelectedDay} {currentMonth} />

	<div class="mt-4 px-3">
		<p class="font-suez mb-4 inline-block text-lg font-medium md:text-xl">
			{Helpers.getRelativeDate(currentDay)}
		</p>

		<ProgressLoader isLoading={_isLoading} error={_isError} />

		{#if !_isLoading && !_isError}
			{#key currentDay}
				<MealCard
					timeOfDay={TimeOfDay.breakfast}
					meal={getMealDetails(mealsList, TimeOfDay.breakfast) as MealResponse}
					{handleMealItemUpdate}
					{currentDay}
					{selectedPlan}
					{handleSaveNote}
					{handleHasEaten}
				/>
				<MealCard
					timeOfDay={TimeOfDay.lunch}
					meal={getMealDetails(mealsList, TimeOfDay.lunch) as MealResponse}
					{handleMealItemUpdate}
					{currentDay}
					{selectedPlan}
					{handleSaveNote}
					{handleHasEaten}
				/>

				<MealCard
					timeOfDay={TimeOfDay.dinner}
					meal={getMealDetails(mealsList, TimeOfDay.dinner) as MealResponse}
					{handleMealItemUpdate}
					{currentDay}
					{selectedPlan}
					{handleSaveNote}
					{handleHasEaten}
				/>
				<MealCard
					timeOfDay={TimeOfDay.snack}
					meal={getMealDetails(mealsList, TimeOfDay.snack) as MealResponse}
					{handleMealItemUpdate}
					{currentDay}
					{selectedPlan}
					{handleSaveNote}
					{handleHasEaten}
				/>

				<div class="mt-8 w-fit">
					<ButtonV2
						action={() => {
							addToast('Coming soon', 'success');
							// if (getRecipes?.length > 0) {
							// 	openGeneratedShoppingListModal();
							// } else {
							// 	addToast('Link atleast one recipe first', 'success');
							// }
						}}
						label="Add to shopping list"
						variant="purple"
						size="xs"
					/>
				</div>
			{/key}
		{/if}
	</div>
</div>

<GeneratedShoppingList {mealsList} {user} />
