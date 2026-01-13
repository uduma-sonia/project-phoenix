<script lang="ts">
	import {
		closeMealPlannerModal,
		handleSelectMeal,
		modalsState,
		selectedMeal
	} from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { Check } from '@lucide/svelte';
	import type { RecipeResponse } from '../../../types/recipe';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { addToast } from '$lib/store/toast';
	import { MealRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import MealsUtils from '../MealPlanner/Utilities/utils';
	import TextButton from '../Common/Form/TextButton.svelte';
	import MultiDropdown from '../Common/Form/MultiDropdown.svelte';

	let { recipeList, selectedPlan, currentWeek } = $props();

	const queryClient = useQueryClient();

	let hasEaten = $derived(selectedMeal?.data?.hasEaten);
	let mealName = $derived(selectedMeal?.data?.name);
	let selectedRecipes: any = $state([]);

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

	function getCorrespondingRecipe(id: string) {
		const result = recipeList?.find((item: RecipeResponse) => item._id === id);
		return result;
	}

	function removeRecipe(id: string) {
		const result = selectedRecipes?.filter((item: { id: string }) => item.id !== id);
		selectedRecipes = result;
	}

	function _closeModal() {
		selectedRecipes = [];
		handleSelectMeal();
		closeMealPlannerModal();
	}

	function renderPlaceholderText(timeOfDay: string) {
		if (timeOfDay === 'snack') {
			return 'What did you snack on?';
		} else {
			return `What did you eat for ${timeOfDay}?`;
		}
	}

	async function handleSubmit() {
		try {
			const payload = {
				name: mealName,
				date: selectedMeal?.data?.date,
				timeOfDay: selectedMeal?.data?.timeOfDay,
				day: selectedMeal?.data?.day,
				hasEaten,
				mealPlanId: selectedPlan?.id,
				recipeIds: selectedRecipes?.length > 0 ? selectedRecipes?.map((item: any) => item.id) : []
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
			_closeModal();
		} catch (error) {
			addToast(`Meal could not be updated`, 'error');
		}
	}

	$effect(() => {
		if (selectedMeal?.data?.recipeDetails?.length > 0) {
			const result = selectedMeal?.data?.recipeDetails?.map((item: RecipeResponse) => {
				return {
					id: item._id,
					value: item.name
				};
			});

			selectedRecipes = result;
		}
	});
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenMealPlanner}
	onClose={_closeModal}
	label={`Add ${selectedMeal?.data?.timeOfDay}`}
	helperText={selectedMeal?.data?.day}
>
	<div class="p-4">
		<div class="mb-6">
			<BasicInputField
				inputMode="numeric"
				label="Meal name"
				type="text"
				id="name"
				name="name"
				required
				bind:value={mealName}
				placeholder={renderPlaceholderText(selectedMeal?.data?.timeOfDay)}
			/>
		</div>

		{#if selectedRecipes?.length > 0}
			<div class="mb-6 space-y-2">
				{#each selectedRecipes as recipe}
					{@const _recipe = getCorrespondingRecipe(recipe?.id)}
					<div
						class="flex h-10 items-center justify-between gap-2 rounded-lg border border-gray-400 bg-gray-50 px-3"
					>
						<a
							class="font-lexend text-sm font-light text-[#0c66e4] underline"
							target="_blank"
							href={`/recipe/${_recipe?.slug}?owner=${_recipe?.ownerId}`}>{_recipe?.name}</a
						>

						<div>
							<TextButton
								label="Remove"
								action={() => removeRecipe(recipe?.id)}
								className="text-xs remove_button"
							/>
						</div>
					</div>
				{/each}
			</div>
		{/if}

		<div class="mb-6">
			{#if recipeOptions?.length > 0}
				<!-- <Dropdown
					placeholder="Search and link your recipes"
					bind:selectedOption={selectedRecipes}
					label="Link recipe"
					withClearButton
					options={recipeOptions}
				/> -->
				<MultiDropdown
					placeholder="Search and link your recipes"
					bind:selectedOptions={selectedRecipes}
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
				<BasicButton action={_closeModal} label="Cancel" variant="error" />
			</div>
			<div class="w-[60%]">
				<BasicButton action={handleSubmit} label="Update" variant="primary" />
			</div>
		</div>
	</div>
</ModalWrapper>

<style>
	:global(.remove_button) {
		color: #e7000b !important;
	}
</style>
