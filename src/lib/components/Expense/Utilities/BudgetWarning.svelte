<script lang="ts">
	import TextButton from '$lib/components/Common/Form/TextButton.svelte';
	import { TriangleAlert, X } from '@lucide/svelte';
	import { BudgetCycle } from '../../../../types/transaction';

	let { budgetPercentage, userBudget, goalPeriod, budgetAlertThreshold } = $props();

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
				{getTextFromPeriod()}. You've spent {budgetPercentage}% of your main budget
				<!-- - {userBudget}  -->
				already.
			</p>

			<div class="mt-2 flex items-center justify-end">
				<TextButton
					className="closeBtn_9oefk"
					label="Close"
					RightIcon={X}
					rightIconProps={{ size: '20px' }}
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
