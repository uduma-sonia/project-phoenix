<script lang="ts">
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import TxnRowItem from './TxnRowItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import ProgressLoader from '$lib/components/Common/ProgressLoader.svelte';

	let { txnList, start, end, txnLoading, isError, currency } = $props();
	const queryClient = useQueryClient();

	async function handleDelete(id: string) {
		try {
			await TransactionRequest.deleteTransaction(id);
			addToast('Transaction deleted', 'success');
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactions({ startDate: start, endDate: end })
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end })
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<div class="mb-3 px-3">
	<div class="retro_wrapper">
		<div class="retro_wrapper_inner_ejf">
			<div class="no-scrollbar overflow-x-aut flex flex-col overflow-x-auto">
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
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_ejf {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 1px solid black;
		background-color: #fff;
	}
</style>
