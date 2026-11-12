<script lang="ts">
	import TextButton from '$lib/components/Common/Form/TextButton.svelte';
	import { TriangleAlert, X } from '@lucide/svelte';
	import { BudgetCycle } from '../../../../types/transaction';
	import { addToast } from '$lib/store/toast';
	import { UserRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { useQueryClient } from '@tanstack/svelte-query';

	let { budgetPercentage, goalPeriod, budgetAlertThreshold } = $props();

	let isSubmitting = $state(false);
	const queryClient = useQueryClient();

	const getTextFromPeriod = () => {
		if (goalPeriod === BudgetCycle.MONTHLY) {
			return 'the month';
		}
		if (goalPeriod === BudgetCycle.WEEKLY) {
			return 'the week';
		}
		if (goalPeriod === BudgetCycle.YEARLY) {
			return 'this year';
		}
		if (goalPeriod === BudgetCycle.QUARTERLY) {
			return 'this quarter';
		}
	};
	const getPrefixText = () => {
		if (budgetPercentage > budgetAlertThreshold && budgetPercentage < 100) {
			return 'Reaching main budget limit for';
		} else {
			return 'Budget limit passed for';
		}
	};

	const handleCloseWrning = async () => {
		try {
			isSubmitting = true;
			const result = await UserRequest.closeBudgetAlert();

			if (result) {
				queryClient.invalidateQueries({
					queryKey: queryKeys.getCurrentUser
				});
			}
		} catch (error: any) {
			addToast(error?.message || 'An error occured', 'error');
		} finally {
			isSubmitting = false;
		}
	};
</script>

<div class="px-3">
	<div
		class="font-lexend border-brand-error retro_block relative flex max-w-lg items-center gap-4 rounded-xl border bg-red-300 p-3 text-sm font-normal"
	>
		<div class="pulsing">
			<TriangleAlert color="#e7000b" size="30px" />
		</div>

		<div>
			<p>
				{getPrefixText()}
				{getTextFromPeriod()}. You've spent {budgetPercentage}% of your main budget already.
			</p>

			<div class="mt-2 flex items-center justify-end">
				<TextButton
					className="closeBtn_9oefk"
					label="Close"
					RightIcon={X}
					isLoading={isSubmitting}
					rightIconProps={{ size: '20px' }}
					action={handleCloseWrning}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	:global(.closeBtn_9oefk) {
		color: black;
		font-weight: 600;
		text-decoration: underline;
	}
</style>
