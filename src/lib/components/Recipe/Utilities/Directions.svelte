<script lang="ts">
	import { type Recipe } from '../../../../types/recipe';
	import { handleSelectItem, selectedRecipeList } from '$lib/state/recipe.svelte';
	import DirectionItem from './DirectionItem.svelte';
	import { ChevronDown, ChevronRight } from '@lucide/svelte';

	let { recipe }: { recipe: Recipe } = $props();

	let showInfo = $state(true);
</script>

{#if recipe?.directions && recipe.directions.length}
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
			<h3 class="text-lg md:text-xl">Directions</h3>
		</button>
		{#if showInfo}
			<div class="space-y-2">
				{#each recipe.directions as direction, index (index)}
					{@const isSelected = selectedRecipeList?.data?.includes(direction.name)}
					<DirectionItem {index} {isSelected} {direction} {handleSelectItem} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
