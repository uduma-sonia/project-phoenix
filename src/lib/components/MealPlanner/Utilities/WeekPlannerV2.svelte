<script lang="ts">
	import MealItem from './MealItem.svelte';
	import MealsUtils from './utils';
	import WeekScroller from './WeekScroller.svelte';
	import { MealRequest } from '$lib/requests';
	import { eachDayOfInterval, endOfWeek, startOfWeek } from 'date-fns';
	import type { Meal } from '../../../../types/meal';
	import { addToast } from '$lib/store/toast';
	import fetchMealsList from '$lib/hooks/fetchMealsList';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import Ylabels from './Ylabels.svelte';
	import { Play } from '@lucide/svelte';
	import Dropdown from '$lib/components/Common/Form/Dropdown.svelte';
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';

	let { selectedPlan, currentWeek = $bindable(new Date()), mealsOptions, moreOptions } = $props();
	const queryClient = useQueryClient();
	let meal_items_container: any;

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

				queryClient.invalidateQueries({
					queryKey: queryKeys.getMeals({
						mealPlanId: selectedPlan?.id,
						days: MealsUtils.getDaysList(currentWeek)
					})
				});
			} catch (error) {
				addToast(`Meal could not be saved`, 'error');
			}
		} else {
			addToast(`Create a meal plan first`, 'error');
		}
	}

	const handleScrollLeft = () => {
		meal_items_container.scrollLeft -= 300;
	};
	const handleScrollRight = () => {
		meal_items_container.scrollLeft += 300;
	};
</script>

{#snippet dayOfWeek(title: string)}
	<div
		class="font-lexend flex h-10 w-[150px] min-w-[150px] items-center justify-center border border-t-0 border-r-0 bg-[#cfc4e7] px-4 text-center text-sm font-normal"
	>
		{title}
	</div>
{/snippet}

<div>
	<div class="my-4 block justify-between px-3 md:flex">
		<WeekScroller {currentWeek} {updateCurrentWeek} />

		<div class="mt-4 flex items-center gap-4 md:mt-0">
			<div class="w-full rounded-xl bg-white">
				<Dropdown options={mealsOptions} shouldSearch={false} bind:selectedOption={selectedPlan} />
			</div>

			<div>
				<HamburgerDropdown variant="solid" options={moreOptions} />
			</div>
		</div>
	</div>

	<div class="px-3 pt-3">
		<div
			class="relative overflow-hidden rounded-lg border bg-[#cfc4e7] pt-[0px] pl-[70px] md:pl-[80px]"
		>
			<Ylabels {weekDates} />

			<div class="h-[650px]">
				<div
					bind:this={meal_items_container}
					class="meal_items_container grid h-full grid-cols-7 overflow-x-auto border"
					style="grid-template-columns: repeat(7, minmax(150px, 1fr));"
				>
					{@render dayOfWeek('Sun')}
					{@render dayOfWeek('Mon')}
					{@render dayOfWeek('Tue')}
					{@render dayOfWeek('Wed')}
					{@render dayOfWeek('Thu')}
					{@render dayOfWeek('Fri')}
					{@render dayOfWeek('Sat')}

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
	</div>
</div>

<style>
	.meal_items_container {
		transition: all 0.3s linear;
		scroll-behavior: smooth;
	}
</style>
