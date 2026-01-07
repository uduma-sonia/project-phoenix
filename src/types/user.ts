export interface User {
	_id?: string;
	email?: string;
	username?: string;
	avatar?: string;
	password?: string;
	currency?: string;
	isBudgetMode?: boolean;
	budgetAmount?: number;
}
