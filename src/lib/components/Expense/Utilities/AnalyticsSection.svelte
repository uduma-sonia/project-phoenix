<script lang="ts">
	import CategoryChart from './CategoryChart.svelte';
	import DailySpendChart from './DailySpendChart.svelte';

	let { chartData } = $props();

	let currentView = $state('daily');

	let viewList = [
		{
			id: 'daily',
			label: 'Daily spend'
		},
		{
			id: 'expense',
			label: 'Expense trend'
		},
		{
			id: 'income',
			label: 'Income trend'
		}
	];

	function changeView(view: string) {
		currentView = view;
	}
</script>

<div class="mt-10 px-3">
	<div class="mb-6 flex items-center gap-3">
		{#each viewList as item, index (index)}
			<button
				class:bg-brand-build={currentView === item.id}
				onclick={() => changeView(item.id)}
				class="button_active text-13 h-[45px] rounded-lg border px-2 shadow-sm md:text-sm"
				type="button"
			>
				{item.label}
			</button>
		{/each}
	</div>

	{#if currentView === 'daily'}
		<DailySpendChart chartData={chartData?.dailyExpenseLineData} />
	{/if}

	{#if currentView === 'expense'}
		<CategoryChart
			chartData={chartData?.expenseGroupLineData}
			title="Expenses by Category"
			description="Breaks down where your money goes across different spending categories"
		/>
	{/if}
	{#if currentView === 'income'}
		<CategoryChart
			chartData={chartData?.expenseGroupLineData}
			title="Income by Category"
			description="Shows where your money comes from and how much each source contributes"
		/>
	{/if}
</div>
