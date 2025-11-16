<script lang="ts">
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import { Check } from '@lucide/svelte';

	let { meal, mealData } = $props();

	let textarea: any = $state(null);

	let mealValue = $state(mealData?.name || '');

	function resizeTextarea() {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}
</script>

<div
	class="no-scrollbar relative flex h-[140px] items-start justify-center overflow-y-auto border p-3"
>
	<textarea
		oninput={resizeTextarea}
		bind:this={textarea}
		bind:value={mealValue}
		class="font-lexend no-scrollbar borde flex max-h-[100px] w-full resize-none items-center justify-center rounded-lg px-0 py-2 text-center text-sm font-light outline-none"
	></textarea>

	<div class="absolute right-1 bottom-1 flex w-full items-center justify-end gap-5">
		<Tooltip text="Eaten" position="top">
			<button
				class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0"
			>
				{#if mealData?.hasEaten}
					<Check size="16px" />
				{/if}
			</button>
		</Tooltip>
	</div>
</div>
