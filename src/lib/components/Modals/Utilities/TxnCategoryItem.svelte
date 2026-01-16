<script lang="ts">
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';
	import { X } from '@lucide/svelte';
	import { TransactionType } from '../../../../types/transaction';

	let {
		showSettings = false,
		item,
		handleItemDelete,
		handleAddToList,
		boardId,
		handleUpdateItem,
		type
	}: {
		showSettings?: boolean;
		boardId?: string;
		item: any;
		handleItemDelete?: (id: string) => void;
		handleAddToList?: (boardId?: any, name?: string) => void;
		handleUpdateItem?: (itemId: any, name: string, amount: number) => void;
		type?: TransactionType;
	} = $props();

	let itemName = $derived(item?.name);
	let itemAmount = $derived(item?.budgetAmount);

	function handleUpdate() {
		handleUpdateItem?.(item._id, itemName, itemAmount);
	}
</script>

<div class="flex items-center gap-1">
	<div class="flex flex-1 gap-2">
		<div class="w-1/2" class:ksjc={type === TransactionType.INCOME}>
			<BasicInputField type="text" bind:value={itemName} placeholder="Name" onblur={handleUpdate} />
		</div>
		{#if type === TransactionType.EXPENSE}
			<div class="w-1/2">
				<BasicInputField
					type="number"
					placeholder="Budget amount"
					bind:value={itemAmount}
					onblur={handleUpdate}
				/>
			</div>
		{/if}
	</div>

	<div>
		<button
			class="flex aspect-square w-6 items-center justify-center rounded-full text-red-500 hover:bg-gray-200"
			onclick={() => handleItemDelete?.(item?._id)}
		>
			<X size="18px" strokeWidth={3} />
		</button>
	</div>
</div>

<style>
	.ksjc {
		width: 100%;
	}
</style>
