<script lang="ts">
	import { closeAddTxnModal, closeMealPlannerModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';

	// let { transactionCategoriesList, start, end } = $props();
	// const queryClient = useQueryClient();

	// let isSubmitting = $state(false);
	// let type = $state(TransactionType.EXPENSE);
	// let startDateValue = $state(new Date());
	// let isStartDateOpen = $state(false);
	// let amount = $state('');
	// let description = $state('');

	// function toggleStart() {
	// 	isStartDateOpen = !isStartDateOpen;
	// }

	// function handleClickOutside() {
	// 	isStartDateOpen = false;
	// }

	// function changeType(val: TransactionType) {
	// 	type = val;
	// }

	// let transformedList = $derived(
	// 	transactionCategoriesList?.filter((item: TransactionCategory) => item.type === type)
	// );

	// let txnCategoriesOptions = $derived(
	// 	transformedList?.map((item: any) => {
	// 		return {
	// 			value: item.name,
	// 			id: item._id
	// 		};
	// 	})
	// );
	// let selectedCategory = $derived({ value: '', id: '' });

	// async function handleSubmit() {
	// 	if (!selectedCategory?.id) {
	// 		addToast('Select a category', 'error');
	// 		return;
	// 	}
	// 	if (!amount) {
	// 		addToast('Add an amount', 'error');
	// 		return;
	// 	}
	// 	try {
	// 		isSubmitting = true;

	// 		const payload = {
	// 			date: startDateValue,
	// 			description,
	// 			amount: Number(amount),
	// 			categoryName: selectedCategory?.value,
	// 			categoryId: selectedCategory?.id,
	// 			type
	// 		};

	// 		await TransactionRequest.createTransaction(payload);
	// 		addToast('Transaction created', 'success');
	// 		queryClient.invalidateQueries({
	// 			queryKey: queryKeys.getTransactions({ startDate: start, endDate: end })
	// 		});
	// 		amount = '';
	// 		selectedCategory = { value: '', id: '' };
	// 		description = '';
	// 		startDateValue = new Date();

	// 		closeAddTxnModal();
	// 	} catch (error: any) {
	// 		addToast(error?.message || 'An error occured', 'error');
	// 	} finally {
	// 		isSubmitting = false;
	// 	}
	// }
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenMealPlanner}
	onClose={closeMealPlannerModal}
	label="Add breakfast"
>
	<div class="p-4">
		<div>
			<BasicInputField
				inputMode="numeric"
				label="Amount"
				type="number"
				id="amount"
				name="amount"
				required
			/>
		</div>
		<div>
			<BasicInputField
				label="Description"
				placeholder="Enter description"
				type="text"
				id="description"
				name="description"
			/>
		</div>
		<div class="fle mt-8 justify-end">
			<div class="mt-8 flex items-center justify-end gap-5">
				<div class="flex-1">
					<BasicButton action={closeAddTxnModal} label="Cancel" variant="error" />
				</div>
				<div class="w-[60%]">
					<BasicButton label="Add Transaction" variant="primary" />
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>
