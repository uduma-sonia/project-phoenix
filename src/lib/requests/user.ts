import type { ReqConfig, Service } from '../../types/axios';
import type { UpdateUser } from '../../types/user';

class UserService {
	private api;
	private prefix = '/user';

	constructor({ api }: Service) {
		this.api = api;
	}

	async getCurrentUser(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}`, { ...reqConfig });
	}

	async getSingleUserWithId(id: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/single/${id}`, { ...reqConfig });
	}
	async getSingleUserWithEmail(id: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/single/email/${id}`, { ...reqConfig });
	}

	async getUsersByEmails(email: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/multiple/email?emails=${email}`, { ...reqConfig });
	}
	async updateUser(userId: string, data: UpdateUser, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${userId}`, data, { ...reqConfig });
	}
}

export default UserService;
