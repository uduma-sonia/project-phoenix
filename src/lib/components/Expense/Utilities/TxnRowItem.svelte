<script lang="ts">
	import Helpers from '$lib/utils/helpers';
	import { SquarePen, Trash2 } from '@lucide/svelte';
	import { format } from 'date-fns';
	import { type Transaction } from '../../../../types/transaction';
	import { openEditTxnModal } from '$lib/state/modal.svelte';

	let {
		txn,
		handleDelete,
		currency
	}: { txn: Transaction; handleDelete: (id: string) => void; currency: string } = $props();

	function _handleDelete() {
		handleDelete(txn?._id);
	}

	function _handleUpdate() {
		openEditTxnModal(txn);
	}
</script>

<div class="flex w-full items-stretch justify-between border-b p-3">
	<div>
		<div class="flex items-center gap-3">
			<p class="font-lexend text-base font-medium lg:text-lg">
				{#if currency}
					{Helpers.getCurrency(txn.amount, currency)}
				{/if}
			</p>
			<p class="font-lexend text-xs font-light text-gray-600">
				{#if txn?.date}
					{format(new Date(txn.date), 'PP')}
				{/if}
			</p>
		</div>

		<p class="font-lexend text-13 font-light md:text-sm">{txn?.description || 'No description'}</p>
	</div>

	<div class="flex items-center gap-1">
		<button
			onclick={_handleDelete}
			class="hover:bg-primary-biloba-950 focus:bg-primary-biloba-950 text-brand-error flex h-8 w-8 items-center justify-center rounded-full hover:text-white focus:text-white"
		>
			<Trash2 size="18" />
		</button>
		<button
			onclick={_handleUpdate}
			class="hover:bg-primary-biloba-950 focus:bg-primary-biloba-950 flex h-8 w-8 items-center justify-center rounded-full hover:text-white focus:text-white"
		>
			<SquarePen size="20" />
		</button>
	</div>
</div>
