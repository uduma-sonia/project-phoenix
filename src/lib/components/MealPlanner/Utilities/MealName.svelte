<script lang="ts">
	import { Pen } from '@lucide/svelte';

	let {
		isEditingName,
		mealInput = $bindable(),
		inputRef = $bindable(),
		handleBlur,
		meal,
		handleKeyDown,
		toggleEdit,
		mealName
	} = $props();
</script>

<div>
	{#if isEditingName}
		<input
			id={`meal-name-${crypto.randomUUID()}`}
			bind:value={mealInput}
			bind:this={inputRef}
			type="text"
			class="font-lexend h-auto w-full rounded-lg border p-0 px-2 text-base font-normal outline-none md:text-lg"
			placeholder="No meal recorded or planned"
			onblur={(e) => handleBlur(e, meal?._id)}
			onkeydown={(e) => handleKeyDown(e, meal?._id)}
		/>
	{:else}
		<button
			class="font-lexend bg-primary-biloba-50 mb-1 inline-flex items-center gap-2 rounded-lg border px-2 text-left text-base font-normal hover:bg-pink-100 md:text-lg"
			onclick={toggleEdit}
		>
			{mealName}
			<Pen size="13" />
		</button>
	{/if}
</div>
