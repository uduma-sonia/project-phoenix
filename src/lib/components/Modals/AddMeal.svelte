<script lang="ts">
	import { closeMealPlannerModal, modalsState, selectedMeal } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import { Check } from '@lucide/svelte';
	import type { RecipeResponse } from '../../../types/recipe';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { addToast } from '$lib/store/toast';
	import { MealRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import MealsUtils from '../MealPlanner/Utilities/utils';

	let { recipeList, selectedPlan, currentWeek } = $props();

	const queryClient = useQueryClient();

	let hasEaten = $derived(selectedMeal?.data?.hasEaten);
	let mealName = $derived(selectedMeal?.data?.name);
	let namePlaceholder = $derived(`What did you eat for ${selectedMeal?.data?.timeOfDay}`);

	let recipeOptions = $derived(
		recipeList?.length > 0
			? recipeList?.map((item: RecipeResponse) => {
					return {
						id: item._id,
						value: item.name
					};
				})
			: []
	);

	let selectedRecipe = $state({
		id: '',
		value: ''
	});

	async function handleSubmit() {
		try {
			const payload = {
				name: mealName,
				date: selectedMeal?.data?.date,
				timeOfDay: selectedMeal?.data?.timeOfDay,
				day: selectedMeal?.data?.day,
				hasEaten,
				mealPlanId: selectedPlan?.id,
				recipeIds: [selectedRecipe?.id]
			};

			if (selectedMeal?.data?._id) {
				await MealRequest.updateMeal(selectedMeal?.data?._id, payload);
			} else {
				await MealRequest.createMeal(payload);
			}

			queryClient.invalidateQueries({
				queryKey: queryKeys.getMeals({
					mealPlanId: selectedPlan?.id,
					days: MealsUtils.getDaysList(currentWeek)
				})
			});
			closeMealPlannerModal();
		} catch (error) {
			addToast(`Meal could not be saved`, 'error');
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenMealPlanner}
	onClose={closeMealPlannerModal}
	label={`Add ${selectedMeal?.data?.timeOfDay}`}
>
	<div class="p-4">
		<div>
			<BasicInputField
				inputMode="numeric"
				label="Meal name"
				type="text"
				id="name"
				name="name"
				required
				bind:value={mealName}
				placeholder={namePlaceholder}
			/>
		</div>
		<div class="my-6">
			{#if recipeOptions?.length > 0}
				<Dropdown
					placeholder="Search and link your recipes"
					bind:selectedOption={selectedRecipe}
					label="Link recipe"
					withClearButton
					options={recipeOptions}
				/>
			{/if}
		</div>

		<div class="mt-6 flex items-center gap-2">
			<button
				class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
				aria-label="Private"
				type="button"
				onclick={() => (hasEaten = !hasEaten)}
			>
				{#if hasEaten}
					<Check size="22px" />
				{/if}
			</button>
			<p class="font-lexend text-sm font-light">Has eaten</p>
		</div>
		<div class="mt-16 flex items-center justify-end gap-5">
			<div class="flex-1">
				<BasicButton action={closeMealPlannerModal} label="Cancel" variant="error" />
			</div>
			<div class="w-[60%]">
				<BasicButton action={handleSubmit} label="Save" variant="primary" />
			</div>
		</div>
	</div>
</ModalWrapper>
