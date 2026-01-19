import type { BudgetCycle } from './transaction';

export interface CreateUser {
	email: string;
	username: string;
	password: string;
	avatar: string;
}

export interface UpdateUser {
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	avatar?: string;
	password?: string;
	currency?: string;
	isBudgetMode?: boolean;
	budgetAmount?: number;
	budgetCycle?: BudgetCycle;
	budgetAlertThreshold?: number;
}

export interface User {
	_id?: string;
	firstName?: string;
	lastName?: string;
	email?: string;
	username?: string;
	avatar?: string;
	password?: string;
	currency?: string;
	isBudgetMode?: boolean;
	budgetAmount?: number;
	budgetCycle?: BudgetCycle;
}
