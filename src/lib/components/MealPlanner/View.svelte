<script lang="ts">
	import { mealsChart } from '$lib/constants/meals';
	import MealItem from './Utilities/MealItem.svelte';
	import WeekScroller from './Utilities/WeekScroller.svelte';
	import WeekLabels from './Utilities/WeekLabels.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import MealsUtils from './Utilities/utils';

	let selectedPlan = $state({
		value: 'Normal diet',
		id: 'normaldiet'
	});

	const meals = [
		{
			day: 'monday',
			timeOfDay: 'breakfast',
			name: 'Pancakes, egg, sausage',
			recipeLink: '/recipe/classic-vanilla-cake?owner=687a9cf8943f0bdec838454c',
			date: '2025-11-17',
			hasEaten: false
		},
		{
			day: 'monday',
			timeOfDay: 'lunch',
			name: 'Fried yam and egg sauce',
			date: '2025-11-17',
			hasEaten: true
		},
		{
			day: 'monday',
			timeOfDay: 'dinner',
			name: 'Chicken salad',
			recipeLink: '/recipe/classic-vanilla-cake?owner=687a9cf8943f0bdec838454c',
			date: '2025-11-17',
			hasEaten: true
		},
		{
			day: 'monday',
			timeOfDay: 'snack',
			name: 'Cookies',
			date: '2025-11-17',
			hasEaten: false
		}
	];
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Plan and track your meals</p>

	<div class="mb-4 flex flex-col-reverse items-center justify-between lg:mb-0 lg:flex-row">
		<div>
			<Dropdown
				options={[
					{
						id: 'Keto',
						value: 'Keto diet'
					}
				]}
				inputClass="border-none"
				shouldSearch={false}
				bind:selectedOption={selectedPlan}
			/>
		</div>

		<WeekScroller />
	</div>

	<div class="px-2">
		<div class="relative overflow-hidden rounded-lg border bg-[#cfc4e7] pt-[40px] pl-[50px]">
			<WeekLabels />

			<div class="item_wrapper">
				<div class="relative z-10 grid grid-cols-4 bg-white">
					{#each mealsChart as meal, index (index)}
						{@const mealData = MealsUtils.getMeal(meal, meals)}

						<MealItem {meal} {mealData} />
					{/each}
				</div>
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
