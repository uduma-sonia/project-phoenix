<script lang="ts">
	import Dropdown from '$lib/components/Common/Form/Dropdown.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import TxnRowItem from './TxnRowItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';

	let { txnList, start, end } = $props();
	const queryClient = useQueryClient();

	let selectedPlan = $state({
		id: 'all',
		value: 'All'
	});

	let isDeleting = $state(false);

	const viewOptions = [
		{
			id: 'all',
			value: 'All'
		},
		{
			id: 'expense',
			value: 'Expense'
		},
		{
			id: 'income',
			value: 'Income'
		}
	];

	async function handleDelete(id: string) {
		try {
			isDeleting = true;
			await TransactionRequest.deleteTransaction(id);
			addToast('Transaction deleted', 'success');
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactions({ startDate: start, endDate: end })
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="mb-4 flex items-center justify-between gap-4">
	<p class="text-lg font-medium md:text-xl">All Transactions</p>

	<div>
		<div class="max-w-[140px] rounded-xl bg-white">
			<Dropdown options={viewOptions} shouldSearch={false} bind:selectedOption={selectedPlan} />
		</div>
	</div>
</div>
<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<div class="flex flex-col overflow-x-auto">
			{#each txnList as txn, index (index)}
				<TxnRowItem {handleDelete} {txn} />
			{/each}
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_ejf {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 0px 16px 16px;
	}
</style>
