<script lang="ts">
	// import DateScroller from './Utilities/DateScroller.svelte';
	// import TxnTable from './Utilities/TxnTable.svelte';
	// import BalanceCard from './Utilities/BalanceCard.svelte';
	// import Breakdown from './Utilities/Breakdown.svelte';
	import { Cog, Plus, ClipboardList, LineChart, ChartColumnIncreasing } from '@lucide/svelte';
	// import AddTxnModal from '../Modals/AddTxnModal.svelte';
	// import {
	// 	openAddTxnModal,
	// 	openTxnCategoryModal,
	// 	openTxnSettingsModal
	// } from '$lib/state/modal.svelte';
	// import HamburgerDropdown from '../Common/HamburgerDropdown.svelte';
	// import TxnCategoryModal from '../Modals/TxnCategoryModal.svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { queryKeys } from '$lib/utils/queryKeys';
	import { TransactionRequest } from '$lib/requests';
	import Helpers from '$lib/utils/helpers';
	import {
		addMonths,
		addWeeks,
		endOfMonth,
		endOfWeek,
		startOfMonth,
		startOfWeek,
		subMonths,
		subWeeks
	} from 'date-fns';
	// import ExpenseUtils from './Utilities/utils';
	// import StatsSections from './Utilities/StatsSections.svelte';
	// import BreakdownInsight from './Utilities/BreakdownInsight.svelte';
	// import AnalyticsSection from './Utilities/AnalyticsSection.svelte';
	// import TxnSettingsModal from '../Modals/TxnSettingsModal.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	// import BudgetWarning from './Utilities/BudgetWarning.svelte';
	import { currencies } from '$lib/constants/currency';
	import {
		openAddTxnModal,
		openTxnCategoryModal,
		openTxnSettingsModal
	} from '$lib/state/modal.svelte';
	import { BudgetCycle, TransactionType } from '../../../../types/transaction';
	import ExpenseUtils from '../Utilities/utils';
	import BudgetWarning from '../Utilities/BudgetWarning.svelte';
	import DateScroller from '../Utilities/DateScroller.svelte';
	import HamburgerDropdown from '$lib/components/Common/HamburgerDropdown.svelte';
	import BalanceCard from '../Utilities/BalanceCard.svelte';
	import TxnTable from '../Utilities/TxnTable.svelte';
	import AddTxnModal from '$lib/components/Modals/AddTxnModal.svelte';
	import EditTransaction from '$lib/components/Modals/EditTransaction.svelte';
	import SetBudget from '$lib/components/Modals/SetBudget.svelte';
	import TxnCategoryModal from '$lib/components/Modals/TxnCategoryModal.svelte';
	import TxnSettingsModal from '$lib/components/Modals/TxnSettingsModal.svelte';
	import ExpensesCard from './ExpensesCard.svelte';
	import TabButton from '$lib/components/Common/TabButton.svelte';
	import BreakdownInsight from '../Utilities/BreakdownInsight.svelte';
	// import { BudgetCycle } from '../../../types/transaction';
	// import CategoryBreakdown from './Utilities/CategoryBreakdown.svelte';
	// import SetBudget from '../Modals/SetBudget.svelte';
	// import EditTransaction from '../Modals/EditTransaction.svelte';
	import Breakdown from '../Utilities/Breakdown.svelte';
	import LoaderError from '$lib/components/Common/LoaderError.svelte';
	import ProgressLoader from '$lib/components/Common/ProgressLoader.svelte';
	import StatsSections from '../Utilities/StatsSections.svelte';
	import CategoryBreakdown from '../Utilities/CategoryBreakdown.svelte';
	import AnalyticsSection from '../Utilities/AnalyticsSection.svelte';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);
	let budgetAlertThreshold = $derived(user?.budgetAlertThreshold);

	let currentMonth = $state(new Date());
	let { start, end } = $derived(
		user?.budgetCycle === BudgetCycle.WEEKLY
			? Helpers.getStartAndEndDates({
					startDate: startOfWeek(currentMonth),
					endDate: endOfWeek(currentMonth)
				})
			: Helpers.getStartAndEndDates({
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
	let txnAnalyticsQuery = $derived(
		createQuery({
			queryKey: queryKeys.getTransactionAnalytics({ startDate: start, endDate: end }),
			queryFn: () => TransactionRequest.getTransactionAnalytics({ startDate: start, endDate: end })
		})
	);

	let txnAnalytics = $derived($txnAnalyticsQuery?.data?.data?.analytics);
	let txnList = $derived($txnQuery?.data?.data?.transactions);

	let txnCategoriesQuery = createQuery({
		queryKey: queryKeys.getTransactionCategories,
		queryFn: () => TransactionRequest.getTransactionCategories()
	});
	let transactionCategoriesList = $derived($txnCategoriesQuery?.data?.data?.transactionCategories);
	let breakdownList = $derived(ExpenseUtils.getBreakdownList(txnList, 'desc'));
	let insightsStrings = $derived(
		ExpenseUtils.getInsights(txnList, txnAnalytics?.totalIncome, txnAnalytics?.totalExpense)
	);
	let budgetPercentage = $derived(
		Helpers.getPercentage(txnAnalytics?.totalExpense, user?.budgetAmount)
	);
	// let currentTab = $state(TransactionType.EXPENSE);
	let currentTab = $state(TransactionType.EXPENSE);
	let openedCategoryId = $state('');

	let isLoading = $derived(
		$txnCategoriesQuery?.status === 'pending' ||
			$txnCategoriesQuery?.isLoading ||
			$txnAnalyticsQuery?.status === 'pending' ||
			$txnAnalyticsQuery?.isLoading
	);
	let isError = $derived(
		$txnCategoriesQuery?.status === 'error' ||
			$txnCategoriesQuery?.isError ||
			$txnAnalyticsQuery?.status === 'error' ||
			$txnAnalyticsQuery?.isError
	);

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

	const prevWeek = () => {
		currentMonth = subWeeks(currentMonth, 1);
	};

	const nextWeek = () => {
		currentMonth = addWeeks(currentMonth, 1);
	};
	const getExpenseStats = (expenseGroupLineData: any[], txnId: string) => {
		return expenseGroupLineData?.find((expGroup) => expGroup?.categoryId === txnId);
	};

	let showBudgetWarning = $derived(
		user?.isBudgetMode &&
			ExpenseUtils.showBudgetWarning(
				budgetPercentage,
				user?.budgetCycle,
				currentMonth,
				budgetAlertThreshold
			)
	);

	let _currency: any = $derived(user?.currency);
	let sortedList: any = $derived(
		ExpenseUtils.sortTxnList(
			transactionCategoriesList,
			currentTab === TransactionType.EXPENSE
				? txnAnalytics?.expenseGroupLineData
				: txnAnalytics?.incomeGroupLineData,
			currentTab
		)
	);

	function changeTab(arg: any) {
		currentTab = arg;
	}

	function toggleCategory(id: string) {
		if (id === openedCategoryId) {
			openedCategoryId = '';
		} else {
			openedCategoryId = id;
		}
	}

	// $effect(() => console.log(sortedList));
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Manage and track all your financial transactions and budget
	</p>

	<!-- {#if showBudgetWarning}
		<div class="hidde md:bloc">
			<BudgetWarning
				{budgetAlertThreshold}
				{budgetPercentage}
				userBudget={Helpers.currencyFormatter({
					currency: getCurrency?.details?.code,
					minimumFractionDigits: getCurrency?.details.rounding,
					maximumFractionDigits: getCurrency?.details?.decimal_digits
				}).format(user?.budgetAmount)}
				goalPeriod={user?.budgetCycle}
			/>
		</div>
	{/if} -->

	<div class="mt-4 flex flex-row items-center justify-end px-3 md:flex-row">
		<div>
			<DateScroller
				{nextMonth}
				{prevMonth}
				{currentMonth}
				budgetCycle={user?.budgetCycle}
				{nextWeek}
				{prevWeek}
			/>
		</div>

		<div>
			<HamburgerDropdown variant="solid" options={moreOptions} />
		</div>
	</div>

	<div
		class="no-scrollbar flex w-full flex-nowrap items-center gap-3 overflow-x-auto px-3 py-3 md:gap-6"
	>
		<BalanceCard currency={_currency} title="Balance" value={txnAnalytics?.balance} />
		<BalanceCard
			currency={_currency}
			title="Income"
			value={txnAnalytics?.totalIncome || 0}
			balanceClass="text-brand-green"
		/>
		<BalanceCard
			currency={_currency}
			title="Expense"
			value={txnAnalytics?.totalExpense || 0}
			balanceClass="text-brand-error"
		/>
	</div>

	<div class="no-scrollbar mt-4 flex items-center justify-between gap-3 overflow-x-auto px-3">
		<div class="no-scrollbar flex items-center gap-3">
			<button
				class="h-8 rounded-lg border-2 px-3"
				class:active_tab={currentTab === TransactionType.EXPENSE}
				onclick={() => changeTab(TransactionType.EXPENSE)}
			>
				Expenses
			</button>
			<button
				class="h-8 rounded-lg border-2 px-3"
				class:active_tab={currentTab === TransactionType.INCOME}
				onclick={() => changeTab(TransactionType.INCOME)}
			>
				Income
			</button>
		</div>

		<div>
			<button
				class="h-8 w-6 min-w-max rounded-lg border-2 px-3"
				class:active_tab={currentTab === ('stats' as any)}
				onclick={() => changeTab('stats')}
			>
				<ChartColumnIncreasing size="20" />
			</button>
		</div>
	</div>

	{#if currentTab === ('stats' as any)}
		<div class="mt-6 px-3">
			<StatsSections currency={_currency} {txnList} {start} {end} />
			<AnalyticsSection goalPeriod={user?.budgetCycle} chartData={txnAnalytics} />
		</div>
	{:else}
		<div class="mt-6 grid grid-cols-1 gap-4 px-3">
			<ProgressLoader {isLoading} error={isError} />
			{#if !isLoading}
				{#each sortedList as item, index (item.id)}
					<ExpensesCard
						expense={item}
						currency={_currency}
						showTopExpensesTag={sortedList?.length > 3 && index <= 1}
						{openedCategoryId}
						{toggleCategory}
						{start}
						{end}
						{budgetAlertThreshold}
					/>
				{/each}
			{/if}
		</div>
	{/if}
</div>

<AddTxnModal currency={_currency} {start} {end} />
<TxnCategoryModal {transactionCategoriesList} />
<TxnSettingsModal />
<!-- <SetBudget /> -->
<EditTransaction {start} {end} />

<style>
	.active_tab {
		background-color: var(--color-primary-biloba-950);
		border: 1px solid var(--color-primary-biloba-950);
		color: #ffffff;
		font-size: 14px;
	}
</style>
