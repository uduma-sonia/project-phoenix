/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	format,
	isAfter,
	isBefore,
	isSameDay,
	parseISO,
	getYear,
	getMonth,
	getDaysInMonth,
	getDaysInYear
} from 'date-fns';
import { HabitStatus, type Habit, type HabitLog } from '../../../../types/tracker';
import Helpers from '$lib/utils/helpers';

export default class TrackerUtils {
	static buildLogPayloadBuilder(
		userId: string,
		tracker: Habit,
		value: number,
		status: HabitStatus,
		trackerState: any
	) {
		const trackerId = tracker._id;
		const goalPeriod = tracker.interval;
		const unitMeasurement = tracker.unitMeasurement;
		const goalValue = Number(tracker.goalValue);

		const payload = {
			ownerId: userId,
			trackerId,
			date: TrackerUtils.getISODate(trackerState.data.selectedDay),
			status,
			value,
			goalValue,
			goalPeriod,
			unitMeasurement
		};

		return payload;
	}

	static isHabitActive(habit: Habit, dateViewing: string): boolean {
		if (!dateViewing) return false;

		const viewingDate = parseISO(dateViewing);
		const startDate = parseISO(habit.startDate);
		const endDate = habit?.isIndefinite ? null : habit.endDate;
		const startDateIsValid = isBefore(startDate, viewingDate) || isSameDay(startDate, viewingDate);

		let endDateIsValid = false;

		if (habit.isIndefinite) {
			endDateIsValid = true;
		} else if (endDate) {
			endDateIsValid = isAfter(endDate, viewingDate) || isSameDay(endDate, viewingDate);
		}

		return startDateIsValid && endDateIsValid;
	}

	static getDayProgressPercent(): number {
		const now = new Date();
		const startOfDay = new Date(now);
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(now);
		endOfDay.setHours(23, 59, 59, 999);

		const elapsed = now.getTime() - startOfDay.getTime();
		const total = endOfDay.getTime() - startOfDay.getTime();

		const percent = (elapsed / total) * 100;
		return Math.min(Math.max(percent, 0), 100); // Clamp between 0 and 100
	}

	static toStartOfDayUTC(dateStr: string) {
		const date = new Date(dateStr);
		return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString();
	}

	static calculateStreakTime(startDate: any) {
		const start: any = new Date(startDate);
		const now: any = new Date();
		const timeDifference = now - start;

		const seconds = Math.floor((timeDifference / 1000) % 60);
		const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
		const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
		const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

		return { days, hours, minutes, seconds };
	}

	static renderStreakCountdown({ days, hours, minutes, seconds }: any) {
		if (days) {
			return `${days}`;
		}
		if (hours) {
			return `${hours}`;
		}
		if (minutes) {
			return `${minutes}`;
		}
		if (seconds) {
			return `${seconds}`;
		}
		return '0';
	}

	static renderStreakCountdownSuffix({ days, hours, minutes, seconds }: any) {
		if (days) {
			return `day${Helpers.returnS(days)}`;
		}
		if (hours) {
			return `hour${Helpers.returnS(hours)}`;
		}
		if (minutes) {
			return `minute${Helpers.returnS(minutes)}`;
		}
		if (seconds) {
			return `second${Helpers.returnS(seconds)}`;
		}
		return 'seconds';
	}

	static getISODate(arg: any) {
		const dateFormatted = format(arg, 'yyyy-MM-dd');
		return dateFormatted;
	}

	static getDayProgress(date = new Date()) {
		const startOfDay = new Date(date);
		startOfDay.setHours(0, 0, 0, 0);

		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);

		const total = endOfDay.getTime() - startOfDay.getTime();
		const elapsed = date.getTime() - startOfDay.getTime();

		return Math.min(100, Math.max(0, (elapsed / total) * 100));
	}

	static getDateNum(month: any) {
		const date = parseISO(month);

		const _year: number = getYear(date);
		const _month: number = getMonth(date);
		const daysInYear: number = getDaysInYear(date);
		const daysInMonth: number = getDaysInMonth(date);

		return {
			_year,
			_month,
			daysInMonth,
			daysInYear
		};
	}

	static getCurrentStreak(
		habitLogs: { date: string; status: HabitStatus }[],
		selectedDays: number[],
		month: string
	): number {
		if (!habitLogs?.length || !selectedDays?.length) return 0;

		const { _month, _year, daysInMonth } = this.getDateNum(month);

		// Store logs by date ("YYYY-MM-DD")
		const logsByDay = new Map<string, HabitStatus>();
		for (const log of habitLogs) {
			const dateStr = log.date; // already in YYYY-MM-DD
			if (!logsByDay.has(dateStr) || log.status === HabitStatus.COMPLETED) {
				logsByDay.set(dateStr, log.status);
			}
		}

		// Pick correct "today" for the month being calculated
		let today = new Date();
		if (today.getMonth() !== _month || today.getFullYear() !== _year) {
			today = new Date(_year, _month, daysInMonth); // fallback to last day of month
		}

		let lastStreak = 0;
		const currentDate = new Date(today);

		// Traverse backwards day by day
		while (currentDate.getDate() >= 1) {
			const dayOfWeek = currentDate.getDay();
			const dateStr = format(currentDate, 'yyyy-MM-dd'); // normalize

			if (selectedDays.includes(dayOfWeek)) {
				const status = logsByDay.get(dateStr);

				if (status === HabitStatus.COMPLETED) {
					lastStreak++;
				} else if (dateStr === format(new Date(), 'yyyy-MM-dd')) {
					// ⚡ allow "today" to be missing/incomplete
					// do nothing, streak continues
				} else {
					break; // streak breaks only if a PAST selected day is not completed
				}
			}

			// move to previous day (skipping unselected)
			do {
				currentDate.setDate(currentDate.getDate() - 1);
			} while (currentDate.getDate() >= 1 && !selectedDays.includes(currentDate.getDay()));
		}

		return lastStreak;
	}

	static getMonthlyCompletionRate(
		logList: HabitLog[],
		selectedDays: number[],
		month: string
	): number {
		if (!logList?.length || !selectedDays?.length) return 0;

		const { _month, _year, daysInMonth } = this.getDateNum(month);
		let expectedDays = 0;
		let completedDays = 0;
		const logsByDay = new Map<string, HabitStatus>();

		// Populate logsByDay with only one log per day, prioritizing COMPLETED over PENDING
		for (const log of logList) {
			const dateStr = new Date(log.date).toDateString();
			if (!logsByDay.has(dateStr) || log.status === 'COMPLETED') {
				logsByDay.set(dateStr, log.status);
			}
		}

		// Loop through all days of the month
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(_year, _month, day);
			const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

			if (selectedDays.includes(dayOfWeek)) {
				expectedDays++;

				if (logsByDay.get(date.toDateString()) === 'COMPLETED') {
					completedDays++; // User actually logged on this day
				}
			}
		}

		const result = ((completedDays / expectedDays) * 100).toFixed(1);

		return expectedDays > 0 ? Number(result) : 0;
	}

	static getBestStreak(
		habitLogs: HabitLog[],
		selectedDays: number[],
		date: string,
		isYear?: boolean
	): number {
		if (!habitLogs?.length || !selectedDays?.length) return 0;

		const { _month, _year } = this.getDateNum(date);
		let bestStreak = 0;
		let currentStreak = 0;
		const logsByDay = new Map<string, HabitStatus>();

		// Populate logsByDay with only one log per day, prioritizing COMPLETED over PENDING
		for (const log of habitLogs) {
			const dateStr = new Date(log.date).toDateString();
			if (!logsByDay.has(dateStr) || log.status === 'COMPLETED') {
				logsByDay.set(dateStr, log.status);
			}
		}

		// Define range based on isYear flag
		const startMonth = isYear ? 0 : _month;
		const endMonth = isYear ? 11 : _month;

		// Loop through all days of the selected range (month/year)
		for (let month = startMonth; month <= endMonth; month++) {
			const daysInCurrentMonth = new Date(_year, month + 1, 0).getDate();

			for (let day = 1; day <= daysInCurrentMonth; day++) {
				const dateObj = new Date(_year, month, day);
				const dayOfWeek = dateObj.getDay();
				const dateStr = dateObj.toDateString();

				if (selectedDays.includes(dayOfWeek)) {
					if (logsByDay.get(dateStr) === 'COMPLETED') {
						currentStreak++; // Increase streak
						bestStreak = Math.max(bestStreak, currentStreak);
					} else {
						currentStreak = 0; // Reset streak if a selected day is missed
					}
				}
			}
		}

		return bestStreak;
	}

	static getYearlyCompletionRate(
		habitLogs: HabitLog[],
		selectedDays: number[],
		year: string
	): number {
		if (!habitLogs?.length || !selectedDays?.length) return 0;

		const { _year, daysInYear } = this.getDateNum(year);
		let expectedDays = 0;
		let completedDays = 0;
		const logsByDay = new Map<string, HabitStatus>();

		// Populate logsByDay with only one log per day, prioritizing COMPLETED over PENDING
		for (const log of habitLogs) {
			const dateStr = new Date(log.date).toDateString();
			if (!logsByDay.has(dateStr) || log.status === 'COMPLETED') {
				logsByDay.set(dateStr, log.status);
			}
		}

		// Loop through all days of the year
		for (let day = 1; day <= daysInYear; day++) {
			const date = new Date(_year, 0, day); // Month is 0-based, so 0 = January
			const dayOfWeek = date.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday

			if (selectedDays.includes(dayOfWeek)) {
				expectedDays++;

				if (logsByDay.get(date.toDateString()) === 'COMPLETED') {
					completedDays++; // User actually logged on this day
				}
			}
		}
		const result = ((completedDays / expectedDays) * 100).toFixed(1);

		return expectedDays > 0 ? Number(result) : 0;
	}

	static padMonthDays(days: string[]) {
		if (!days.length) return [];

		const firstDay = new Date(days[0]);
		const lastDay = new Date(days[days.length - 1]);

		const startWeekday = firstDay.getDay();
		const endWeekday = lastDay.getDay();

		const leading = Array(startWeekday).fill(null);
		const trailing = Array(6 - endWeekday).fill(null);

		return [...leading, ...days, ...trailing];
	}

	static getLogForDay(arr: any[], day: any) {
		if (arr?.length) {
			const _date = TrackerUtils.getISODate(day);
			const result = arr.find((item: any) => item.date == _date);
			return result;
		}
	}
}
