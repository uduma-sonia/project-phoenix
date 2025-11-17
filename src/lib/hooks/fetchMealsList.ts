import MealsUtils from '$lib/components/MealPlanner/Utilities/utils';
import { MealRequest } from '$lib/requests';
import { queryKeys } from '$lib/utils/queryKeys';
import { createQuery } from '@tanstack/svelte-query';

export default function (mealPlanId: string, currentWeek: Date) {
	return createQuery({
		queryKey: queryKeys.getMeals({
			mealPlanId: mealPlanId,
			days: MealsUtils.getDaysList(currentWeek)
		}),
		queryFn: () =>
			MealRequest.getMeals({ mealPlanId: mealPlanId, days: MealsUtils.getDaysList(currentWeek) }),
		enabled: !!mealPlanId
	});
}
