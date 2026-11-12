<script lang="ts">
	import CategoryChart from './CategoryChart.svelte';
	import DailySpendChart from './DailySpendChart.svelte';

	let { chartData, goalPeriod } = $props();
</script>

<div class="mt-10">
	<DailySpendChart {goalPeriod} chartData={chartData?.dailyExpenseLineData} />

	<br />
	<br />
	<CategoryChart
		chartData={chartData?.expenseGroupLineData}
		title="Expenses"
		chartType="pie"
		description="Where your money goes across different categories"
	/>

	<br />
	<br />
	<CategoryChart
		chartData={chartData?.incomeGroupLineData}
		title="Income"
		chartType="pie"
		description="Where your money comes from and how much each source contributes"
	/>
</div>
