<script lang="ts">
	import { Pen, Plus } from '@lucide/svelte';
	import type { Meal, MealResponse } from '../../../../types/meal';
	import CheckBox from '$lib/components/Common/CheckBox.svelte';
	import MealsUtils from './utils';
	import RecipeUsed from './RecipeUsed.svelte';
	import { format } from 'date-fns';

	let {
		timeOfDay,
		meal,
		handleMealItemUpdate,
		currentDay,
		selectedPlan
	}: {
		meal: MealResponse;
		timeOfDay: string;
		handleMealItemUpdate: (data: Meal, mealId?: string) => void;
		currentDay: any;
		selectedPlan: { id: string };
	} = $props();

	let isEditingName = $state(false);
	let inputRef: HTMLInputElement | null = $state(null);
	let _image = $derived(MealsUtils.getFirstRecipeImage(meal?.recipeDetails));
	let recipeList = $derived(MealsUtils.getRecipes(meal?.recipeDetails));
	let mealInput = $state('');
	let mealName = $derived(meal?.name);
	// Prevent double meal creation
	let hasCreated = $state(false);

	function toggleEdit() {
		isEditingName = true;
		setTimeout(() => {
			inputRef?.focus();
		}, 5);
	}

	let createPayload = $derived({
		name: mealInput,
		timeOfDay: timeOfDay,
		mealPlanId: selectedPlan?.id,
		date: format(currentDay, 'yyyy-MM-dd'),
		day: format(currentDay, 'iiii'),
		hasEaten: false
	});

	function handleBlur(event: any) {
		if (!hasCreated) {
			hasCreated = true;
			handleMealItemUpdate(createPayload as Meal, '');
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		switch (event.key) {
			case 'Enter':
				if (!hasCreated) {
					hasCreated = true;
					handleMealItemUpdate(createPayload as Meal, '');
				}
				break;
			case 'Escape':
				isEditingName = false;
				break;
			default:
				if (hasCreated) {
					hasCreated = false;
				}
				break;
		}
	}
</script>

<div class="mb-8 max-w-[550px] space-y-2">
	<div class="flex items-center justify-between gap-4">
		<p
			class="font-lexend bg-primary-biloba-800 mb-1 inline-block rounded-lg px-4 py-1.5 text-sm font-medium text-white capitalize hover:bg-pink-100 md:text-base"
		>
			{timeOfDay}
		</p>
		<CheckBox isChecked={true} action={() => {}} id="hasEaten" />
	</div>
	<div class="flex-1">
		<div class="retro_wrapper balanceCard">
			<div class="retro_wrapper_inner_iwjd">
				<div class="h-auto py-2">
					{#if mealName}
						<div>
							<p
								class="font-lexend bg-primary-biloba-50 mb-1 inline-flex items-center gap-2 rounded-lg border px-2 text-base font-normal hover:bg-pink-100 md:text-lg"
							>
								{mealName}

								<Pen size="13" />
							</p>
						</div>

						{#if _image}
							<div class="mt-4 block h-18 w-18 rounded-xl">
								<img
									src={_image}
									class="text-10 h-full w-full rounded-xl border object-cover"
									alt="First recipe"
								/>
							</div>
						{/if}

						<RecipeUsed {recipeList} />

						<button class="font-lexend text-15 flex items-center gap-1 py-3 font-light italic">
							Notes <Plus size="18" strokeWidth={2.5} />
						</button>
						<div class="mt-4 flex gap-3">
							<CheckBox
								isChecked={true}
								action={() => {}}
								id="homemade"
								variant="circle"
								color="pink"
								title="Homemade"
							/>
							<CheckBox
								isChecked={false}
								action={() => {}}
								id="Delivery"
								title="Delivery"
								variant="circle"
								color="pink"
							/>
							<CheckBox
								isChecked={false}
								action={() => {}}
								id="dineOut"
								title="Dine out"
								variant="circle"
								color="pink"
							/>
						</div>
					{:else}
						<div>
							{#if isEditingName}
								<div>
									<input
										bind:value={mealInput}
										bind:this={inputRef}
										type="text"
										class="font-lexend h-auto w-full border-none p-0 text-base font-normal outline-none md:text-lg"
										placeholder="No meal recorded or planned"
										onblur={handleBlur}
										onkeydown={handleKeyDown}
									/>
								</div>
							{:else}
								<button
									onclick={toggleEdit}
									class="font-lexend flex items-center gap-2 rounded-lg text-base font-light italic md:text-lg"
								>
									No meal recorded or planned
									<Pen size="13" />
								</button>
							{/if}
						</div>
					{/if}
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_iwjd {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 12px !important;
		border: 2px solid black;
		background-color: #fff;
		padding: 2px 12px;
	}

	.balanceCard {
		border-radius: 12px !important;
	}
	.balanceCard::before,
	.balanceCard::after {
		border-radius: 12px !important;
	}
</style>
