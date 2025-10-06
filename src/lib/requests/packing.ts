import type { ReqConfig, Service } from '../../types/axios';

type CategoryItem = {
	id: string;
	name: string;
};

class PackingService {
	private api;
	private categoryPrefix = '/packing-category';
	private itemPrefix = '/packing-item';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createCategory(data: { name: string }, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.categoryPrefix}`, data, { ...reqConfig });
	}

	async getPackingCategories(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.categoryPrefix}/all`, { ...reqConfig });
	}

	async updateCategory(id: string, data: { name: string }, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.categoryPrefix}/${id}`, data, { ...reqConfig });
	}

	async deleteCategory(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.categoryPrefix}/${id}`, { ...reqConfig });
	}

	async createItem(data: { name: string; categories?: CategoryItem[] }, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.itemPrefix}`, data, { ...reqConfig });
	}

	async getPackingItems(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.itemPrefix}/all`, { ...reqConfig });
	}

	async updateItem(id: string, data: { name: string }, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.itemPrefix}/${id}`, data, { ...reqConfig });
	}

	async deleteItem(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.itemPrefix}/${id}`, { ...reqConfig });
	}
}

export default PackingService;
