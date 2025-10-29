import type { ReqConfig, Service } from '../../types/axios';
import type { HabitStatus } from '../../types/tracker';

export type CreateHabit = {
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	type: string;
	interval?: string;
	startDate: Date;
	endDate?: Date;
	unitMeasurement?: string;
	goalValue?: string;
	isIndefinite: boolean;
	color?: string;
	selectedDays?: number[];
	isActive: boolean;
	ownerId: string;
	description: string;
	icon: string;
};

class TrackerService {
	private api;
	private prefix = '/tracker';
	private historyPrefix = '/tracker-history';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createHabit(data: CreateHabit, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async updateHabit(id: string, data: CreateHabit, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${id}`, data, { ...reqConfig });
	}

	async getAllHabits(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/all`, { ...reqConfig });
	}

	async getSingleHabit(habitId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${habitId}`, { ...reqConfig });
	}

	async deleteHabit(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}

	async updateHistory(
		data: { trackerId: string; text: string; status: HabitStatus; date: string },
		reqConfig?: ReqConfig
	) {
		return await this.api.post(`${this.historyPrefix}/`, data, { ...reqConfig });
	}

	async getTrackerHistory(trackerId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.historyPrefix}/${trackerId}`, { ...reqConfig });
	}
}

export default TrackerService;
