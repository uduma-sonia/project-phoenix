import { ShoppingStatus, type BoardMember, Permissions } from '../../../../types/shopping';
import type { User } from '../../../../types/user';

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

	static getPermission(membersList: BoardMember[], user: User, ownerId?: string) {
		const memberIdList = membersList?.map((item: { memberId: string }) => item.memberId);

		if (user?._id) {
			if (ownerId === user?._id) {
				return Permissions.OWNER;
			}

			if (memberIdList) {
				if (user?.email) {
					if (memberIdList.includes(user.email)) {
						const getMember = membersList.find(
							(item: { memberId: string }) => item.memberId === user?.email
						);

						if (getMember?.permissions === Permissions.CAN_EDIT) {
							return Permissions.CAN_EDIT;
						} else {
							return Permissions.READ_ONLY;
						}
					}
				} else {
					return Permissions.UNAUTHORIZED;
				}
			} else {
				console.log('ekdc');
				return Permissions.UNAUTHORIZED;
			}
		}
	}
}

export default ShoppingUtils;
