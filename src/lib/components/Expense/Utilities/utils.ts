import Helpers from '$lib/utils/helpers';
import { differenceInDays, parseISO } from 'date-fns';
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

	static getTotals(transactions: Transaction[]) {
		let income = 0;
		let expense = 0;

		for (const tx of transactions) {
			if (tx.type === TransactionType.INCOME) income += tx.amount;
			if (tx.type === TransactionType.EXPENSE) expense += tx.amount;
		}

		return {
			totalIncome: income,
			totalExpense: expense,
			balance: income - expense
		};
	}

	static getBalanceTotal(transactions: Transaction[]) {
		if (!transactions?.length) return 0;
		const { totalIncome, totalExpense } = this.getTotals(transactions);

		// const incomeValue = this.getIncomeTotal(transactions);
		// const expensesValue = this.getExpensesTotal(transactions);
		const result = totalIncome - totalExpense;

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

	static getDailySpending(transactions: Transaction[], startDate: string, endDate: string) {
		if (!transactions) return 0;

		const start = parseISO(startDate);
		const end = parseISO(endDate);

		const totalSpending = transactions.reduce((sum, expense) => sum + expense.amount, 0);
		const daysInRange = differenceInDays(end, start) + 1;
		return Number((totalSpending / daysInRange).toFixed(0));
	}

	static getTransactionCounts(transactions: Transaction[]) {
		if (!transactions) return { total: 0, income: 0, expense: 0, byCategory: {} };

		return transactions.reduce(
			(acc, tx) => {
				acc.total++;
				acc[tx.type.toLowerCase() as 'income' | 'expense']++;
				// acc.byCategory[tx.categoryName] = (acc.byCategory[tx.categoryName] || 0) + 1;
				return acc;
			},
			{ total: 0, income: 0, expense: 0 }
		);
	}

	static getExpenseByCategory(transactions: Transaction[]): Record<string, number> {
		return transactions
			.filter((tx) => tx.type === TransactionType.EXPENSE)
			.reduce(
				(acc, tx) => {
					acc[tx.categoryName] = (acc[tx.categoryName] || 0) + tx.amount;
					return acc;
				},
				{} as Record<string, number>
			);
	}

	static getInsights(transactions: Transaction[]) {
		if (!transactions) return {};

		const { totalIncome, totalExpense } = this.getTotals(transactions);
		const expensesByCategory = this.getExpenseByCategory(transactions);

		const topCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];

		return {
			topCategoryText: topCategory
				? `You spent the most on <b> ${topCategory[0]} </b> this month

				<br/>

				 (${Math.round((topCategory[1] / totalExpense) * 100)}% of expenses)`
				: null,

			spendingMeansText:
				totalExpense > totalIncome
					? 'You are spending more than you earn'
					: 'You are within your income',

			isWithinIncome: Boolean(totalIncome > totalExpense)
		};
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static formatLocalDate(dateString: any) {
		const d = new Date(dateString);
		const year = d.getFullYear();
		const month = String(d.getMonth() + 1).padStart(2, '0');
		const day = String(d.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	}

	static getDailyExpenseLineData(transactions: Transaction[]) {
		if (!transactions) return [];

		const map = {};

		transactions.forEach((tx) => {
			if (tx.type !== 'EXPENSE') return;

			const day = this.formatLocalDate(tx.date);
			map[day] = (map[day] || 0) + tx.amount;
		});

		return Object.keys(map)
			.sort()
			.map((date) => ({
				date,
				amount: map[date]
			}));
	}
}

export default ExpenseUtils;
