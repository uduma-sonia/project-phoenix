/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import Helpers from '$lib/utils/helpers';
import AuthService from './auth';
import UserService from './user';
import TrackerService from './tracker';
import { AUTH_TOKEN } from '$lib/constants/global';

export const API_ENDPOINT = import.meta.env.VITE_API_URL;

class ApiService {
	api: any;
	token: string;
	api_version: string;
	constructor() {
		this.api_version = '/api/v1';
		this.api = axios.create({
			baseURL: API_ENDPOINT + this.api_version
		});
		this.token = Helpers.getCookie(AUTH_TOKEN);
		this.api.interceptors.request.use(this.addTokenToRequest.bind(this));
		this.api.interceptors.response.use((response: any) => {
			return response;
		}, this.handleError.bind(this));
	}

	async addTokenToRequest(request: any) {
		if (!browser) return request;

		if (request.headers.Authorization) return request;

		if (this.token) {
			request.headers['x-access-token'] = this.token;
		}

		return request;
	}

	handleError(error: any) {
		const { response } = error;
		let message = 'An unexpected error occurred';

		if (response) {
			if (response.status === 401) {
				Helpers.deleteCookie(this.token);
				if (browser) {
					goto('/login');
				}
			}

			if (response.data) {
				message = response.data;
				return Promise.reject(message);
			}
			return Promise.reject(message);
		}
		return Promise.reject(message);
	}

	getInstance() {
		return this.api;
	}
}

const apiService = new ApiService();
const api = apiService.getInstance();

export const AuthRequest = new AuthService({ api });
export const UserRequest = new UserService({ api });
export const TrackerRequest = new TrackerService({ api });
