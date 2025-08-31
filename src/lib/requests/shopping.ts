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

	async updateBoard(boardId: string, data: CreateBooard, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.boardPrefix}/${boardId}`, data, { ...reqConfig });
	}

	async getAllBoards(ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/all?ownerId=${ownerId}`, { ...reqConfig });
	}

	async getBoard(boardId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/${boardId}`, { ...reqConfig });
	}

	async createItem(data: BoardItem, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.itemfix}`, data, { ...reqConfig });
	}

	async updateItem(itemId: string, data: BoardItem, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.itemfix}/${itemId}`, data, { ...reqConfig });
	}

	async getBoardItems(ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.itemfix}/all?ownerId=${ownerId}`, { ...reqConfig });
	}

	async deleteItem(itemId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.itemfix}/${itemId}`, { ...reqConfig });
	}
}

export default ShoppingService;
