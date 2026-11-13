<script lang="ts">
	import { closeAddTxnModal, modalsState, selectedTxnToAdd } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { TransactionType } from '../../../types/transaction';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import DatePickerDropdown from '../Common/Form/DatePickerDropdown.svelte';
	import CurrencyInput from '../Common/CurrencyInput.svelte';

	let { start, end, currency = 'NGN' } = $props();
	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let startDateValue = $state(new Date());
	let amount = $state('');
	let description = $state('');

	async function handleSubmit() {
		if (!selectedTxnToAdd?.data?.id) {
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
				categoryName: String(selectedTxnToAdd?.data?.name),
				categoryId: String(selectedTxnToAdd?.data?.id),
				type: selectedTxnToAdd?.data?.type as TransactionType
			};

			await TransactionRequest.createTransaction(payload);
			addToast('Transaction created', 'success');
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactions({
					startDate: start,
					endDate: end,
					categoryId: selectedTxnToAdd?.data?.id
				})
			});
			queryClient.invalidateQueries({
				queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end })
			});
			amount = '';
			description = '';
			startDateValue = new Date();

			closeAddTxnModal();
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenAddTxn}
	onClose={closeAddTxnModal}
	label="Add New Transaction"
	helperText={selectedTxnToAdd?.data?.name}
>
	<div class="px-4 pb-4">
		<div class="space-y-4">
			<div class="w-1/2">
				<DatePickerDropdown label="Transaction date" bind:dateValue={startDateValue} />
			</div>
			<div>
				<CurrencyInput
					inputClass="bg-white"
					required
					label="Amount"
					{currency}
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
		<div class="mt-8 justify-end">
			<div class="mt-8 flex items-center justify-end gap-5">
				<div class="flex-1">
					<BasicButton action={closeAddTxnModal} label="Cancel" variant="error" />
				</div>
				<div class="w-[60%]">
					<BasicButton
						label="Add Transaction"
						action={handleSubmit}
						isLoading={isSubmitting}
						variant="primary"
					/>
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>
