import { RecipeStandardMeasurements, type RecipeResponse } from '../../../../types/recipe';

class RecipeUtils {
	static getlist(arr: RecipeResponse[], currentTab: string, ownerId: string, searchQuery: string) {
		const result = arr?.filter((item) => {
			const groupList: string[] = item?.groups?.length
				? item?.groups.map((item: { name: string }) => item.name)
				: [];

			if (currentTab === 'All') {
				return item;
			} else if (currentTab === 'Saved') {
				if (item.savedBy.includes(ownerId)) {
					return item;
				}
			} else {
				if (groupList.includes(currentTab)) {
					return item;
				}
			}
		});

		return result?.filter((item) => item.name.toUpperCase().includes(searchQuery?.toUpperCase()));
	}

	static generateMeasurementsOptions() {
		return Object.entries(RecipeStandardMeasurements).map(([id, value]) => ({
			id,
			value
		}));
	}
}

export default RecipeUtils;
