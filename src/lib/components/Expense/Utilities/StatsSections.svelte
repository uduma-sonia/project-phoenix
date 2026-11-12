<script lang="ts">
	import StatItem from '$lib/components/Habit/Utilities/StatItem.svelte';
	import Helpers from '$lib/utils/helpers';
	import ExpenseUtils from './utils';

	let { txnList, start, end, currency } = $props();

	let txnCounts = $derived(ExpenseUtils.getTransactionCounts(txnList));
</script>

<div class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
	<StatItem
		value={Helpers.getCurrency(ExpenseUtils.getDailySpending(txnList, start, end), currency)}
		description="Daily average"
	/>

	<StatItem value={txnCounts?.total} description="Total Transactions" />
	<StatItem value={txnCounts?.income} description="Total Income" />
	<StatItem value={txnCounts?.expense} description="Total Expenses" />
</div>
