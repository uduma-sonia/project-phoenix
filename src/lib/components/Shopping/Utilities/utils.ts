import { ShoppingStatus } from '../../../../types/shopping';

class ShoppingUtils {
	static sortByDone(items: { status: ShoppingStatus }[]) {
		return items?.sort((a, b) => {
			if (a.status === ShoppingStatus.DONE && b.status === ShoppingStatus.DONE) return 0;
			return a.status === ShoppingStatus.DONE ? 1 : -1;
		});
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	static filterShoppinglist(list: any[], currentTab: string) {
		if (!list?.length) return [];

		const result = list?.filter((item) => {
			if (currentTab === 'All') {
				return item;
			} else if (currentTab === 'Owner') {
				return item?.isOwner;
			} else if (currentTab === 'Invited') {
				return !item.isOwner;
			} else if (currentTab === 'Done') {
				return item.status === 'DONE';
			} else {
				return item;
			}
		});

		return this.sortByDone(result);
	}
}

export default ShoppingUtils;
