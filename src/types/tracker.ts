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
	logDetails?: HabitLog;
};

export type HabitLog = {
	ownerId: string;
	trackerId: string;
	date: string;
	value: number;
	goalValue: number;
	goalPeriod: string;
	unitMeasurement: string;
	status: HabitStatus;
	createdAt: Date;
	updatedAt: Date;
};

export enum HabitStatus {
	PENDING = 'PENDING',
	COMPLETED = 'COMPLETED',
	SKIPPED = 'SKIPPED',
	FAILED = 'FAILED',
	STOP = 'STOP',
	START = 'START'
}

export type UpdateBuildLog = {
	tracker: Habit;
	status: HabitStatus;
	type: string;
	log: HabitLog;
	value: number;
};

export type HabitItemProps = {
	habit: Habit;
	deleteHabit: (habitId: string) => void;
	updateLog: (
		habitId: string,
		status: HabitStatus,
		type: string,
		logId: string,
		updated_at?: string,
		habit?: Habit
	) => void;
	updateBuildLog: (params: UpdateBuildLog) => void;
	openDetailsModal: (params: Habit) => void;
};
