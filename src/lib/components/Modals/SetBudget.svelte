<script lang="ts">
	import { closeAddBudgetModal, modalsState, selectedTxnCategory } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { addToast } from '$lib/store/toast';
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';

	const queryClient = useQueryClient();

	let budgetAmount = $derived(selectedTxnCategory?.data?.budgetAmount);
	let categoryName = $derived(selectedTxnCategory?.data?.name);

	let isLoading = $state(false);

	async function onSubmit() {
		if (!selectedTxnCategory?.data?._id) {
			addToast('No category selected', 'error');
			closeAddBudgetModal();
			return;
		}
		try {
			isLoading = true;
			const payload = {
				name: categoryName,
				budgetAmount: Number(budgetAmount)
			};

			const result = await TransactionRequest.updateTransactionCategory(
				selectedTxnCategory?.data?._id,
				payload
			);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
				closeAddBudgetModal();
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenAddBudget}
	onClose={closeAddBudgetModal}
	label="Set Budget"
>
	<div class="p-4">
		<div class="space-y-4">
			<BasicInputField
				label="Category"
				bind:value={categoryName}
				type="text"
				id="categoryName"
				name="categoryName"
			/>
			<BasicInputField
				label="Budget Amount"
				bind:value={budgetAmount}
				type="number"
				id="amount"
				name="amount"
				inputMode="numeric"
			/>
		</div>

		<div class="mt-12 flex items-center justify-end gap-5">
			<div class="flex-1">
				<BasicButton action={closeAddBudgetModal} label="Cancel" variant="error" />
			</div>
			<div class="w-[60%]">
				<BasicButton {isLoading} action={onSubmit} label="Save" variant="primary" />
			</div>
		</div>
	</div>
</ModalWrapper>
