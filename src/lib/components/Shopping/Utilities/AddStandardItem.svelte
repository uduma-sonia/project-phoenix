<script lang="ts">
	let { handleItemAdd, isSubmitting, placeholder = 'Type and enter' } = $props();
	let itemName = $state('');
</script>

<div class="relative z-10 w-full gap-3 rounded-lg bg-white">
	<form
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			handleItemAdd(itemName);
			itemName = '';
		}}
	>
		<input
			type="text"
			bind:value={itemName}
			class="h-[50px] w-full border-b border-b-gray-300 px-3 outline-none"
			{placeholder}
		/>

		<button class="shadow_button" type="submit">
			{#if isSubmitting}
				<div class="spinner_white border-2 border-black"></div>
			{:else}
				Save
			{/if}
		</button>
	</form>
</div>
