/* eslint-disable @typescript-eslint/no-explicit-any */
export type Habit = {
	name: string;
	type: string;
	interval: string;
	startDate: any;
	unitMeasurement: string;
	color: string;
	goalValue: string;
	isIndefinite: boolean;
	selectedDays: number[];
	isActive: boolean;
	createdAt: Date;
	updatedAt: Date;
	ownerId: string;
	habitId: string;
	endDate?: any;
	docId: string;
	description: string;
	icon: string;
	_id: string;
};

export enum HabitStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	SKIPPED = 'SKIPPED',
	FAILED = 'FAILED',
	STOP = 'STOP',
	START = 'START'
}
