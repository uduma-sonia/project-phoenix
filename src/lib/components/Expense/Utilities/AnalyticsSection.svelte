<script lang="ts">
	import ExpensesChart from './ExpensesChart.svelte';
	import ExpenseUtils from './utils';

	let { chartData, goalPeriod } = $props();

	let expensesAnalyticsData = $derived(
		ExpenseUtils.buildExpensesAnalyticsData(chartData, goalPeriod)
	);
</script>

<div class="mt-10">
	<ExpensesChart
		datasetsLabel="Daily Spend Trend"
		chartType="bar"
		description={expensesAnalyticsData.dailySpendHelperText}
		chartLabelArray={expensesAnalyticsData.dailySpendChartLabel}
		chartDataset={expensesAnalyticsData.dailySpendChartDataset}
	/>
	<br />
	<br />

	<ExpensesChart
		datasetsLabel="Expenses"
		chartType="pie"
		description="Where your money goes across different categories"
		chartLabelArray={expensesAnalyticsData.expenseChartLabel}
		chartDataset={expensesAnalyticsData.expenseChartDataset}
	/>

	<br />
	<br />

	<ExpensesChart
		datasetsLabel="Income"
		chartType="pie"
		description="Where your money comes from and how much each source contributes"
		chartLabelArray={expensesAnalyticsData.incomeChartLabel}
		chartDataset={expensesAnalyticsData.incomeChartDataset}
	/>
</div>
