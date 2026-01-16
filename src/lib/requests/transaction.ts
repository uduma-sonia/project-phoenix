import Helpers from '$lib/utils/helpers';
import type { ReqConfig, Service } from '../../types/axios';
import type { CreateTransaction, TransactionType } from '../../types/transaction';

class TransactionService {
	private api;
	private prefix = '/transaction';
	private categoryPrefix = '/transaction-category';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createTransaction(data: CreateTransaction, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getTransactions(params: { startDate: string; endDate: string }, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}?${Helpers.formatQueryParams(params)}`, {
			...reqConfig
		});
	}

	async updateTransaction(id: string, data: CreateTransaction, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${id}`, data, { ...reqConfig });
	}

	async deleteTransaction(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}

	async getTransactionAnalytics(
		params: { startDate: string; endDate: string },
		reqConfig?: ReqConfig
	) {
		return await this.api.get(`${this.prefix}/analytics?${Helpers.formatQueryParams(params)}`, {
			...reqConfig
		});
	}
	async createTransactionCategory(
		data: { name: string; type: TransactionType; budgetAmount: number },
		reqConfig?: ReqConfig
	) {
		return await this.api.post(`${this.categoryPrefix}`, data, { ...reqConfig });
	}

	async getTransactionCategories(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.categoryPrefix}`, { ...reqConfig });
	}

	async updateTransactionCategory(
		id: string,
		data: { name: string; budgetAmount: number },
		reqConfig?: ReqConfig
	) {
		return await this.api.put(`${this.categoryPrefix}/${id}`, data, { ...reqConfig });
	}

	async deleteTransactionCategory(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.categoryPrefix}/${id}`, { ...reqConfig });
	}
}

export default TransactionService;
