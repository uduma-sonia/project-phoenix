import type { ReqConfig, Service } from '../../types/axios';

type Stat = {
	type: string;
	section: string;
	count: number;
	ref: string;
};

class StatsService {
	private api;
	private prefix = '/stats';

	constructor({ api }: Service) {
		this.api = api;
	}

	async logStat(data: Stat, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getStat(id: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${id}`, { ...reqConfig });
	}
}

export default StatsService;
