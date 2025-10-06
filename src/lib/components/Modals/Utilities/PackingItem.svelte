<script lang="ts">
	import { Check, Trash } from '@lucide/svelte';

	let {
		item,
		handleItemDelete,
		handleUpdateItem,
		isSelected,
		toggleItem,
		isDeleting
	}: {
		isSelected: boolean;
		isDeleting: boolean;
		item: any;
		toggleItem?: (id: string) => void;
		handleItemDelete?: (id: string) => void;
		handleUpdateItem?: (itemId: any, name: string) => void;
	} = $props();

	let itemName = $state(item?.name);

	function handleUpdate() {
		handleUpdateItem?.(item._id, itemName);
	}
</script>

<div class="item_wrappe border-b border-b-gray-300">
	<div class="relative z-10 w-full gap-3 rounded-lg bg-white px-3">
		<div class="flex items-center gap-4">
			<button
				class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
				aria-label="Checklist"
				onclick={() => toggleItem?.(item._id)}
			>
				{#if isSelected}
					<Check size="22px" />
				{/if}
			</button>

			<div class="font-lexend flex flex-1 items-center justify-between space-y-1 font-light">
				<div>
					<input
						type="text"
						bind:value={itemName}
						class="h-[40px] w-full border-0 px-1 py-3 outline-none"
						placeholder="Name"
						onblur={handleUpdate}
					/>
				</div>

				<!-- <div>
					<button
						class="font-lexend hover:bg-brand-rose inline-block rounded-md border bg-white px-1 py-1 text-[9px] font-light text-black capitalize"
					>
						essentials
					</button>
				</div> -->
			</div>

			<button
				class="text-sm text-red-600 hover:underline"
				onclick={() => handleItemDelete?.(item?._id)}
			>
				{#if isDeleting}
					<div class="spinner_white_sm border-2 border-red-600"></div>
				{:else}
					<Trash size="16px" />
				{/if}
			</button>
		</div>
	</div>
</div>
