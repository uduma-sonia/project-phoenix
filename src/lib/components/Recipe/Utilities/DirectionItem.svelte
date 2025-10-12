<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { type Directions } from '../../../../types/recipe';

	let {
		isChecklist,
		handleSelectItem,
		isSelected,
		index,
		direction
	}: {
		direction: Directions;
		index: number;
		isChecklist?: boolean;
		handleSelectItem?: (name: string) => void;
		isSelected?: boolean;
	} = $props();
</script>

<div class="flex items-start gap-2">
	<div class="pt-1">
		<div
			class="button_active font-lexend bg-brand-light relative flex h-5 w-5 items-center justify-center rounded-md border p-0 text-sm font-light"
		>
			{index + 1}
		</div>
	</div>

	<div class="flex-1">
		<p class="font-lexend text-sm font-light md:text-base">
			{direction.name}
		</p>
	</div>
</div>
