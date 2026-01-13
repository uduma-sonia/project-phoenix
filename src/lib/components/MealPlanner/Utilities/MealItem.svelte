<script lang="ts">
	import { handleSelectMeal, openMealPlannerModal } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { Check, Plus } from '@lucide/svelte';

	let { meal, mealData, handleMealItemUpdate } = $props();

	let hasEaten = $derived(mealData?.hasEaten);

	function getFirstRecipeImage(recipes: any) {
		if (!recipes?.length) return '';
		for (const recipe of recipes) {
			if (Array.isArray(recipe.images) && recipe.images.length > 0) {
				return recipe.images[0];
			}
		}
		return null;
	}

	function handleHasEaten() {
		if (mealData?._id) {
			if (mealData?.name) {
				handleMealItemUpdate(mealData?._id, {
					hasEaten: !hasEaten,
					date: meal.date,
					timeOfDay: meal.timeOfDay,
					day: meal.day
				});
				hasEaten = !hasEaten;
			} else {
				addToast('Write down what you ate first', 'error');
			}
		}
	}

	let _image = $derived(getFirstRecipeImage(mealData?.recipeDetails));
</script>

<div
	class="no-scrollbar relative flex h-[150px] min-w-[150px] items-start justify-center overflow-y-auto border bg-white"
>
	{#if mealData}
		<button
			class="font-lexend text-13 flex h-full w-full flex-col p-1 text-center font-light md:text-sm"
			onclick={() => {
				openMealPlannerModal();
				handleSelectMeal({ ...meal, ...mealData });
			}}
		>
			<span
				class="withoutImage flex w-full items-center justify-center"
				class:withImage={Boolean(_image)}
			>
				<span class="line-clamp-3">
					{mealData?.name}
				</span>
			</span>

			{#if _image}
				<span class="block h-[45%] w-full px-1">
					<img src={_image} class="h-full w-full rounded-lg object-cover" alt="" />
				</span>
			{/if}
		</button>
	{:else}
		<button
			class="flex h-full w-full items-center justify-center"
			onclick={() => {
				openMealPlannerModal();
				handleSelectMeal({ ...meal, ...mealData });
			}}
		>
			<Plus size="16px" />
		</button>
	{/if}

	<div class="absolute right-1 bottom-1 flex w-full items-center justify-end gap-5">
		<button
			class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border bg-white p-0"
			class:hasEaten
			class:hasId={mealData?._id}
			onclick={() => handleHasEaten()}
		>
			{#if hasEaten}
				<Check size="16px" color="#1eb564" strokeWidth={4} />
			{/if}
		</button>
	</div>
</div>

<style>
	.withImage {
		height: 55%;
	}
	.withoutImage {
		height: 100%;
	}
	/* .hasEaten {
		background-color: #8cbf80;
		border: none;
	}
	.hasId {
		opacity: 1;
	} */
</style>
