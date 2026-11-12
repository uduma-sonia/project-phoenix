<script lang="ts">
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import TxnRowItem from './TxnRowItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import ProgressLoader from '$lib/components/Common/ProgressLoader.svelte';

	let { txnList, start, end, txnLoading, isError, currency, openedCategoryId } = $props();
	const queryClient = useQueryClient();

	async function handleDelete(id: string) {
		try {
			await TransactionRequest.deleteTransaction(id);
			addToast('Transaction deleted', 'success');
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactions({
					startDate: start,
					endDate: end,
					categoryId: openedCategoryId
				})
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end })
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<div class="mt-4 flex flex-col overflow-x-auto rounded-xl border bg-white">
	<ProgressLoader
		isLoading={txnLoading}
		error={isError}
		isEmpty={!txnLoading && !isError && txnList?.length === 0}
	/>

	{#if !txnLoading && !isError}
		{#if txnList}
			{#each txnList as txn, index (index)}
				<TxnRowItem {currency} {handleDelete} {txn} />
			{/each}
		{/if}
	{/if}
</div>
