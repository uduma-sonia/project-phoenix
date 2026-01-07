export type CreateTransaction = {
	amount: number;
	type: TransactionType;
	categoryId: string;
	categoryName: string;
	date: Date;
	description?: string;
};

export type Transaction = {
	ownerId?: string;
	amount: number;
	categoryId: string;
	categoryName: string;
	type: TransactionType;
	date?: Date;
	description: string;
	_id: string;
};

export type TransactionCategory = {
	ownerId?: string;
	createdAt: number;
	updatedAt: number;
	name: string;
	type: TransactionType;
	_id?: Date;
};

export enum TransactionType {
	EXPENSE = 'EXPENSE',
	INCOME = 'INCOME'
}

export enum BudgetCycle {
	WEEKLY = 'WEEKLY',
	MONTHLY = 'MONTHLY',
	YEARLY = 'YEARLY',
	QUARTERLY = 'QUARTERLY'
	// BI_WEEKLY = 'BI_WEEKLY',
}
