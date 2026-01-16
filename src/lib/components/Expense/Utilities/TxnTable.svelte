<script lang="ts">
	import Dropdown from '$lib/components/Common/Form/Dropdown.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import TxnRowItem from './TxnRowItem.svelte';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import EmptyState from '$lib/components/Common/EmptyState.svelte';
	import { openAddTxnModal } from '$lib/state/modal.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import { onMount } from 'svelte';
	import { viewOptions } from '$lib/constants/transaction';
	import Pagination from './Pagination.svelte';
	import ExpenseUtils from './utils';

	let { txnList, start, end, txnLoading, isError, getCurrency } = $props();
	const queryClient = useQueryClient();

	let hasMount = $state(false);

	let selectedView = $state({
		id: 'ALL',
		value: 'All'
	});

	let ITEMS_PER_PAGE = 10;
	let currentPage = $state(1);

	let totalItems = $derived(ExpenseUtils.getList(txnList, selectedView)?.length);
	let startPage = $derived((currentPage - 1) * ITEMS_PER_PAGE);
	let endPage = $derived(startPage + ITEMS_PER_PAGE);
	let paginatedTransactions = $derived(
		ExpenseUtils.getList(txnList, selectedView)?.slice(startPage, endPage)
	);

	let totalPages = $derived(Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE)));

	function nextPage() {
		if (currentPage < totalPages) {
			currentPage += 1;
		}
	}

	function prevPage() {
		if (currentPage > 1) {
			currentPage -= 1;
		}
	}

	let hasTxns = $derived(
		(ExpenseUtils.getList(paginatedTransactions, selectedView) ?? []).length > 0
	);

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
			currentPage = 1;
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	onMount(() => {
		hasMount = true;
	});
</script>

<div class="mt-6 px-3">
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
			<div class="no-scrollbar overflow-x-aut flex flex-col overflow-x-auto">
				<LoaderError isLoading={txnLoading} error={isError} />

				{#if !txnLoading && !isError}
					{#if hasTxns}
						{#each paginatedTransactions as txn, index (index)}
							<TxnRowItem {getCurrency} {handleDelete} {txn} />
						{/each}

						<div class="absolute bottom-0 left-0 h-28 w-full">
							<Pagination {totalPages} {nextPage} {prevPage} {currentPage} />
						</div>

						<div class="h-28"></div>
					{:else if !isError}
						{#if hasMount}
							<EmptyState
								buttonText="Add Transaction"
								heading="No transaction recorded"
								text="Start recording your transactions"
								action={openAddTxnModal}
							/>
						{:else}
							<LoaderError isLoading={true} />
						{/if}
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
		border: 2px solid black;
		background-color: #fff;
		padding: 0px 16px 0px;
	}
</style>
