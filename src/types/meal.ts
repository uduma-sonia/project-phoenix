export type Meal = {
	day: string;
	timeOfDay: string;
	name?: string;
	recipeLink?: string;
	date?: string;
	hasEaten?: boolean;
};

export type MealPlan = {
	name: string;
	isPrivate: boolean;
};
