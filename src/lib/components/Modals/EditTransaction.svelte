<script lang="ts">
	// @ts-nocheck
	import { closeEditTxnModal, modalsState, selectedTxnToEdit } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import Helpers from '$lib/utils/helpers';
	import { format } from 'date-fns';
	import DatePickerMini from '../Common/DatePicker/DatePickerMini.svelte';
	import { TransactionType, type TransactionCategory } from '../../../types/transaction';
	import { addToast } from '$lib/store/toast';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';

	let { transactionCategoriesList, start, end } = $props();

	const queryClient = useQueryClient();

	let isSubmitting = $state(false);
	let type = $derived(selectedTxnToEdit?.data?.type || TransactionType.EXPENSE);
	let startDateValue = $state(new Date());
	let isStartDateOpen = $state(false);
	let amount = $derived('' + selectedTxnToEdit?.data?.amount);
	let description = $derived(selectedTxnToEdit?.data?.description);

	function toggleStart() {
		isStartDateOpen = !isStartDateOpen;
	}

	function handleClickOutside() {
		isStartDateOpen = false;
	}

	function changeType(val: TransactionType) {
		type = val;
	}

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
		<div>
			<div class="space-y-4">
				<div>
					<label for="habitName" class="mb-2">Type</label>

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

				<div class="w-1/2">
					<label for="habitName" class="mb-2"> Date</label>

					<div class="relative">
						<button
							class="button_active font-lexend h-[50px] w-full rounded-lg border px-4 text-left text-sm font-light sm:text-base"
							type="button"
							onclick={toggleStart}
						>
							{format(new Date(startDateValue), 'PPP')}
						</button>

						{#if isStartDateOpen}
							<div
								use:Helpers.clickOutside
								onclick_outside={handleClickOutside}
								class="absolute top-[54px] left-0 z-[9999] gap-4 overflow-hidden rounded-lg bg-white shadow-md"
							>
								<div class="w-[260px] rounded-lg border-2 p-1">
									<DatePickerMini bind:selectedDate={startDateValue} />
								</div>
							</div>
						{/if}
					</div>
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
