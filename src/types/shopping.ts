export enum ShoppingStatus {
	PENDING = 'PENDING',
	DONE = 'DONE'
}

export enum Permissions {
	OWNER = 'OWNER',
	CAN_EDIT = 'READ,WRITE',
	READ_ONLY = 'READ',
	UNAUTHORIZED = 'UNAUTHORIZED'
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
	ownerId?: string;
};

export type BoardMember = {
	boardId: string;
	ownerId: string;
	memberId: string;
	permissions: string;
};

type Item = {
	_id: string;
	name: string;
	unit?: string;
	quantity?: number;
	price?: number;
	done?: boolean;
};

export type ListItemProps = {
	data: Item;

	price: string | number;

	canEdit?: boolean;
	canEditId?: string | null;

	handleEdit?: (id: string) => void;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handleUpdate?: (itemId: string, payload: any) => void;
	handleUpdateItem?: (id: string, done: boolean) => void;
};
