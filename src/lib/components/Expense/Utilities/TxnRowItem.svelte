<script lang="ts">
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
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
		<p class="font-lexend text-13 font-normal md:text-sm">{txn?.description || 'No description'}</p>
		<div class="flex items-center gap-3">
			<p class="font-lexend text-sm font-medium">
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
	</div>

	<div>
		<HamburgerDropdown
			options={[
				{
					label: 'Edit',
					icon: SquarePen,
					action: _handleUpdate
				},
				{
					label: 'Delete',
					icon: Trash2,
					iconColor: 'red',
					action: _handleDelete
				}
			]}
		/>
	</div>
</div>
