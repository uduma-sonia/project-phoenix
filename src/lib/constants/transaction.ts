import { TransactionType } from '../../types/transaction';

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
