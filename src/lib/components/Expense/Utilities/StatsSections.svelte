<script lang="ts">
	import StatItem from '$lib/components/Habit/Utilities/StatItem.svelte';
	import Helpers from '$lib/utils/helpers';
	import ExpenseUtils from './utils';
	import { currencies } from '$lib/constants/currency';

	let { txnList, start, end } = $props();

	const getCurrency: any = Helpers.transformObjectToList(currencies[0])?.find(
		(item) => item.id === 'NGN'
	);

	let txnCounts = $derived(ExpenseUtils.getTransactionCounts(txnList));
</script>

<div class="grid grid-cols-2 gap-6">
	<StatItem value={txnCounts?.total} description="Total Transactions" />
	<StatItem value={txnCounts?.income} description="Total Income" />
	<StatItem value={txnCounts?.expense} description="Total Expenses" />
	<StatItem
		value={Helpers.currencyFormatter({
			currency: getCurrency?.details?.code,
			minimumFractionDigits: getCurrency?.details.rounding,
			maximumFractionDigits: getCurrency?.details?.decimal_digits
		}).format(ExpenseUtils.getDailySpending(txnList, start, end))}
		description="Daily average spending"
	/>
</div>
