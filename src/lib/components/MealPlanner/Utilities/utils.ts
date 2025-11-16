import type { Meal } from '../../../../types/meal';

class MealsUtils {
	static getMeal(meal: Meal, mealsList: Meal[]) {
		if (mealsList.length > 0) {
			const findMeal = mealsList?.find((item: Meal) => {
				if (item.day == meal.day && item.timeOfDay === meal.timeOfDay) {
					return item;
				} else {
					return false;
				}
			});

			return findMeal;
		}
	}
}

export default MealsUtils;
