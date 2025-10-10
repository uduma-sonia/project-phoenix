<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { RecipeStandardMeasurements } from '../../../../types/recipe';

	let {
		name = '',
		isChecklist,
		handleSelectItem,
		isSelected,
		measurement,
		index
	}: {
		name: string;
		index: number;
		isChecklist?: boolean;
		handleSelectItem?: (name: string) => void;
		isSelected?: boolean;
		measurement?: keyof typeof RecipeStandardMeasurements;
	} = $props();
</script>

<div class="flex items-start gap-2">
	<div class="pt-1">
		{#if isChecklist}
			<button
				class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0"
				aria-label="Checklist"
				onclick={() => handleSelectItem?.(name)}
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
		<p class="font-lexend font-light">
			{#if measurement && measurement !== RecipeStandardMeasurements.NONE}
				<span> {RecipeStandardMeasurements[measurement]} </span>
			{/if}
			{name}
		</p>
	</div>
</div>
