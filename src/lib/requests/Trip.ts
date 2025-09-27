import type { ReqConfig, Service } from '../../types/axios';
import type { Trip } from '../../types/trip';

class TripService {
	private api;
	private prefix = '/travel';

	constructor({ api }: Service) {
		this.api = api;
	}

	async createTrip(data: Trip, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.prefix}`, data, { ...reqConfig });
	}

	async getTrips(reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}`, { ...reqConfig });
	}

	async getSingleTrip(tripId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.prefix}/${tripId}`, { ...reqConfig });
	}

	async updateTrip(userId: string, data: Trip, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/user/${userId}`, data, { ...reqConfig });
	}

	async deleteTrip(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}
}

export default TripService;
