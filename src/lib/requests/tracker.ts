import type { ReqConfig, Service } from '../../types/axios';

export type CreateHabit = {
	createdAt?: Date;
	updatedAt?: Date;
	name: string;
	type: string;
	interval?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	startDate: any;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	endDate?: any;
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

	async deleteHabit(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}
}

export default TrackerService;
