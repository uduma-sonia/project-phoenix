<script lang="ts">
	import { closeEditTxnModal, modalsState, selectedTxnToEdit } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import { TransactionType, type TransactionCategory } from '../../../types/transaction';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import DatePickerDropdown from '../Common/Form/DatePickerDropdown.svelte';

	let { transactionCategoriesList, start, end } = $props();

	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let type = $derived(selectedTxnToEdit?.data?.type || TransactionType.EXPENSE);
	let startDateValue = $state(new Date());
	let amount = $derived('' + selectedTxnToEdit?.data?.amount);
	let description = $derived(selectedTxnToEdit?.data?.description);

	let transformedList = $derived(
		transactionCategoriesList?.filter((item: TransactionCategory) => item.type === type)
	);

	let txnCategoriesOptions = $derived(
		transformedList?.map((item: any) => {
			return {
				value: item.name,
				id: item._id
			};
		})
	);
	let selectedCategory = $derived(
		selectedTxnToEdit?.data?.categoryId
			? { value: selectedTxnToEdit?.data?.categoryName, id: selectedTxnToEdit?.data?.categoryId }
			: { value: '', id: '' }
	);

	async function handleSubmit() {
		if (!selectedCategory?.id) {
			addToast('Select a category', 'error');
			return;
		}
		if (!amount) {
			addToast('Add an amount', 'error');
			return;
		}
		try {
			isSubmitting = true;

			const payload = {
				date: startDateValue,
				description,
				amount: Number(amount),
				categoryName: selectedCategory?.value,
				categoryId: selectedCategory?.id,
				type
			};

			if (selectedTxnToEdit?.data?._id) {
				await TransactionRequest.updateTransaction(selectedTxnToEdit?.data?._id, payload);
				addToast('Transaction created', 'success');
				queryClient.invalidateQueries({
					queryKey: queryKeys.getTransactions({ startDate: start, endDate: end })
				});
				queryClient.invalidateQueries({
					queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end })
				});
				closeEditTxnModal();
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenEditTxn}
	onClose={closeEditTxnModal}
	label="Edit Transaction"
>
	<div class="p-4">
		<div class="space-y-4">
			<div class="w-1/2">
				<DatePickerDropdown bind:dateValue={startDateValue} label="Transaction Date" />
			</div>

			<div>
				{#if txnCategoriesOptions?.length}
					<Dropdown
						label="Category"
						options={txnCategoriesOptions}
						bind:selectedOption={selectedCategory}
						shouldSearch={true}
						placeholder="Select category"
						withClearButton
					/>
				{/if}
			</div>

			<div>
				<BasicInputField
					inputMode="numeric"
					label="Amount"
					type="number"
					id="amount"
					name="amount"
					required
					bind:value={amount}
				/>
			</div>
			<div>
				<BasicInputField
					label="Description"
					placeholder="Enter description"
					type="text"
					id="description"
					name="description"
					bind:value={description}
				/>
			</div>
		</div>
		<div class="fle mt-8 justify-end">
			<div class="mt-8 flex items-center justify-end gap-5">
				<div class="flex-1">
					<BasicButton action={closeEditTxnModal} label="Cancel" variant="error" />
				</div>
				<div class="w-[60%]">
					<BasicButton
						label="Update Transaction"
						action={handleSubmit}
						isLoading={isSubmitting}
						variant="primary"
					/>
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>
