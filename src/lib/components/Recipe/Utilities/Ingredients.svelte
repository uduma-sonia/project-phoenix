<script lang="ts">
	import { type Recipe } from '../../../../types/recipe';
	import { handleSelectItem, selectedRecipeList } from '$lib/state/recipe.svelte';
	import IngredientItem from './IngredientItem.svelte';
	import { ChevronDown, ChevronRight } from '@lucide/svelte';

	let { recipe, viewedMultiplier = $bindable() }: { recipe: Recipe; viewedMultiplier: any } =
		$props();

	let showInfo = $state(true);
</script>

{#if recipe?.ingredients && recipe.ingredients.length}
	<div class="mt-6">
		<button
			class="mb-2 flex items-center justify-between gap-1"
			onclick={() => (showInfo = !showInfo)}
		>
			{#if showInfo}
				<ChevronDown />
			{:else}
				<ChevronRight />
			{/if}
			<h3 class="text-lg md:text-xl">Ingredients</h3>
		</button>
		{#if showInfo}
			<div class="space-y-2">
				{#each recipe.ingredients as ingredient, index (index)}
					{@const isSelected = selectedRecipeList?.data?.includes(ingredient.name)}
					<IngredientItem
						{viewedMultiplier}
						isChecklist
						{index}
						{isSelected}
						{ingredient}
						{handleSelectItem}
					/>
				{/each}
			</div>
		{/if}
	</div>
{/if}
