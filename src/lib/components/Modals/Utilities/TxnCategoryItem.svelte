<script lang="ts">
	import BasicInputField from '$lib/components/Common/Form/BasicInputField.svelte';

	let {
		showSettings = false,
		item,
		handleItemDelete,
		handleAddToList,
		boardId,
		handleUpdateItem
	}: {
		showSettings?: boolean;
		boardId?: string;
		item: any;
		handleItemDelete?: (id: string) => void;
		handleAddToList?: (boardId?: any, name?: string) => void;
		handleUpdateItem?: (itemId: any, name: string, amount: number) => void;
	} = $props();

	let itemId = $state('');
	let itemName = $derived(item?.name);
	let itemAmount = $derived(item?.budgetAmount);

	function handleUpdate() {
		handleUpdateItem?.(item._id, itemName, itemAmount);
	}
</script>

<div class="flex gap-4">
	<div class="w-1/2">
		<BasicInputField type="text" bind:value={itemName} placeholder="Name" onblur={handleUpdate} />
	</div>
	<div class="w-1/2">
		<BasicInputField
			type="number"
			placeholder="Budget amount"
			bind:value={itemAmount}
			onblur={handleUpdate}
		/>
	</div>
</div>
