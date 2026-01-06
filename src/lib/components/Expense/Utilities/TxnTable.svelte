<script lang="ts">
	import Dropdown from '$lib/components/Common/Form/Dropdown.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import TxnRowItem from './TxnRowItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import { TransactionType } from '../../../../types/transaction';

	let { txnList, start, end } = $props();
	const queryClient = useQueryClient();

	let selectedView = $state({
		id: 'ALL',
		value: 'All'
	});

	const viewOptions = [
		{
			id: 'ALL',
			value: 'All'
		},
		{
			id: TransactionType.EXPENSE,
			value: 'Expense'
		},
		{
			id: TransactionType.INCOME,
			value: 'Income'
		}
	];

	async function handleDelete(id: string) {
		try {
			await TransactionRequest.deleteTransaction(id);
			addToast('Transaction deleted', 'success');
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactions({ startDate: start, endDate: end })
			});
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	function getList(txnList: any[]) {
		if (txnList?.length) {
			return txnList?.filter((item) => {
				if (selectedView.id === TransactionType.EXPENSE) {
					return item.type === TransactionType.EXPENSE;
				} else if (selectedView.id === TransactionType.INCOME) {
					return item.type === TransactionType.INCOME;
				} else {
					return item;
				}
			});
		}

		return [];
	}
</script>

<div class="mb-4 flex items-center justify-between gap-4">
	<p class="text-lg font-medium md:text-xl">All Transactions</p>

	<div>
		<div class="max-w-[140px] rounded-xl bg-white">
			<Dropdown options={viewOptions} shouldSearch={false} bind:selectedOption={selectedView} />
		</div>
	</div>
</div>
<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<div class="flex flex-col overflow-x-auto">
			{#each getList(txnList) as txn, index (index)}
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
