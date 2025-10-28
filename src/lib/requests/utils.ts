import type { ReqConfig, Service } from '../../types/axios';

class UtilsService {
	private api;

	constructor({ api }: Service) {
		this.api = api;
	}

	/** Upload an image and get the link */
	async uploadImage(data: { title: string; name: string; image: any }, reqConfig?: ReqConfig) {
		return await this.api.put(`/${data.title}/${data.name}`, data.image, {
			...reqConfig
		});
	}
}

export default UtilsService;
