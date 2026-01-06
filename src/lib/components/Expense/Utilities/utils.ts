import Helpers from '$lib/utils/helpers';
import { TransactionType, type Transaction } from '../../../../types/transaction';

class ExpenseUtils {
	static getIncomeTotal(transactions: Transaction[]) {
		if (!transactions?.length) return 0;

		const filteredIncome = transactions?.filter((item) => item.type === TransactionType.INCOME);
		const getAmountList = filteredIncome.map((item) => item.amount);
		const result = Helpers.sumArray(getAmountList);

		return result;
	}

	static getExpensesTotal(transactions: Transaction[]) {
		if (!transactions?.length) return 0;

		const filteredIncome = transactions.filter((item) => item.type === TransactionType.EXPENSE);
		const getAmountList = filteredIncome.map((item) => item.amount);
		const result = Helpers.sumArray(getAmountList);
		return result;
	}

	static getBalanceTotal(transactions: Transaction[]) {
		if (!transactions?.length) return 0;
		const incomeValue = this.getIncomeTotal(transactions);
		const expensesValue = this.getExpensesTotal(transactions);
		const result = incomeValue - expensesValue;

		return result;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static sortTransactionsGroupByAmount(transactions: any[], sort: 'asc' | 'desc' = 'asc') {
		return transactions.sort((a, b) => (sort === 'asc' ? a.count - b.count : b.count - a.count));
	}

	static getBreakdownList(transactions: Transaction[], sort: 'asc' | 'desc' = 'asc') {
		if (!transactions) return [];

		const result = transactions?.filter((item) => item.type === TransactionType.EXPENSE);

		return result.reduce(
			(acc, transaction) => {
				const { categoryName, amount } = transaction;
				const existingCategory = acc.find(
					(item: { categoryName: string; totalAmount: number; count: number }) =>
						item.categoryName === categoryName
				);

				if (existingCategory) {
					existingCategory.totalAmount += amount;
					existingCategory.count += 1;
				} else {
					acc.push({ categoryName, totalAmount: amount, count: 1 });
				}

				return this.sortTransactionsGroupByAmount(acc, sort);
			},
			[] as { categoryName: string; totalAmount: number; count: number }[]
		);
	}
}

export default ExpenseUtils;
