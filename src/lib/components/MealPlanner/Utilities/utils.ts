/* eslint-disable @typescript-eslint/no-explicit-any */
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import type { Meal } from '../../../../types/meal';
import { mealsChart } from '$lib/constants/meals';
import TrackerUtils from '$lib/components/Habit/Utilities/utils';
import type { MealEntry, Recipe } from '../../../../types/recipe';

class MealsUtils {
	static getFirstRecipeImage(recipes?: Recipe[]) {
		if (!recipes?.length) return '';
		for (const recipe of recipes) {
			if (Array.isArray(recipe.images) && recipe.images.length > 0) {
				return recipe.images[0];
			}
		}
		return null;
	}
	static getRecipes(recipes?: Recipe[]) {
		if (!recipes?.length) return [];

		return recipes?.map((recipe) => {
			return {
				title: recipe.name,
				link: `/recipe/${recipe?.slug}?owner=${recipe?.ownerId}`,
				id: recipe._id
			};
		});
	}

	static getMeal(meal: Meal, mealsList: Meal[]) {
		if (mealsList?.length > 0) {
			const findMeal = mealsList?.find((item: Meal) => {
				if (item.day === meal.day && item.timeOfDay === meal.timeOfDay) {
					return item;
				}
			});

			return findMeal;
		}
	}

	static mapMealsToWeek(weekDates: any) {
		return mealsChart.map((meal: any) => {
			const dateForDay = weekDates.find(
				(d: any) => format(d, 'EEEE').toLowerCase() === meal.day.toLowerCase()
			);

			return {
				...meal,
				date: format(dateForDay, 'yyyy-MM-dd')
			};
		});
	}

	static getDaysList(currentWeek: any) {
		const daysInterval = eachDayOfInterval({
			start: startOfWeek(currentWeek),
			end: endOfWeek(currentWeek)
		});

		const result = daysInterval.map((item) => TrackerUtils.getISODate(item));

		return JSON.stringify(result);
	}

	static generateShoppingList(arr: MealEntry[]) {
		if (!arr?.length) return [];
		const getRecipes = arr?.filter((item) => item.recipeDetails?.length);
		const result = getRecipes.map((item: MealEntry) => item.recipeDetails);

		const _ids = new Set();
		const uniqueRecipeList = result?.flat().filter(({ _id }) => !_ids.has(_id) && _ids.add(_id));
		const extractIngredients = uniqueRecipeList?.map((item) => item?.ingredients);

		const _names = new Set();
		const uniqueNames = extractIngredients
			?.flat()
			.filter((item) => !_names.has(item?.name) && _names.add(item?.name));

		return uniqueNames;
	}
}

export default MealsUtils;
