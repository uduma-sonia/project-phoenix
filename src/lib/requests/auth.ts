import type { ReqConfig, Service } from '../../types/axios';
import type { User } from '../../types/user';

// type Login = {
// 	email: string;
// 	password: string;
// };

class AuthService {
	private api;
	private prefix = '/auth';

	constructor({ api }: Service) {
		this.api = api;
	}

	async register(data: User, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/register`, data, { ...reqConfig });
	}

	// async login(data: Login, reqConfig?: ReqConfig) {
	// 	return await this.api.post(`${this.prefix}/login`, data, { ...reqConfig });
	// }

	// async verifyEmail(token: string, reqConfig?: ReqConfig) {
	// 	return await this.api.get(`${this.prefix}/verify-email?token=${token}`, { ...reqConfig });
	// }
}

export default AuthService;
