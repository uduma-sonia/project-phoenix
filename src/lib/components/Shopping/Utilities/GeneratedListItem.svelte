<script lang="ts">
	let { list, isLoading, removeItem, handleUpdate } = $props();

	// let itemName = $state(list?.name);
</script>

<div class="flex items-center justify-between gap-4 border-b border-b-gray-300 px-1">
	<p class="font-lexend py-2 text-left text-sm font-light">
		{list?.name}
	</p>

	<!-- <div class="flex-1">
		<input
			type="text"
			bind:value={itemName}
			class="font-lexend w-full border-0 p-0 px-1 py-2 text-sm outline-none"
			placeholder="Name"
			onblur={handleUpdate}
		/>
	</div> -->

	<button class="text-brand-error text-sm hover:underline" onclick={() => removeItem(list?.name)}>
		{#if isLoading}
			<span class="spinner_white_sm border-2 border-black"></span>
		{:else}
			Remove
		{/if}
	</button>
</div>
