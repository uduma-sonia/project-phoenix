<script lang="ts">
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import TxnTable from '../Utilities/TxnTable.svelte';
	import { openAddBudgetModal, openAddTxnModal } from '$lib/state/modal.svelte';
	import { Cog, Trash } from '@lucide/svelte';
	import IconButton from '$lib/components/Common/IconButton.svelte';
	import ButtonV2 from '$lib/components/Common/Form/ButtonV2.svelte';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { openedCategoryId, start, end, currency, expense } = $props();

	const queryClient = useQueryClient();
	let isDeleting = $state(false);

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

	async function handleCategoryDelete(id: string) {
		try {
			isDeleting = true;
			const result = await TransactionRequest.deleteTransactionCategory(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isDeleting = false;
		}
	}
</script>

<div class="mt-3 flex justify-between gap-3 px-3">
	<div>
		<IconButton
			Icon={Trash}
			iconProps={{ size: 20 }}
			size="s"
			action={() => handleCategoryDelete(expense.id)}
			variant="danger"
			isLoading={isDeleting}
		/>
	</div>

	<div class="flex gap-3">
		<IconButton
			Icon={Cog}
			iconProps={{ size: 20 }}
			size="s"
			action={() => openAddBudgetModal(expense)}
		/>

		<ButtonV2
			label="Record transaction"
			action={() => openAddTxnModal(expense)}
			size="s"
			variant="purple"
		/>
	</div>
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
