import type { ReqConfig, Service } from '../../types/axios';
import type { Shoppingtatus } from '../../types/shopping';

export type CreateBooard = {
	name: string;
	ownerId: string;
	status: Shoppingtatus;
	currency: string;
};

class ShoppingService {
	private api;
	private prefix = '/tracker';
	private boardPrefix = '/shopping-board';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createBoard(data: CreateBooard, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.boardPrefix}`, data, { ...reqConfig });
	}

	async getAllBoards(ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/all?ownerId=${ownerId}`, { ...reqConfig });
	}
}

export default ShoppingService;
