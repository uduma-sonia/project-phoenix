import type { ReqConfig, Service } from '../../types/axios';
import type { MealPlan } from '../../types/meal';

class MealService {
	private api;
	private mealPrefix = '/meal';
	private mealPlanPrefix = '/meal-plan';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createMealPlan(data: MealPlan, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.mealPlanPrefix}`, data, { ...reqConfig });
	}
	async getMealPlans(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.mealPlanPrefix}`, { ...reqConfig });
	}
	async updateMealPlan(mealPlanId: string, data: MealPlan, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.mealPlanPrefix}/${mealPlanId}`, data, { ...reqConfig });
	}
	async deleteMealPlan(mealPlanId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.mealPlanPrefix}/${mealPlanId}`, { ...reqConfig });
	}

	async createMeal(data: MealPlan, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.mealPrefix}`, data, { ...reqConfig });
	}
	async getMeals(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.mealPrefix}`, { ...reqConfig });
	}
	async updateMeal(mealId: string, data: MealPlan, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.mealPrefix}/${mealId}`, data, { ...reqConfig });
	}
	async deleteMeal(mealId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.mealPrefix}/${mealId}`, { ...reqConfig });
	}
}

export default MealService;
