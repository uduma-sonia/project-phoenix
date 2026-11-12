<script lang="ts">
	import CurrencyInput from '$lib/components/Common/CurrencyInput.svelte';
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { TransactionType } from '../../../../types/transaction';

	let { handleItemAdd, isSubmitting, placeholder = 'Type and enter', type, currency } = $props();

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
		<div class="space-y-4">
			<BasicInputField
				label="Category name"
				type="text"
				id="categoryName"
				name="categoryName"
				bind:value={itemName}
			/>

			{#if type === TransactionType.EXPENSE}
				<CurrencyInput
					inputClass="bg-white"
					required
					label="Budget amount"
					requiredIcon
					{currency}
					bind:value={itemAmount}
				/>
			{/if}
		</div>

		<button class="shadow_button" type="submit">
			{#if isSubmitting}
				<div class="spinner_white border-2 border-black"></div>
			{:else}
				Add New
			{/if}
		</button>
	</form>
</div>
