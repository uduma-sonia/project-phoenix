<script lang="ts">
	import { ChevronDown, ChevronRight } from '@lucide/svelte';
	import type { Recipe } from '../../../../types/recipe';
	import { AlarmClock, Utensils, Carrot } from '@lucide/svelte';
	import PrepTime from './PrepTime.svelte';

	let { recipe }: { recipe: Recipe } = $props();

	let showFacts = $state(false);
</script>

{#snippet detailItem(label: string, value?: string, Icon?: any)}
	{#if value}
		<div class="flex min-w-max items-center gap-1">
			<p class="font-lexend-deca flex items-center gap-1 text-sm">
				<Icon size="18px" />
				{label}:
			</p>
			<p class="font-lexend-deca text-sm font-light">{value}</p>
		</div>
	{/if}
{/snippet}

<div class="mb-3">
	{#if recipe.description}
		<div class="mb-4">
			<p class="font-lexend text-sm font-light md:text-base">
				{recipe.description}
			</p>
		</div>
	{/if}

	<button class="flex items-center gap-1" onclick={() => (showFacts = !showFacts)}>
		{#if showFacts}
			<ChevronDown />
		{:else}
			<ChevronRight />
		{/if}
		Overview
	</button>

	{#if showFacts}
		<div class="slide_in_dow mt-3 w-full">
			<div class="mt-4 mb-6 flex flex-wrap gap-4">
				<div class="flex min-w-max items-center gap-1">
					<p class="font-lexend-deca flex items-center gap-1 text-sm">
						<Utensils size="16px" />
						Servings:
					</p>
					<p class="font-lexend-deca text-sm font-light">{recipe.servings}</p>
				</div>
				<div class="flex min-w-max items-center gap-1">
					<p class="font-lexend-deca flex items-center gap-1 text-sm">
						<Carrot size="16px" />
						Yield:
					</p>
					<p class="font-lexend-deca text-sm font-light">{recipe.yield}</p>
				</div>
				{#if recipe.prepTime}
					<PrepTime data={recipe.prepTime} label="Prep time" Icon={AlarmClock} />
				{/if}
				{#if recipe.cookTime}
					<PrepTime data={recipe.cookTime} label="Cook time" Icon={AlarmClock} />
				{/if}
				{@render detailItem('Difficulty', recipe?.difficulty)}
			</div>
		</div>
	{/if}
</div>
