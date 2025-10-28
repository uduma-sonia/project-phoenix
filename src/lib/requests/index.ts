/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { type AxiosInstance } from 'axios';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import Helpers from '$lib/utils/helpers';
import AuthService from './auth';
import UserService from './user';
import TrackerService from './tracker';
import TrackerLogService from './trackerLog';
import RecipeService from './recipe';
import { AUTH_TOKEN } from '$lib/constants/global';
import ShoppingService from './shopping';
import StatsService from './stats';
import TripService from './Trip';
import PackingService from './packing';
import FeedbackService from './feedback';
import UtilsService from './utils';

export const API_ENDPOINT = import.meta.env.VITE_API_URL;
export const BUNNY_STORAGE_KEY = import.meta.env.VITE_BUNNY_STORAGE_KEY;
export const BUNNY_STORAGE_NAME = import.meta.env.VITE_BUNNY_STORAGE_NAME;

class ApiService {
	api: AxiosInstance;
	api_version: string;
	constructor() {
		this.api_version = '/api/v1';
		this.api = axios.create({
			baseURL: API_ENDPOINT + this.api_version
		});
		this.api.interceptors.request.use(this.addTokenToRequest.bind(this));
		this.api.interceptors.response.use((response: any) => {
			return response;
		}, this.handleError.bind(this));
	}

	async addTokenToRequest(request: any) {
		if (!browser) return request;

		if (request.headers.Authorization) return request;

		const token = Helpers.getCookie(AUTH_TOKEN);

		if (token) {
			request.headers['x-access-token'] = token;
		}

		return request;
	}

	handleError(error: any) {
		const { response } = error;
		let message = 'An unexpected error occurred';
		const token = Helpers.getCookie(AUTH_TOKEN);

		if (response) {
			if (response.status === 401) {
				Helpers.deleteCookie(token);
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

class BunnyApiService {
	api: AxiosInstance;

	constructor() {
		this.api = axios.create({
			baseURL: `https://storage.bunnycdn.com/${BUNNY_STORAGE_NAME}`
		});
		this.api.interceptors.request.use(this.addTokenToRequest.bind(this));
		this.api.interceptors.response.use((response: any) => {
			return response;
		}, this.handleError.bind(this));
	}

	async addTokenToRequest(request: any) {
		if (request.headers.Authorization) return request;

		request.headers['AccessKey'] = BUNNY_STORAGE_KEY;
		return request;
	}

	handleError(error: any) {
		const { response } = error;
		let message = 'An unexpected error occurred';

		if (response) {
			if (response.data) {
				message = response.data.message;

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
const bunnyApiService = new BunnyApiService();

const api = apiService.getInstance();
const bunnyAPI = bunnyApiService.getInstance();

export const AuthRequest = new AuthService({ api });
export const UserRequest = new UserService({ api });
export const TrackerRequest = new TrackerService({ api });
export const TrackerLogRequest = new TrackerLogService({ api });
export const ShoppingRequest = new ShoppingService({ api });
export const RecipeRequest = new RecipeService({ api });
export const StatsRequest = new StatsService({ api });
export const TripRequest = new TripService({ api });
export const PackingRequest = new PackingService({ api });
export const FeedbackRequest = new FeedbackService({ api });

export const UtilsRequest = new UtilsService({ api: bunnyAPI });
