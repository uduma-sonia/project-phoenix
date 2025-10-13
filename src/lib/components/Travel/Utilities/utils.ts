import type { GroupedDay, TripActivity } from '../../../../types/trip';

class TripUtils {
	static groupByDay(items: TripActivity[]): GroupedDay[] {
		const grouped = items?.reduce<GroupedDay[]>((acc, item) => {
			const day = item.day || '';

			let dayGroup = acc.find((g) => g.day === day);

			if (!dayGroup) {
				dayGroup = { day, items: [] };
				acc.push(dayGroup);
			}

			dayGroup.items.push(item);

			return acc;
		}, []);

		return grouped?.sort((a, b) => {
			if (a.day === '') return 1;
			if (b.day === '') return -1;
			return new Date(a.day).getTime() - new Date(b.day).getTime();
		});
	}
}

export default TripUtils;
