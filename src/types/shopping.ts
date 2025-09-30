export enum ShoppingStatus {
	PENDING = 'PENDING',
	DONE = 'DONE'
}

export type CreateBooard = {
	name?: string;
	ownerId?: string;
	status?: ShoppingStatus;
	currency?: string;
	_id?: string;
};

export type BoardItem = {
	name?: string;
	quantity?: number;
	unit?: string;
	done?: boolean;
	boardId?: string;
	price?: number;
	ownerId: string;
};

export type BoardMember = {
	boardId: string;
	ownerId: string;
	memberId: string;
	permissions: string;
};
