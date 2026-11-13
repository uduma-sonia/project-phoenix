<script lang="ts">
	import CheckBox from '$lib/components/Common/CheckBox.svelte';

	let { handleHasEaten, meal, timeOfDay, mealName } = $props();

	let hasEaten = $state(false);

	$effect(() => {
		if (meal?.hasEaten) {
			hasEaten = Boolean(meal?.hasEaten);
		}
	});
</script>

<div class="flex items-center justify-between gap-4">
	<p
		class="font-lexend bg-primary-biloba-800 mb-1 inline-block rounded-lg px-4 py-1.5 text-sm font-medium text-white capitalize hover:bg-pink-100 md:text-base"
	>
		{timeOfDay}
	</p>

	{#if mealName}
		<CheckBox
			bind:isChecked={hasEaten}
			action={() => {
				hasEaten = !hasEaten;
				handleHasEaten(meal?._id);
			}}
			id="hasEaten"
		/>
	{/if}
</div>
