<script lang="ts">
	import { Check } from '@lucide/svelte';

	let {
		name = '',
		isChecklist,
		handleSelectItem,
		isSelected
	}: {
		name: string;
		isChecklist?: boolean;
		handleSelectItem?: (name: string) => void;
		isSelected?: boolean;
	} = $props();
</script>

<div class="flex items-start gap-4">
	<div>
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
				class="button_active bg-brand-recipe relative flex h-5 w-5 items-center justify-center rounded-md border p-0"
			></div>
		{/if}
	</div>

	<div class="flex-1">
		<p class="font-lexend font-light">{name}</p>
	</div>
</div>
