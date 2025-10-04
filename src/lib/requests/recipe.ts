import type { ReqConfig, Service } from '../../types/axios';
import type { Recipe, RecipeGroup } from '../../types/recipe';

class RecipeService {
	private api;
	private prefix = '/recipe';
	private groupPrefix = '/recipe-group';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createRecipe(data: Recipe, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getRecipes(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/all`, { ...reqConfig });
	}

	async getOtherUserRecipes(userId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/user/${userId}`, { ...reqConfig });
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

	async saveRecipe(recipeId: string, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/save/${recipeId}`, { ...reqConfig });
	}
	async unsaveRecipe(recipeId: string, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/unsave/${recipeId}`, { ...reqConfig });
	}
	async getRecipeSaveList(recipeId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${recipeId}/saved-by`, { ...reqConfig });
	}

	// Recipe group
	async createRecipeGroup(data: RecipeGroup, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.groupPrefix}`, data, { ...reqConfig });
	}

	async getRecipeGroups(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.groupPrefix}`, { ...reqConfig });
	}

	async updateRecipGroup(groupId: string, data: RecipeGroup, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.groupPrefix}/${groupId}`, data, { ...reqConfig });
	}

	async deleteRecipeGroup(groupId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.groupPrefix}/${groupId}`, { ...reqConfig });
	}
}

export default RecipeService;
