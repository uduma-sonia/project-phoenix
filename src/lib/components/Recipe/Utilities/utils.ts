import type { RecipeResponse } from '../../../../types/recipe';

class RecipeUtils {
	static getlist(arr: RecipeResponse[], currentTab: string) {
		return arr?.filter((item) => {
			const groupList: string[] = item?.groups?.length
				? item?.groups.map((item: { name: string }) => item.name)
				: [];

			if (currentTab === 'All') {
				return item;
			} else {
				if (groupList.includes(currentTab)) {
					return item;
				}
			}
		});
	}
}

export default RecipeUtils;
