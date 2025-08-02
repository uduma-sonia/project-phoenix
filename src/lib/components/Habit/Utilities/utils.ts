import { isAfter, isBefore, isSameDay, parseISO } from 'date-fns';
import type { Habit } from '../../../../types/tracker';

export default class TrackerUtils {
	static isHabitActive(habit: Habit, dateViewing: string): boolean {
		if (!dateViewing) return false;

		const viewingDate = parseISO(dateViewing);
		const startDate = parseISO(habit.startDate);
		const endDate = habit?.isIndefinite ? null : habit.endDate;
		const startDateIsValid = isBefore(startDate, viewingDate) || isSameDay(startDate, viewingDate);

		// const endDateIsValid = endDate
		// 	? isAfter(endDate, viewingDate) || isSameDay(endDate, viewingDate)
		// 	: false;

		// console.table({ viewingDate, startDate, endDate, startDateIsValid });

		let endDateIsValid = false;

		if (habit.isIndefinite) {
			endDateIsValid = true;
		} else if (endDate) {
			endDateIsValid = isAfter(endDate, viewingDate) || isSameDay(endDate, viewingDate);
		}

		return (
			startDateIsValid && endDateIsValid
			// && habit !== HabitStatus.FAILED
		);
	}
}
