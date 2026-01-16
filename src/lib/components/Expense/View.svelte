<script lang="ts">
	import DateScroller from './Utilities/DateScroller.svelte';
	import TxnTable from './Utilities/TxnTable.svelte';
	import BalanceCard from './Utilities/BalanceCard.svelte';
	import Breakdown from './Utilities/Breakdown.svelte';
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
	import ExpenseUtils from './Utilities/utils';
	import StatsSections from './Utilities/StatsSections.svelte';
	import BreakdownInsight from './Utilities/BreakdownInsight.svelte';
	import AnalyticsSection from './Utilities/AnalyticsSection.svelte';
	import TxnSettingsModal from '../Modals/TxnSettingsModal.svelte';
	import useCurrentUser from '$lib/hooks/useCurrentUser';
	import BudgetWarning from './Utilities/BudgetWarning.svelte';
	import { currencies } from '$lib/constants/currency';
	import { BudgetCycle } from '../../../types/transaction';
	import CategoryBreakdown from './Utilities/CategoryBreakdown.svelte';
	import SetBudget from '../Modals/SetBudget.svelte';
	import EditTransaction from '../Modals/EditTransaction.svelte';

	let userQuery = useCurrentUser();
	let user = $derived($userQuery?.data?.data?.user);

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

	let showBudgetWarning = $derived(
		user?.isBudgetMode &&
			ExpenseUtils.showBudgetWarning(budgetPercentage, user?.budgetCycle, currentMonth)
	);

	let getCurrency: any = $derived(
		Helpers.transformObjectToList(currencies[0])?.find((item) => item.id === user?.currency)
	);
</script>

<div class="pb-24">
	<p class="font-lexend mb-4 px-3 text-xs font-normal text-wrap">
		Manage and track all your financial transactions and budget
	</p>

	{#if showBudgetWarning}
		<div class="hidde md:bloc">
			<BudgetWarning
				{budgetPercentage}
				userBudget={Helpers.currencyFormatter({
					currency: getCurrency?.details?.code,
					minimumFractionDigits: getCurrency?.details.rounding,
					maximumFractionDigits: getCurrency?.details?.decimal_digits
				}).format(user?.budgetAmount)}
				goalPeriod={user?.budgetCycle}
			/>
		</div>
	{/if}

	<div class="my-4 flex flex-col justify-between px-3 md:flex-row md:items-center">
		<DateScroller
			{nextMonth}
			{prevMonth}
			{currentMonth}
			budgetCycle={user?.budgetCycle}
			{nextWeek}
			{prevWeek}
		/>

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
		<BalanceCard currency={getCurrency} title="Balance" value={txnAnalytics?.balance} />
		<BalanceCard
			currency={getCurrency}
			title="Income"
			value={txnAnalytics?.totalIncome || 0}
			balanceClass="text-brand-green"
		/>
		<BalanceCard
			currency={getCurrency}
			title="Expense"
			value={txnAnalytics?.totalExpense || 0}
			balanceClass="text-brand-error"
		/>
	</div>

	<TxnTable
		txnLoading={$txnQuery?.isLoading}
		isError={$txnQuery?.isError}
		{txnList}
		{start}
		{end}
		{getCurrency}
	/>

	<div class="mt-10 grid grid-cols-1 px-3 md:grid-cols-[2fr_1fr] md:gap-4">
		<div>
			<Breakdown
				{user}
				{breakdownList}
				txnLoading={$txnQuery?.isLoading}
				isError={$txnQuery?.isError}
				{getCurrency}
			/>
		</div>

		<div>
			{#if breakdownList?.length > 2}
				<div class="py-8">
					<BreakdownInsight {insightsStrings} />
				</div>
			{/if}
		</div>
	</div>

	<div class="mt-10 px-3">
		<StatsSections {getCurrency} {txnList} {start} {end} />
	</div>

	<AnalyticsSection chartData={txnAnalytics} />
	{#if user?.isBudgetMode}
		<CategoryBreakdown {getCurrency} {breakdownList} {transactionCategoriesList} />
	{/if}
</div>

<AddTxnModal {transactionCategoriesList} {start} {end} />
<TxnCategoryModal {transactionCategoriesList} />
<TxnSettingsModal />
<SetBudget />
<EditTransaction {transactionCategoriesList} {start} {end} />
