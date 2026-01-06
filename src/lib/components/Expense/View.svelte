<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import TxnTable from './Utilities/TxnTable.svelte';
	import BalanceCard from './Utilities/BalanceCard.svelte';
	import Breakdown from './Utilities/Breakdown.svelte';
	import DaysChart from './Utilities/DaysChart.svelte';
	import { Cog, Plus, Settings2 } from '@lucide/svelte';
	import AddTxnModal from '../Modals/AddTxnModal.svelte';
	import { openAddTxnModal, openTxnCategoryModal } from '$lib/state/modal.svelte';
	import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';
	import TxnCategoryModal from '../Modals/TxnCategoryModal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';

	let txnCategoriesQuery = createQuery({
		queryKey: queryKeys.getTransactionCategories,
		queryFn: () => TransactionRequest.getTransactionCategories()
	});

	let transactionCategoriesList = $derived($txnCategoriesQuery?.data?.data?.transactionCategories);

	const moreOptions = [
		{
			label: 'Manage category',
			icon: Settings2,
			action: openTxnCategoryModal
		},
		{
			label: 'Settings',
			icon: Cog
		}
	];
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">Track and manage your expenses</p>

	<div class="my-4 flex flex-col justify-between px-3 md:flex-row md:items-center">
		<DateScroller />

		<div class="mt-4 flex w-fit items-center justify-end gap-4 md:mt-0">
			<div>
				<button
					class="shadow_button shadow_button_thin shadow_button_with_icon"
					onclick={openAddTxnModal}
				>
					<Plus size="20px" />

					Add Transaction
				</button>
			</div>

			<div>
				<HamburgerDropdown variant="solid" options={moreOptions} />
			</div>
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

<AddTxnModal {transactionCategoriesList} />
<TxnCategoryModal {transactionCategoriesList} />
