/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns';
import type { Meal } from '../../../../types/meal';
import { mealsChart } from '$lib/constants/meals';

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
		return mealsChart.map((meal: Meal) => {
			const dateForDay = weekDates.find(
				(d: any) => format(d, 'EEEE').toLowerCase() === meal.day.toLowerCase()
			);

			return {
				...meal,
				date: format(dateForDay, 'yyyy-MM-dd')
			};
		});
	}
}

export default MealsUtils;
