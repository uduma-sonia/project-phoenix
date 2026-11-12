<script lang="ts">
	import { format } from 'date-fns';
	import ChartCard from '$lib/components/Common/ChartCard.svelte';
	import { BudgetCycle } from '../../../../types/transaction';

	let { chartData, goalPeriod } = $props();

	const chartLabel = $derived(chartData?.map((item: any) => format(new Date(item.date), 'MMM d')));
	const chartAmount = $derived(chartData?.map((item: any) => item.amount));

	const getHelperText = () => {
		let result = `How much you've spent`;
		if (goalPeriod === BudgetCycle.MONTHLY) {
			result = result + '<span class="font-semibold"> this month </span>';
		}
		if (goalPeriod === BudgetCycle.WEEKLY) {
			result = result + '<span class="font-semibold"> this week </span>';
		}
		if (goalPeriod === BudgetCycle.YEARLY) {
			result = result + '<span class="font-semibold"> this year </span>';
		}
		if (goalPeriod === BudgetCycle.QUARTERLY) {
			result = result + '<span class="font-semibold"> this quarter </span>';
		}

		return result;
	};
</script>

<ChartCard
	chartType="bar"
	chartLabelArray={chartLabel}
	dataset={chartAmount}
	datasetsLabel="Daily Spend Trend"
	helperText={getHelperText()}
/>
