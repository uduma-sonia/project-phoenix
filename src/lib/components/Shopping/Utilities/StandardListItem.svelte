<script lang="ts">
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
		handleUpdateItem?: (itemId: any, name: string) => void;
	} = $props();

	let itemName = $state(item?.name);

	function handleUpdate() {
		handleUpdateItem?.(item._id, itemName);
	}
</script>

<div class="item_wrapper border-b border-b-gray-300">
	<div class="relative z-10 w-full gap-3 rounded-lg bg-white px-3">
		<div class="flex items-center gap-4">
			<div class="font-lexend flex-1 space-y-1 font-light">
				<div class="flex">
					<input
						type="text"
						bind:value={itemName}
						class="h-[40px] w-full border-0 px-1 py-3 outline-none"
						placeholder="Name"
						onblur={handleUpdate}
					/>
				</div>
			</div>

			{#if showSettings}
				<div class="flex items-center gap-4">
					<button
						class="text-sm text-red-500 hover:underline"
						onclick={() => handleItemDelete?.(item?._id)}
						>Remove
					</button>
				</div>
			{:else}
				<div>
					<button
						class="text-sm hover:underline"
						onclick={() => handleAddToList?.(boardId, item?.name)}
					>
						Add to list
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>
