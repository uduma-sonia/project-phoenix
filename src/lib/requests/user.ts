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

	async getSingleUserWithEmail(id: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/single/email/${id}`, { ...reqConfig });
	}

	async getUsersByEmails(email: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/multiple/email?emails=${email}`, { ...reqConfig });
	}
}

export default UserService;
