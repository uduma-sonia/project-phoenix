import { BudgetCycle, TransactionType } from '../../types/transaction';

export const viewOptions = [
	{
		id: 'ALL',
		value: 'All'
	},
	{
		id: TransactionType.EXPENSE,
		value: 'Expense'
	},
	{
		id: TransactionType.INCOME,
		value: 'Income'
	}
];

export const budgetCycles = [
	{ id: BudgetCycle.WEEKLY, value: 'Weekly' },
	// { id: BudgetCycle.BI_WEEKLY, value: 'Bi-Weekly' },
	{ id: BudgetCycle.MONTHLY, value: 'Monthly' },
	{ id: BudgetCycle.QUARTERLY, value: 'Quarterly' },
	{ id: BudgetCycle.YEARLY, value: 'Yearly' }
];
