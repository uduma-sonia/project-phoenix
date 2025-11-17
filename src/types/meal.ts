export type Meal = {
	day: string;
	timeOfDay: string;
	name?: string;
	recipeLink?: string;
	date?: string;
	hasEaten?: boolean;
	mealPlanId: string;
};

export type MealPlan = {
	name: string;
	isPrivate: boolean;
	_id?: string;
};
