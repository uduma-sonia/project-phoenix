<script lang="ts">
	import BreakdownCard from './BreakdownCard.svelte';

	let { breakdownList, transactionCategoriesList, currency, budgetAlertThreshold } = $props();

	$effect(() => console.log(breakdownList));
</script>

<div class="mt-10 px-3 pb-20">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		breakdwoncard
		<!-- {#each breakdownList as item, index (index)}
			<BreakdownCard {item} {transactionCategoriesList} {currency} {budgetAlertThreshold} />
		{/each} -->
	</div>
</div>
