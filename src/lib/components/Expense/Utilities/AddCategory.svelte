<script lang="ts">
	import { TransactionType } from '../../../../types/transaction';

	let { handleItemAdd, isSubmitting, placeholder = 'Type and enter', type } = $props();

	let itemName = $state('');
	let itemAmount = $state('');
</script>

<div class="relative z-10 w-full gap-3 rounded-lg bg-white">
	<form
		class="space-y-4"
		onsubmit={(e) => {
			e.preventDefault();
			handleItemAdd(itemName, Number(itemAmount));
			itemName = '';
			itemAmount = '';
		}}
	>
		<div class="flex gap-4">
			<input
				type="text"
				bind:value={itemName}
				class="h-[50px] w-full border-b border-b-gray-300 px-3 outline-none"
				{placeholder}
			/>
			{#if type === TransactionType.EXPENSE}
				<input
					type="text"
					bind:value={itemAmount}
					class="h-[50px] w-full border-b border-b-gray-300 px-3 outline-none"
					placeholder="Budget amount"
				/>
			{/if}
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
