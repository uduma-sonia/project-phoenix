<script lang="ts">
	import { TransactionRequest } from '$lib/requests';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { createQuery } from '@tanstack/svelte-query';
	import AnalyticsSection from '../Utilities/AnalyticsSection.svelte';
	import BreakdownInsight from '../Utilities/BreakdownInsight.svelte';
	import StatsSections from '../Utilities/StatsSections.svelte';
	import ExpenseUtils from '../Utilities/utils';

	let { currency, start, end, txnAnalytics, budgetCycle } = $props();

	let txnQuery = $derived(
		createQuery({
			queryKey: queryKeys.getTransactions({ startDate: start, endDate: end }),
			queryFn: () => TransactionRequest.getTransactions({ startDate: start, endDate: end })
		})
	);

	let txnList = $derived($txnQuery?.data?.data?.transactions);
	let breakdownList = $derived(ExpenseUtils.getBreakdownList(txnList, 'desc'));
	let insightsStrings = $derived(
		ExpenseUtils.getInsights(txnList, txnAnalytics?.totalIncome, txnAnalytics?.totalExpense)
	);
</script>

<div class="mt-6 px-3">
	<StatsSections {currency} {txnList} {start} {end} />
	<div class="pt-8 pb-4">
		{#if breakdownList?.length > 2}
			<BreakdownInsight {insightsStrings} />
		{/if}
	</div>
	<AnalyticsSection goalPeriod={budgetCycle} chartData={txnAnalytics} />
</div>
