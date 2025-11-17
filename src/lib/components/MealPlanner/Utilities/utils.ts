/* eslint-disable @typescript-eslint/no-explicit-any */
import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns';
import type { Meal } from '../../../../types/meal';
import { mealsChart } from '$lib/constants/meals';
import TrackerUtils from '$lib/components/Habit/Utilities/utils';

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
}

export default MealsUtils;
