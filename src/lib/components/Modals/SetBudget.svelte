<script lang="ts">
	import { closeAddBudgetModal, modalsState, selectedTxnCategory } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import { addToast } from '$lib/store/toast';
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import CurrencyInput from '../Common/CurrencyInput.svelte';

	let { currency, start, end } = $props();

	const queryClient = useQueryClient();

	let budgetAmount = $derived(selectedTxnCategory?.data?.budgetAmount);
	let categoryName = $derived(selectedTxnCategory?.data?.name);

	let isLoading = $state(false);

	async function onSubmit() {
		if (!selectedTxnCategory?.data?.id) {
			addToast('No category selected', 'error');
			closeAddBudgetModal();
			return;
		}

		if (!categoryName?.trim()) {
			addToast('Category name cannot be empty', 'error');
			return;
		}
		try {
			isLoading = true;
			const payload = {
				name: categoryName,
				budgetAmount: Number(budgetAmount)
			};

			const result = await TransactionRequest.updateTransactionCategory(
				selectedTxnCategory?.data?.id,
				payload
			);

			if (result) {
				queryClient.invalidateQueries({ queryKey: queryKeys.getTransactionCategories });
				queryClient.invalidateQueries({
					queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end })
				});
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
	label="Category Setting"
>
	<div class="p-4">
		<div class="space-y-4">
			<BasicInputField
				label="Name"
				bind:value={categoryName}
				type="text"
				required
				id="categoryName"
				name="categoryName"
			/>

			<CurrencyInput
				inputClass="bg-white"
				id="amount"
				label="Budget Amount"
				{currency}
				bind:value={budgetAmount}
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
