import {
	differenceInDays,
	formatISO,
	isSameMonth,
	isSameQuarter,
	isSameWeek,
	isSameYear,
	parseISO
} from 'date-fns';
import {
	BudgetCycle,
	TransactionType,
	type Transaction,
	type TransactionCategory
} from '../../../../types/transaction';

class ExpenseUtils {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static sortTransactionsGroupByAmount(transactions: any[], sort: 'asc' | 'desc' = 'asc') {
		return transactions.sort((a, b) =>
			sort === 'asc' ? a.totalAmount - b.totalAmount : b.totalAmount - a.totalAmount
		);
	}

	static getBreakdownList(transactions: Transaction[], sort: 'asc' | 'desc' = 'asc') {
		if (!transactions) return [];

		const result = transactions?.filter((item) => item.type === TransactionType.EXPENSE);

		return result.reduce(
			(acc, transaction) => {
				const { categoryName, amount, categoryId } = transaction;
				const existingCategory = acc.find(
					(item: {
						categoryName: string;
						totalAmount: number;
						count: number;
						categoryId: string;
					}) => item.categoryId == categoryId
				);

				if (existingCategory) {
					existingCategory.totalAmount += amount;
					existingCategory.count += 1;
				} else {
					acc.push({ categoryName, totalAmount: amount, count: 1, categoryId });
				}

				return this.sortTransactionsGroupByAmount(acc, sort);
			},
			[] as { categoryName: string; totalAmount: number; count: number; categoryId: string }[]
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

	static getInsights(transactions: Transaction[], totalIncome: number, totalExpense: number) {
		if (!transactions && !totalIncome && !totalExpense) return {};

		const expensesByCategory = this.getExpenseByCategory(transactions);

		const topCategory = Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0];

		return {
			topCategoryText: topCategory
				? `You spent the most on <span class="font-semibold"> ${topCategory[0]} </span> this month

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

	static getList(txnList: Transaction[], selectedView: { id: string }) {
		if (txnList?.length) {
			return txnList?.filter((item) => {
				if (selectedView.id === TransactionType.EXPENSE) {
					return item.type === TransactionType.EXPENSE;
				} else if (selectedView.id === TransactionType.INCOME) {
					return item.type === TransactionType.INCOME;
				} else {
					return item;
				}
			});
		}

		return [];
	}

	static showBudgetWarning(
		budgetPercentage: number,
		budgetCycle: BudgetCycle,
		currentMonth: string | number | Date
	) {
		const _isSameMonth = isSameMonth(formatISO(new Date()), currentMonth);
		const _isSameWeek = isSameWeek(formatISO(new Date()), currentMonth);
		const _isSameQuarter = isSameQuarter(formatISO(new Date()), currentMonth);
		const _isSameYear = isSameYear(formatISO(new Date()), currentMonth);

		if (budgetPercentage > 70) {
			if (budgetCycle === BudgetCycle.WEEKLY) {
				return _isSameWeek;
			} else if (budgetCycle === BudgetCycle.QUARTERLY) {
				return _isSameQuarter;
			} else if (budgetCycle === BudgetCycle.YEARLY) {
				return _isSameYear;
			} else {
				return _isSameMonth;
			}
		}
		return false;
	}

	static getCategoryBudgetInfo(txnCat: TransactionCategory[], id: string) {
		const getBudgetInfo = txnCat?.find((item) => item?._id === id);

		return getBudgetInfo;
	}

	static budgetText(percentage: number) {
		if (percentage > 70 && percentage < 100) {
			return 'You are almost over the budget limit';
		} else if (percentage > 100) {
			return 'You are over the budget limit';
		} else {
			return 'You are on track';
		}
	}
}

export default ExpenseUtils;
