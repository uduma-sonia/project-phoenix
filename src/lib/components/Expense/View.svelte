<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import TxnTable from './Utilities/TxnTable.svelte';
	import BalanceCard from './Utilities/BalanceCard.svelte';
	import Breakdown from './Utilities/Breakdown.svelte';
	import DaysChart from './Utilities/DaysChart.svelte';
	import BasicButton from '../Common/Form/BasicButton.svelte';
	import { Plus } from '@lucide/svelte';
	import AddTxnModal from '../Modals/AddTxnModal.svelte';
	import { openAddTxnModal } from '$lib/state/modal.svelte';
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Track and manage your expenses</p>

	<div class="my-4 flex flex-col justify-between px-3 md:flex-row md:items-center">
		<DateScroller />

		<div class="mt-4 w-fit md:mt-0">
			<BasicButton label="Add Transaction" LeftIcon={Plus} action={openAddTxnModal} />
		</div>
	</div>

	<div
		class="no-scrollbar flex w-full flex-nowrap items-center gap-3 overflow-x-auto px-3 py-3 md:gap-6"
	>
		<BalanceCard title="Balance" value={10000000} />
		<BalanceCard title="Income" value={120000} />
		<BalanceCard title="Expense" value={20000} />
	</div>

	<div class="mt-6 grid grid-cols-1 px-3 md:grid-cols-[2fr_1fr] md:gap-4">
		<div>
			<TxnTable />
		</div>
		<div></div>
	</div>

	<div class="mt-10 grid grid-cols-1 px-3 md:grid-cols-[2fr_1fr] md:gap-4">
		<div>
			<Breakdown />
		</div>
		<div></div>
	</div>

	<DaysChart />
</div>

<AddTxnModal />
