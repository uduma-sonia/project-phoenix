<script lang="ts">
	import { format } from 'date-fns';
	import type { RecipeResponse } from '../../../../types/recipe';

	let { recipe }: { recipe: RecipeResponse } = $props();
</script>

<p class="mt-4 text-xl font-medium">
	{recipe.name}
</p>

<div class="flex gap-3">
	{#if recipe?.groups?.length}
		{#each recipe?.groups as group, index (index)}
			<p class="font-lexend text-13 font-extralight">
				#{group.name}
			</p>
		{/each}
	{/if}
</div>

<div class="font-lexend text-11 mb-2 font-extralight">
	Updated: {format(new Date(recipe?.updatedAt), 'PP')}
</div>
