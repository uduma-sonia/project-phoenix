<script lang="ts">
	// @ts-nochec
	import { closeTxnSettingsModal, modalsState } from '$lib/state/modal.svelte';
	import ModalWrapper from '../Common/ModalWrapper.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import Dropdown from '../Common/Form/Dropdown.svelte';
	import Helpers from '$lib/utils/helpers';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { currencies } from '$lib/constants/currency';
	import { Check } from '@lucide/svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import { UserRequest } from '$lib/requests';
	import { addToast } from '$lib/store/toast';
	import { queryKeys } from '$lib/utils/queryKeys';
	import BasicInputField from '../Common/Form/BasicInputField.svelte';
	import { budgetCycles } from '$lib/constants/transaction';
	import { BudgetCycle } from '../../../types/transaction';

	const queryClient = useQueryClient();
	let isLoading = $state(false);

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);

	let currencyOptions = $derived(
		Helpers.transformObjectToList(currencies[0])?.map((item: any) => {
			return {
				value: item?.details.name,
				id: item?.details.code
			};
		})
	);

	let getCurrency: any = $derived(
		Helpers.transformObjectToList(currencies[0])?.find((item) => item.id === user?.currency)
	);
	let selectedCurrency = $derived({
		value: getCurrency?.details?.name,
		id: getCurrency?.id
	});

	let selectedCycle = $state({ id: BudgetCycle.MONTHLY, value: 'Monthly' });
	let isBudgetMode = $derived(user?.isBudgetMode);
	let budgetAmount = $derived(user?.budgetAmount);

	async function onSubmit() {
		try {
			isLoading = true;

			const result = await UserRequest.updateUser(user?._id, {
				isBudgetMode,
				currency: selectedCurrency.id,
				budgetAmount: Number(budgetAmount),
				budgetCycle: selectedCycle?.id
			});

			if (result) {
				addToast('Profile updated', 'success');
				queryClient.invalidateQueries({ queryKey: queryKeys.getCurrentUser });
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isLoading = false;
		}
	}
</script>

<ModalWrapper
	isOpen={modalsState.data.isOpenTxnSettings}
	onClose={closeTxnSettingsModal}
	label="Expense Settings"
>
	<div class="p-4">
		<div>
			{#if currencyOptions?.length}
				<Dropdown
					label="Currency"
					placeholder="Select currency"
					options={currencyOptions}
					bind:selectedOption={selectedCurrency}
					shouldSearch={true}
					withClearButton={true}
				/>
			{/if}

			<div class="my-6 flex items-center gap-2">
				<button
					class="button_active relative flex h-7 w-7 items-center justify-center rounded-md border-2 p-0"
					aria-label="Private"
					type="button"
					onclick={() => (isBudgetMode = !isBudgetMode)}
				>
					{#if isBudgetMode}
						<Check size="22px" />
					{/if}
				</button>
				<p class="font-lexend text-sm font-light">Budget mode</p>
			</div>

			{#if isBudgetMode}
				<div class="space-y-6">
					<Dropdown
						label="Budget cycle"
						placeholder="Select cycle"
						options={budgetCycles}
						bind:selectedOption={selectedCycle}
						shouldSearch={true}
						withClearButton={true}
					/>

					<BasicInputField
						label="Budget Amount"
						bind:value={budgetAmount}
						type="number"
						id="amount"
						name="amount"
						required={isBudgetMode}
						inputMode="numeric"
					/>
				</div>
			{/if}
		</div>

		<div class="mt-12 justify-end">
			<div class="flex items-center justify-end gap-5">
				<div class="flex-1">
					<BasicButton action={closeTxnSettingsModal} label="Cancel" variant="error" />
				</div>
				<div class="w-[60%]">
					<BasicButton {isLoading} action={onSubmit} label="Save" variant="primary" />
				</div>
			</div>
		</div>
	</div>
</ModalWrapper>
