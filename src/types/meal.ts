import type { Recipe } from './recipe';

export type Meal = {
	day: string;
	timeOfDay: TimeOfDay;
	name?: string;
	recipeLink?: string;
	date?: string;
	hasEaten?: boolean;
	mealPlanId: string;
};

export interface MealResponse {
	_id: string;
	ownerId?: string;
	day?: string;
	timeOfDay?: string;
	name?: string;
	recipeIds?: string[];
	hasEaten?: boolean;
	mealPlanId?: string;
	date?: string;
	createdAt?: string;
	location?: string;
	note?: string;
	updatedAt?: string;
	__v?: number;
	recipeIdsObj?: string[];
	recipeDetails?: Recipe[];
}

export type CreateMeal = {
	day: string | undefined;
	timeOfDay?: TimeOfDay;
	name?: string;
	recipeId?: string;
	recipeIds?: string[];
	date?: string;
	hasEaten?: boolean;
	mealPlanId?: string;
};

export type MealPlan = {
	name: string;
	isPrivate: boolean;
	_id?: string;
	description?: string;
};

export enum TimeOfDay {
	breakfast = 'breakfast',
	lunch = 'lunch',
	dinner = 'dinner',
	snack = 'snack'
}
