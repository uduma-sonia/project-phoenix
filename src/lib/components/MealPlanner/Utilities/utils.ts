/* eslint-disable @typescript-eslint/no-explicit-any */
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import type { Meal } from '../../../../types/meal';
import { mealsChart } from '$lib/constants/meals';
import TrackerUtils from '$lib/components/Habit/Utilities/utils';
import type { MealEntry } from '../../../../types/recipe';

class MealsUtils {
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

// const ids = new Set(); // temp variable to keep track of accepted ids
// const uniqueSchedulesList = schedulesList.filter(({ id }) => !ids.has(id) && ids.add(id));

export default MealsUtils;
