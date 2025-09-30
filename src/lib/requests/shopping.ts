import type { ReqConfig, Service } from '../../types/axios';
import type { BoardItem, BoardMember, CreateBooard } from '../../types/shopping';

class ShoppingService {
	private api;
	private itemPrefix = '/shopping-item';
	private boardPrefix = '/shopping-board';
	private memberPrefix = '/shopping-member';

	constructor({ api }: Service) {
		this.api = api;
	}

	// BOARDS
	async createBoard(data: CreateBooard, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.boardPrefix}`, data, { ...reqConfig });
	}

	async updateBoard(boardId: string, data: CreateBooard, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.boardPrefix}/${boardId}`, data, { ...reqConfig });
	}

	async getAllBoards(ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/all?ownerId=${ownerId}`, { ...reqConfig });
	}

	async getInvitedBoards(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/invited`, { ...reqConfig });
	}

	async getBoard(boardId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.boardPrefix}/${boardId}`, { ...reqConfig });
	}

	async shoppingDone(boardId: string, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.boardPrefix}/done/${boardId}`, { ...reqConfig });
	}

	async deleteBoard(itemId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.boardPrefix}/${itemId}`, { ...reqConfig });
	}

	// BOARD ITEMS
	async createItem(data: BoardItem, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.itemPrefix}`, data, { ...reqConfig });
	}

	async updateItem(itemId: string, data: BoardItem, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.itemPrefix}/${itemId}`, data, { ...reqConfig });
	}

	async getBoardItems(boardId: string, ownerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.itemPrefix}/all/${boardId}?ownerId=${ownerId}`, {
			...reqConfig
		});
	}

	async getStandardItems(ownerId?: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.itemPrefix}/standard?ownerId=${ownerId}`, {
			...reqConfig
		});
	}

	async deleteItem(itemId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.itemPrefix}/${itemId}`, { ...reqConfig });
	}

	// MEMBERS
	async addMember(data: BoardMember, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.memberPrefix}`, data, { ...reqConfig });
	}

	async getBoardMembers(boardId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.memberPrefix}/${boardId}`, {
			...reqConfig
		});
	}

	async removeMemberFromBoard(boardId: string, memberId: string, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.memberPrefix}/remove/${boardId}?memberId=${memberId}`, {
			...reqConfig
		});
	}
}

export default ShoppingService;
