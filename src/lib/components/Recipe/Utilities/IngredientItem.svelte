<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { type Ingredient } from '../../../../types/recipe';
	import RecipeUtils from './utils';

	let {
		isChecklist,
		handleSelectItem,
		isSelected,
		index,
		ingredient,
		viewedMultiplier = $bindable()
	}: {
		ingredient: Ingredient;
		index: number;
		isChecklist?: boolean;
		handleSelectItem?: (name: string) => void;
		isSelected?: boolean;
		viewedMultiplier: any;
	} = $props();
</script>

<div class="flex items-center gap-2">
	<div>
		{#if isChecklist}
			<button
				class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0"
				aria-label="Checklist"
				onclick={() => handleSelectItem?.(ingredient.name)}
			>
				{#if isSelected}
					<Check size="22px" />
				{/if}
			</button>
		{:else}
			<div
				class="button_active font-lexend bg-brand-light relative flex h-5 w-5 items-center justify-center rounded-md border p-0 text-sm font-light"
			>
				{index + 1}
			</div>
		{/if}
	</div>

	<div class="flex-1">
		<p class="font-lexend text-sm font-light md:text-base">
			{RecipeUtils.multiplyRecipeQuantity(ingredient.amount, viewedMultiplier)}
			{ingredient?.unit}
			{ingredient.name}
		</p>
	</div>
</div>
