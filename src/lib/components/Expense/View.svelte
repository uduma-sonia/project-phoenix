<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import TxnTable from './Utilities/TxnTable.svelte';
	import BalanceCard from './Utilities/BalanceCard.svelte';
	import Breakdown from './Utilities/Breakdown.svelte';
	import DaysChart from './Utilities/DaysChart.svelte';
	import { Cog, Plus, ClipboardList } from '@lucide/svelte';
	import AddTxnModal from '../Modals/AddTxnModal.svelte';
	import {
		openAddTxnModal,
		openTxnCategoryModal,
		openTxnSettingsModal
	} from '$lib/state/modal.svelte';
	import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';
	import TxnCategoryModal from '../Modals/TxnCategoryModal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import Helpers from '$lib/utils/helpers';
	import { addMonths, endOfMonth, startOfMonth, subMonths } from 'date-fns';
	import ExpenseUtils from './Utilities/utils';
	import StatsSections from './Utilities/StatsSections.svelte';
	import BreakdownInsight from './Utilities/BreakdownInsight.svelte';
	import BarChart from '../Common/BarChart.svelte';
	import CategoryChart from './Utilities/CategoryChart.svelte';
	import AnalyticsSection from './Utilities/AnalyticsSection.svelte';
	import TxnSettingsModal from '../Modals/TxnSettingsModal.svelte';

	let currentMonth = $state(new Date());

	let { start, end } = $derived(
		Helpers.getStartAndEndDates({
			startDate: startOfMonth(currentMonth),
			endDate: endOfMonth(currentMonth)
		})
	);
	let txnQuery = $derived(
		createQuery({
			queryKey: queryKeys.getTransactions({ startDate: start, endDate: end }),
			queryFn: () => TransactionRequest.getTransactions({ startDate: start, endDate: end })
		})
	);

	let txnList = $derived($txnQuery?.data?.data?.transactions);
	let { totalIncome, totalExpense, balance } = $derived(ExpenseUtils.getTotals(txnList));

	let txnCategoriesQuery = createQuery({
		queryKey: queryKeys.getTransactionCategories,
		queryFn: () => TransactionRequest.getTransactionCategories()
	});
	let transactionCategoriesList = $derived($txnCategoriesQuery?.data?.data?.transactionCategories);
	let breakdownList = $derived(ExpenseUtils.getBreakdownList(txnList, 'desc'));
	let insightsStrings = $derived(ExpenseUtils.getInsights(txnList));

	const moreOptions = [
		{
			label: 'Manage category',
			icon: ClipboardList,
			action: openTxnCategoryModal
		},
		{
			label: 'Settings',
			icon: Cog,
			action: openTxnSettingsModal
		}
	];

	const prevMonth = () => {
		currentMonth = subMonths(currentMonth, 1);
	};

	const nextMonth = () => {
		currentMonth = addMonths(currentMonth, 1);
	};
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Manage and track all your financial transactions
	</p>

	<div class="my-4 flex flex-col justify-between px-3 md:flex-row md:items-center">
		<DateScroller {nextMonth} {prevMonth} {currentMonth} />

		<div class="mt-4 flex w-full items-center justify-end gap-4 md:mt-0 md:w-fit">
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
		<BalanceCard title="Balance" value={balance} />
		<BalanceCard title="Income" value={totalIncome} balanceClass="text-brand-green" />
		<BalanceCard title="Expense" value={totalExpense} balanceClass="text-brand-error" />
	</div>

	<div class="gri mt-6 grid-cols-1 px-3 md:grid-cols-[2fr_1fr] md:gap-4">
		<TxnTable
			txnLoading={$txnQuery?.isLoading}
			isError={$txnQuery?.isError}
			{txnList}
			{start}
			{end}
		/>
	</div>

	<div class="mt-10 grid grid-cols-1 px-3 md:grid-cols-[2fr_1fr] md:gap-4">
		<div>
			<Breakdown {breakdownList} txnLoading={$txnQuery?.isLoading} isError={$txnQuery?.isError} />
		</div>

		<div class="py-8">
			{#if breakdownList?.length > 2}
				<BreakdownInsight {insightsStrings} />
			{/if}
		</div>
	</div>

	<div class="mt-10 px-3">
		<StatsSections {txnList} {start} {end} />
	</div>

	<AnalyticsSection {txnList} />
</div>

<AddTxnModal {transactionCategoriesList} {start} {end} />
<TxnCategoryModal {transactionCategoriesList} />
<TxnSettingsModal />
