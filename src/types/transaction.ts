export type Transaction = {
	ownerId?: string;
	amount: number;
	categoryId: string;
	categoryName: string;
	type: TransactionType;
	date?: Date;
};

export type TransactionCategory = {
	ownerId?: string;
	amount: number;
	categoryId: string;
	categoryName: string;
	type: TransactionType;
	date?: Date;
};

export enum TransactionType {
	EXPENSE = 'EXPENSE',
	INCOME = 'INCOME'
}
