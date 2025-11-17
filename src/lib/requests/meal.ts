import Helpers from '$lib/utils/helpers';
import type { ReqConfig, Service } from '../../types/axios';
import type { Meal, MealPlan } from '../../types/meal';

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

	async createMeal(data: Meal, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.mealPrefix}`, data, { ...reqConfig });
	}
	async getMeals(data: { mealPlanId: string; days: string }, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.mealPrefix}?${Helpers.formatQueryParams(data)}`, {
			...reqConfig
		});
	}
	async updateMeal(mealId: string, data: Meal, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.mealPrefix}/${mealId}`, data, { ...reqConfig });
	}
	async deleteMeal(mealId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.mealPrefix}/${mealId}`, { ...reqConfig });
	}
}

export default MealService;
