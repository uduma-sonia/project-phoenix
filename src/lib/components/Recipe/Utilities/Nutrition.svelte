<script lang="ts">
	import { ChevronRight, ChevronDown } from '@lucide/svelte';
	import type { Nutrition } from '../../../../types/recipe';

	let { nutrition }: { nutrition: Nutrition } = $props();

	let showFacts = $state(false);
</script>

{#snippet item(label: string, value?: string)}
	{#if value}
		<div class="flex min-w-max items-center gap-1">
			<p class="font-lexend-deca flex items-center gap-1 text-sm font-medium capitalize">
				{label}:
			</p>
			<p class="font-lexend-deca text-sm font-light">{value}</p>
		</div>
	{/if}
{/snippet}

<div>
	<button class="flex items-center gap-1" onclick={() => (showFacts = !showFacts)}>
		{#if showFacts}
			<ChevronDown />
		{:else}
			<ChevronRight />
		{/if}
		Nutrition Facts
	</button>

	{#if showFacts}
		<div class="slide_in_dow mt-3 w-full">
			<div class="mt-4 flex flex-wrap gap-4">
				{@render item('Calories', nutrition.calories)}
				{@render item('Carbonhydrate', nutrition.carbonhydrate)}
				{@render item('Cholesterol', nutrition.cholesterol)}
				{@render item('Total Fat', nutrition.totalFat)}
				{@render item('Saturated Fat', nutrition.saturatedFat)}
				{@render item('Sodium', nutrition.sodium)}
				{@render item('Sugar', nutrition.sugar)}
				{@render item('Dietary Fibers', nutrition.dietaryFibers)}
				{@render item('Protein', nutrition.protein)}
			</div>
		</div>
	{/if}
</div>
