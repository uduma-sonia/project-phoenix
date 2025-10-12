<script lang="ts">
	import { ChevronDown, ChevronRight } from '@lucide/svelte';
	import type { Recipe } from '../../../../types/recipe';

	let { recipe }: { recipe: Recipe } = $props();

	let showNote = $state(false);
</script>

<div class="mb-3">
	<button class="flex items-center gap-1" onclick={() => (showNote = !showNote)}>
		{#if showNote}
			<ChevronDown />
		{:else}
			<ChevronRight />
		{/if}
		Prep note
	</button>

	{#if showNote}
		<div class="mt-3 w-full">
			<p class="font-lexend-deca text-sm font-light">{recipe.prepNote}</p>
		</div>
	{/if}
</div>
