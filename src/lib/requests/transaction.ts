import Helpers from '$lib/utils/helpers';
import type { ReqConfig, Service } from '../../types/axios';
import type { Transaction, CreateTransaction, TransactionType } from '../../types/transaction';

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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	async getTransactions(params: any, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}?${Helpers.formatQueryParams(params)}`, {
			...reqConfig
		});
	}

	async updateTransaction(id: string, data: Transaction, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${id}`, data, { ...reqConfig });
	}

	async deleteTransaction(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}

	async createTransactionCategory(
		data: { name: string; type: TransactionType },
		reqConfig?: ReqConfig
	) {
		return await this.api.post(`${this.categoryPrefix}`, data, { ...reqConfig });
	}

	async getTransactionCategories(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.categoryPrefix}`, { ...reqConfig });
	}

	async updateTransactionCategory(id: string, data: { name: string }, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.categoryPrefix}/${id}`, data, { ...reqConfig });
	}

	async deleteTransactionCategory(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.categoryPrefix}/${id}`, { ...reqConfig });
	}
}

export default TransactionService;
