<script lang="ts">
	import BreakdownCard from './BreakdownCard.svelte';

	let { breakdownList, transactionCategoriesList, getCurrency, budgetAlertThreshold } = $props();
</script>

<div class="mt-10 px-3 pb-96">
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
		{#each breakdownList as item, index (index)}
			<BreakdownCard {item} {transactionCategoriesList} {getCurrency} {budgetAlertThreshold} />
		{/each}
	</div>
</div>
