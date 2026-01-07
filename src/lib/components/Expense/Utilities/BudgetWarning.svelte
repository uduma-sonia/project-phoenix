<script lang="ts">
	import TextButton from '$lib/components/Common/Form/TextButton.svelte';
	import { TriangleAlert } from '@lucide/svelte';
	import { BudgetCycle } from '../../../../types/transaction';

	let { budgetPercentage, userBudget, goalPeriod } = $props();

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
</script>

<div class="px-3">
	<div
		class="font-lexend text-10 border-brand-error relative flex max-w-lg items-center gap-4 rounded-xl border px-3 pt-2 pb-3.5 font-normal md:text-xs"
	>
		<div class="pulsing">
			<TriangleAlert color="#e7000b" size="30px" />
		</div>

		<p>
			You're approaching your main budget limit for {getTextFromPeriod()}. You've spent {budgetPercentage}%
			of your main budget - {userBudget} already. Keep an eye on your expenses.
		</p>

		<div class="absolute right-3 bottom-1">
			<TextButton label="Close" />
		</div>
	</div>
</div>
