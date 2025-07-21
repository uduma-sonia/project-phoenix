import type { ReqConfig, Service } from '../../types/axios';

export type CreateHabit = {
	name: string;
	type: string;
	interval: string;
	//   startDate: any;
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
	//   endDate?: any;
	docId: string;
	//   habitLog: HabitLog; // This is the log for the date viewed
	description: string;
};

class TrackerService {
	private api;
	private prefix = '/tracker';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createHabit(data: CreateHabit, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getAllHabits(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}`, { ...reqConfig });
	}
}

export default TrackerService;
