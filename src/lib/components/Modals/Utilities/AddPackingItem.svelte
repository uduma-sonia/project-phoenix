<script lang="ts">
	let { handleItemAdd, isSubmitting } = $props();

	let itemName = $state('');
</script>

<div class="relative z-10 mt-10 w-full gap-3 rounded-lg">
	<form
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			handleItemAdd(itemName);
			itemName = '';
		}}
	>
		<div class="flex items-center gap-3">
			<input
				type="text"
				bind:value={itemName}
				class="h-[50px] w-full border-b border-b-gray-300 px-3 outline-none"
				placeholder="Type and enter"
			/>

			<!-- <div class="w-[100px]">
				<Dropdown
					label="Tags"
					options={[{ value: 'essentials', id: 'id' }]}
					bind:selectedOption={selectedCurrency}
				/>
			</div> -->
		</div>

		<button class="shadow_button" type="submit">
			{#if isSubmitting}
				<div class="spinner_white border-2 border-black"></div>
			{:else}
				Save
			{/if}
		</button>
	</form>
</div>
