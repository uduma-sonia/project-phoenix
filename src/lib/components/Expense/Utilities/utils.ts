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
}

export default ExpenseUtils;
