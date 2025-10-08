import { ShoppingStatus } from '../../../../types/shopping';

class ShoppingUtils {
	static sortByDone(items: { status: ShoppingStatus }[]) {
		return items?.sort((a, b) => {
			if (a.status === ShoppingStatus.DONE && b.status === ShoppingStatus.DONE) return 0;
			return a.status === ShoppingStatus.DONE ? 1 : -1;
		});

		// return items?.sort((a, b) => {
		// 	return new Date(b.updatedAt) - new Date(a.updatedAt);
		// });
	}
}

export default ShoppingUtils;
