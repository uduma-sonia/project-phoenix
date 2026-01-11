<script lang="ts">
	import Tooltip from '$lib/components/Common/Tooltip.svelte';
	import { openMealPlannerModal } from '$lib/state/modal.svelte';
	import { addToast } from '$lib/store/toast';
	import { Check, Plus } from '@lucide/svelte';

	let { meal, mealData, handleMealItemUpdate } = $props();

	let textarea: any = $state(null);
	let hasEaten = $state(mealData?.hasEaten);
	let mealValue = $state(mealData?.name || '');

	function resizeTextarea() {
		textarea.style.height = 'auto';
		textarea.style.height = textarea.scrollHeight + 'px';
	}

	function handleHasEaten() {
		if (mealData?._id) {
			if (mealData?.name) {
				handleMealItemUpdate(mealData?._id, {
					hasEaten: !hasEaten,
					date: meal.date,
					timeOfDay: meal.timeOfDay,
					day: meal.day
				});
				hasEaten = !hasEaten;
			} else {
				addToast('Write down what you ate first', 'error');
			}
		}
	}

	function updateItemName() {
		handleMealItemUpdate(mealData?._id, {
			name: mealValue,
			date: meal.date,
			timeOfDay: meal.timeOfDay,
			day: meal.day
		});
	}
</script>

<div
	class="no-scrollbar relative flex h-[150px] min-w-[150px] items-start justify-center overflow-y-auto border"
>
	<button
		class="flex h-full w-full items-center justify-center bg-lime-600"
		onclick={openMealPlannerModal}
	>
		<Plus />
	</button>

	<!-- <textarea
		oninput={resizeTextarea}
		bind:this={textarea}
		bind:value={mealValue}
		onblur={updateItemName}
		class="font-lexend no-scrollbar flex h-full max-h-[100px] w-full resize-none items-center justify-center rounded-lg px-0 py-2 text-center text-sm font-light outline-none"
	></textarea> -->

	<div class="absolute right-1 bottom-1 flex w-full items-center justify-end gap-5">
		<Tooltip text="Eaten" position="left">
			<button
				class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0 opacity-40"
				class:hasEaten
				class:hasId={mealData?._id}
				onclick={() => handleHasEaten()}
			>
				{#if hasEaten}
					<Check size="16px" color="white" strokeWidth={4} />
				{/if}
			</button>
		</Tooltip>
	</div>
</div>

<!-- <div
	class="no-scrollbar relative flex h-[100px] items-start justify-center overflow-y-auto border p-3"
>
	<textarea
		oninput={resizeTextarea}
		bind:this={textarea}
		bind:value={mealValue}
		onblur={updateItemName}
		class="font-lexend no-scrollbar flex h-full max-h-[100px] w-full resize-none items-center justify-center rounded-lg px-0 py-2 text-center text-sm font-light outline-none"
	></textarea>

	<div class="absolute right-1 bottom-1 flex w-full items-center justify-end gap-5">
		<Tooltip text="Eaten" position="left">
			<button
				class="button_active relative flex h-5 w-5 items-center justify-center rounded-md border p-0 opacity-40"
				class:hasEaten
				class:hasId={mealData?._id}
				onclick={() => handleHasEaten()}
			>
				{#if hasEaten}
					<Check size="16px" color="white" strokeWidth={4} />
				{/if}
			</button>
		</Tooltip>
	</div>
</div> -->

<style>
	.hasEaten {
		background-color: #8cbf80;
		border: none;
	}
	.hasId {
		opacity: 1;
	}
</style>
