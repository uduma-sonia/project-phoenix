<script lang="ts">
	import Dropdown from '$lib/components/Common/Form/Dropdown.svelte';
	import TxnRowItem from './TxnRowItem.svelte';

	let { txnList } = $props();
	let selectedPlan = $state({
		id: 'all',
		value: 'All'
	});

	const viewOptions = [
		{
			id: 'all',
			value: 'All'
		},
		{
			id: 'expense',
			value: 'Expense'
		},
		{
			id: 'income',
			value: 'Income'
		}
	];
</script>

<div class="mb-4 flex items-center justify-between gap-4">
	<p class="text-lg font-medium md:text-xl">All Transactions</p>

	<div>
		<div class="max-w-[140px] rounded-xl bg-white">
			<Dropdown options={viewOptions} shouldSearch={false} bind:selectedOption={selectedPlan} />
		</div>
	</div>
</div>
<div class="retro_wrapper">
	<div class="retro_wrapper_inner_ejf">
		<div class="flex flex-col overflow-x-auto">
			{#each txnList as txn, index (index)}
				<TxnRowItem {txn} />
			{/each}
		</div>
	</div>
</div>

<style>
	.retro_wrapper_inner_ejf {
		position: relative;
		z-index: 10;
		width: 100%;
		border-radius: 8px;
		border: 2px solid black;
		background-color: #fff;
		padding: 16px;
	}
</style>
