export enum Shoppingtatus {
	PENDING = 'PENDING',
	DONE = 'DONE'
}

export type CreateBooard = {
	name: string;
	ownerId: string;
	status: Shoppingtatus;
	currency: string;
};

export type BoardItem = {
	name: string;
	quantity: number;
	unit: string;
	done: boolean;
	boardId: string;
	price: number;
};
