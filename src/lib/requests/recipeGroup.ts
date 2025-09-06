import type { ReqConfig, Service } from '../../types/axios';
import type { Recipe } from '../../types/recipe';

class RecipeGroupService {
	private api;
	private prefix = '/recipe-group';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createRecipeGroup(data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getRecipeGroup(reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, { ...reqConfig });
	}

	async updateRecipGroup(data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async deleteRecipeGroup(data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}
}

export default RecipeGroupService;
