<script lang="ts">
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import TxnTable from '../Utilities/TxnTable.svelte';

	let { openedCategoryId, start, end, currency } = $props();

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

<TxnTable
	txnLoading={$txnQuery?.isLoading}
	isError={$txnQuery?.isError}
	{txnList}
	{start}
	{end}
	{currency}
/>
