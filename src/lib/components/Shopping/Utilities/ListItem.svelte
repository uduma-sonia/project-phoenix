<script lang="ts">
	import { Check, Pencil } from '@lucide/svelte';
	import EditItem from './EditItem.svelte';

	let { data, handleUpdateItem, currency, canEditId, handleEdit, handleUpdate, canEdit } = $props();

	let qty = $derived(data?.quantity > 0 ? data?.quantity : '');

	function editItem() {
		if (canEdit) {
			handleEdit(data?._id);
		}
	}
	function checkItem() {
		if (canEdit) {
			handleUpdateItem(data?._id, !data?.done);
		}
	}
</script>

<div class="item_wrapper">
	<div class="relative z-10 w-full gap-3 rounded-lg border-2 border-black bg-white">
		{#if canEditId == data?._id}
			<EditItem {data} {handleEdit} {handleUpdate} />
		{:else}
			<div class="relative flex items-center gap-4">
				<div class="edit_icon absolute top-2 right-2 lg:hidden">
					<Pencil size="14px" />
				</div>

				<div class="pl-3">
					<button
						class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
						aria-label="Checklist"
						onclick={checkItem}
					>
						{#if data?.done}
							<Check size="22px" />
						{/if}
					</button>
				</div>

				<button
					class="font-lexend flex-1 space-y-1 py-3 pr-3 text-left font-light"
					onclick={editItem}
				>
					<div class="flex">
						<p class:line-through={data?.done}>{qty} {data?.name} <small>{data?.unit}</small></p>
					</div>
					{#if data?.price > 0}
						<p class="text-sm" class:line-through={data?.done}>
							{currency}{data?.price.toLocaleString()}
						</p>
					{/if}
				</button>
			</div>
		{/if}
	</div>
</div>

<style>
	.item_wrapper {
		position: relative;
		border-radius: 8px;
		transition: all 0.4s linear;
	}

	.item_wrapper::before {
		content: '';
		position: absolute;
		top: 1px;
		left: 1px;
		right: 0;
		bottom: 0;
		background-color: black;
		border: 2px solid black;
		z-index: 1;
		border-radius: 8px;
		width: 100%;
		height: 100%;
	}

	.item_wrapper:hover .edit_icon {
		display: block;
	}
</style>
