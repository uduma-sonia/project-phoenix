import type { RecipeResponse } from '../../../../types/recipe';

class RecipeUtils {
	static getlist(arr: RecipeResponse[], currentTab: string, ownerId: string) {
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

		console.log(result);
		return result;
	}
}

export default RecipeUtils;
