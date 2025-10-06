import type { ReqConfig, Service } from '../../types/axios';

class FeedbackService {
	private api;
	private prefix = '/feedback';

	constructor({ api }: Service) {
		this.api = api;
	}

	async sendFeedback(
		data: { subject: string; message: string; isAnonymous: boolean },
		reqConfig?: ReqConfig
	) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}
}

export default FeedbackService;
