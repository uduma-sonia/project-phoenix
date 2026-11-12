<script lang="ts">
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import TxnTable from '../Utilities/TxnTable.svelte';
	import { openAddTxnModal } from '$lib/state/modal.svelte';

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
	let amount = $state('');
	let txnList = $derived($txnQuery?.data?.data?.transactions);
</script>

<div class="mt-3 flex justify-end px-3">
	<button
		onclick={() => openAddTxnModal(expense)}
		class="border-primary-biloba-950 text-13 text-primary-biloba-950 h-[32px] rounded-lg border-2 px-4"
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
