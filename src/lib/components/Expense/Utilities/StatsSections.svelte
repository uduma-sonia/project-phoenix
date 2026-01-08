<script lang="ts">
	import StatItem from '$lib/components/Habit/Utilities/StatItem.svelte';
	import Helpers from '$lib/utils/helpers';
	import ExpenseUtils from './utils';

	let { txnList, start, end, getCurrency } = $props();

	let txnCounts = $derived(ExpenseUtils.getTransactionCounts(txnList));
</script>

<div class="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
	<StatItem
		value={getCurrency?.id
			? Helpers.currencyFormatter({
					currency: getCurrency?.details?.code,
					minimumFractionDigits: getCurrency?.details.rounding,
					maximumFractionDigits: getCurrency?.details?.decimal_digits
				}).format(ExpenseUtils.getDailySpending(txnList, start, end))
			: ''}
		description="Daily average spending"
	/>
	<StatItem value={txnCounts?.total} description="Total Transactions" />
	<StatItem value={txnCounts?.income} description="Total Income" />
	<StatItem value={txnCounts?.expense} description="Total Expenses" />
</div>
