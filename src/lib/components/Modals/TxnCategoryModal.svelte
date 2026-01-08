<script lang="ts">
	import { closeTxnCategoryModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import TxnCategoryItem from './Utilities/TxnCategoryItem.svelte';
	import { TransactionType, type TransactionCategory } from '../../../types/transaction';
	import { addToast } from '$lib/store/toast';
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import AddCategory from '../Expense/Utilities/AddCategory.svelte';

	let { transactionCategoriesList } = $props();

	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let type = $state(TransactionType.EXPENSE);

	let transformedList = $derived(
		transactionCategoriesList?.filter((item: TransactionCategory) => item.type === type)
	);

	function changeType(val: TransactionType) {
		type = val;
	}

	async function handleAddCategory(value: string, itemAmount: number) {
		try {
			isSubmitting = true;
			await TransactionRequest.createTransactionCategory({
				name: value,
				type: type,
				budgetAmount: itemAmount
			});
			addToast('Category added', 'success');
			queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}

	async function handleItemDelete(id: string) {
		try {
			const result = await TransactionRequest.deleteTransactionCategory(id);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}

	async function handleUpdateItem(itemId: string, name: string, budgetAmount: number) {
		try {
			const payload = {
				name: name,
				budgetAmount: budgetAmount
			};

			const result = await TransactionRequest.updateTransactionCategory(itemId, payload);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenTxnCategory}
	onClose={closeTxnCategoryModal}
	label="Manage Categories"
	maxWidth="max-w-[700px]"
>
	<div class="p-4">
		<div class="space-y-4">
			<div>
				<div class="flex items-center gap-4">
					<button
						class:bg-brand-build={type === TransactionType.EXPENSE}
						onclick={() => changeType(TransactionType.EXPENSE)}
						class="button_active h-[35px] rounded-lg border px-4 text-sm"
						type="button"
					>
						Expense
					</button>
					<button
						class:bg-brand-build={type === TransactionType.INCOME}
						onclick={() => changeType(TransactionType.INCOME)}
						class="button_active h-[35px] rounded-lg border px-4 text-sm"
						type="button"
					>
						Income
					</button>
				</div>
			</div>

			<div class="space-y-4">
				{#each transformedList as item}
					<TxnCategoryItem {type} {handleUpdateItem} {item} {handleItemDelete} />
				{/each}
			</div>

			<div class="mt-12">
				<AddCategory
					{type}
					placeholder="Category name"
					{isSubmitting}
					handleItemAdd={handleAddCategory}
				/>
			</div>
		</div>
	</div>
</ModalWrapper>
