import type { ReqConfig, Service } from '../../types/axios';
import type { Recipe } from '../../types/recipe';

class RecipeService {
	private api;
	private prefix = '/recipe';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createRecipe(data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getRecipes(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}`, { ...reqConfig });
	}

	async getSingleRecipe(id: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${id}`, { ...reqConfig });
	}

	async updateRecipe(id: string, data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${id}`, data, { ...reqConfig });
	}

	async deleteRecipe(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}
}

export default RecipeService;
