<script lang="ts">
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import TxnTable from '../Utilities/TxnTable.svelte';
	import { openAddBudgetModal, openAddTxnModal } from '$lib/state/modal.svelte';
	import { Cog } from '@lucide/svelte';

	let { openedCategoryId, start, end, currency, expense } = $props();

	let txnQuery = $derived(
		createQuery({
			queryKey: queryKeys.getTransactions({
				startDate: start,
				endDate: end,
				categoryId: openedCategoryId
			}),
			queryFn: () =>
				TransactionRequest.getTransactions({
					startDate: start,
					endDate: end,
					categoryId: openedCategoryId
				})
		})
	);
	let txnList = $derived($txnQuery?.data?.data?.transactions);
</script>

<div class="mt-3 flex justify-end gap-3 px-3">
	<button
		onclick={() => openAddBudgetModal(expense)}
		class="text-13 border-primary-biloba-950 h-[32px] rounded-lg border-2 bg-white px-2 text-black"
	>
		<Cog size="20" />
	</button>
	<button
		onclick={() => openAddTxnModal(expense)}
		class="bg-primary-biloba-800 text-13 border-primary-biloba-950 h-[32px] rounded-lg border-2 px-4 text-white"
	>
		Record transaction
	</button>
</div>

<TxnTable
	txnLoading={$txnQuery?.isLoading}
	isError={$txnQuery?.isError}
	{txnList}
	{start}
	{end}
	{currency}
	{openedCategoryId}
/>
