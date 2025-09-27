import type { ReqConfig, Service } from '../../types/axios';
import type { Trip, TripActivity, TripMember } from '../../types/trip';

class TripService {
	private api;
	private prefix = '/travel';
	private groupPrefix = '/travel-group';
	private activityPrefix = '/travel-activity';
	private memberPrefix = '/travel-member';

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

	async updateTrip(tripId: string, data: Trip, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.prefix}/${tripId}`, data, { ...reqConfig });
	}

	async deleteTrip(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.prefix}/${id}`, { ...reqConfig });
	}

	// GROUPS
	async createTripActivityGroup(data: { name: string; tripId: string }, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.groupPrefix}`, data, { ...reqConfig });
	}

	async getTripActivityGroups(tripId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.groupPrefix}/${tripId}`, { ...reqConfig });
	}

	async updateTripActivityGroups(groupId: string, data: Trip, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.groupPrefix}/${groupId}`, data, { ...reqConfig });
	}

	async deleteTripActivityGroups(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.groupPrefix}/${id}`, { ...reqConfig });
	}

	// ACTIVITY
	async createTripActivity(data: TripActivity, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.activityPrefix}`, data, { ...reqConfig });
	}

	async getTripActivities(tripId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.activityPrefix}/${tripId}`, { ...reqConfig });
	}

	async updateTripActivity(activityId: string, data: TripActivity, reqConfig?: ReqConfig) {
		return await this.api.put(`${this.activityPrefix}/${activityId}`, data, { ...reqConfig });
	}

	async deleteTripActivity(id: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.activityPrefix}/${id}`, { ...reqConfig });
	}

	// MEMBER
	async addTripMember(data: TripMember, reqConfig?: ReqConfig) {
		return await this.api.post(`${this.memberPrefix}`, data, { ...reqConfig });
	}

	async getTripMembers(tripId: string, reqConfig?: ReqConfig) {
		return await this.api.get(`${this.memberPrefix}/${tripId}`, { ...reqConfig });
	}

	async removeTripMember(tripId: string, memberId: string, reqConfig?: ReqConfig) {
		return await this.api.delete(`${this.memberPrefix}/remove/${tripId}?memberId=${memberId}`, {
			...reqConfig
		});
	}
}

export default TripService;
