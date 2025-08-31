export enum ShoppingStatus {
	PENDING = 'PENDING',
	DONE = 'DONE'
}

export type CreateBooard = {
	name?: string;
	ownerId?: string;
	status?: ShoppingStatus;
	currency?: string;
};

export type BoardItem = {
	name?: string;
	quantity?: number;
	unit?: string;
	done?: boolean;
	boardId?: string;
	price?: number;
};
