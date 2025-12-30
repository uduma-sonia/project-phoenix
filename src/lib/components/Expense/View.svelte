<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import TxnTable from './Utilities/TxnTable.svelte';
	import BalanceCard from './Utilities/BalanceCard.svelte';
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Track and manage your expenses</p>

	<DateScroller />

	<div
		class="no-scrollbar flex w-full flex-nowrap items-center gap-3 overflow-x-auto px-3 py-3 md:gap-6"
	>
		<BalanceCard title="Balance" value={10000000} />
		<BalanceCard title="Income" value={120000} />
		<BalanceCard title="Expense" value={-20000} />
	</div>

	<div class="mt-10 grid grid-cols-1 gap-4 px-3 md:grid-cols-[2fr_1fr]">
		<div class="w-full">
			<TxnTable />
		</div>
		<div class=""></div>
	</div>
</div>
