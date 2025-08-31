import Helpers from '$lib/utils/helpers';
import type { ReqConfig, Service } from '../../types/axios';
import type { HabitStatus } from '../../types/tracker';

export type CreateLog = {
	ownerId: string;
	trackerId: string;
	date: string;
	status: HabitStatus;
	value?: number;
	goalValue?: number;
	goalPeriod?: string;
	unitMeasurement?: string;
};

class TrackerLogService {
	private api;
	private prefix = '/tracker-log';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createLog(data: CreateLog, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async updateLog(id: string, data: CreateLog, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${id}`, data, { ...reqConfig });
	}

	async getLog(id: string, data: { date: string }, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${id}?${Helpers.formatQueryParams(data)}`, {
			...reqConfig
		});
	}

	async getLogs(id: string, data: { start: string; end: string }, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${id}?${Helpers.formatQueryParams(data)}`, {
			...reqConfig
		});
	}

	async getLogStats(id: string, data: { month?: string; year: string }, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/stats/${id}?${Helpers.formatQueryParams(data)}`, {
			...reqConfig
		});
	}

	async getLogList(
		id: string,
		data: { month?: string; year: string; filterBy: string },
		reqConfig?: ReqConfig
	) {
		return await this.api.get(
			`${this.prefix}/stats/list/${id}?${Helpers.formatQueryParams(data)}`,
			{
				...reqConfig
			}
		);
	}

	async deleteLog(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}
}

export default TrackerLogService;
