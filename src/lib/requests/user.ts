import type { ReqConfig, Service } from '../../types/axios';

class UserService {
	private api;
	private prefix = '/user';

	constructor({ api }: Service) {
		this.api = api;
	}

	async getCurrentUser(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}`, { ...reqConfig });
	}
}

export default UserService;
