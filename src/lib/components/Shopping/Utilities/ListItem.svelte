<script lang="ts">
	import { Check } from '@lucide/svelte';
	import EditItem from './EditItem.svelte';

	let { data, handleUpdateItem, currency, canEditId, handleEdit, handleUpdate } = $props();

	let qty = $derived(data?.quantity > 0 ? data?.quantity : '');
</script>

<div class="item_wrapper">
	<div class="relative z-10 w-full gap-3 rounded-lg border-2 border-black bg-white">
		{#if canEditId == data?._id}
			<EditItem {data} {handleEdit} {handleUpdate} />
		{:else}
			<div class="flex items-center gap-4">
				<div class="pl-3">
					<button
						class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
						aria-label="Checklist"
						onclick={() => handleUpdateItem(data?._id, !data?.done)}
					>
						{#if data?.done}
							<Check size="22px" />
						{/if}
					</button>
				</div>

				<button
					class="font-lexend flex-1 space-y-1 py-3 pr-3 text-left font-light"
					onclick={() => handleEdit(data?._id)}
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
</style>
