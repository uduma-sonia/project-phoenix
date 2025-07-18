import type { ReqConfig, Service } from '../../types/axios';
import type { User } from '../../types/user';

type Login = {
	email: string;
	password: string;
};

class AuthService {
	private api;
	private prefix = '/auth';

	constructor({ api }: Service) {
		this.api = api;
	}

	async register(data: User, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/signup`, data, { ...reqConfig });
	}

	async login(data: Login, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/signin`, data, { ...reqConfig });
	}

	async requestPasswordReset(data: { email: string }, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}/request-password-reset`, data, { ...reqConfig });
	}
}

export default AuthService;
