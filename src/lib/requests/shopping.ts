import type { ReqConfig, Service } from '../../types/axios';
import type { BoardItem, CreateBooard } from '../../types/shopping';

class ShoppingService {
	private api;
	private itemfix = '/shopping-item';
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

	async createItem(data: BoardItem, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.itemfix}`, data, { ...reqConfig });
	}

	async getBoardItems(ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.itemfix}/all?ownerId=${ownerId}`, { ...reqConfig });
	}
}

export default ShoppingService;
