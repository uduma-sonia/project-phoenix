/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import Helpers from '$lib/utils/helpers';
import AuthService from './auth';
import UserService from './user';
import TrackerService from './tracker';
import TrackerLogService from './trackerLog';
import RecipeService from './recipe';
import RecipeGroupService from './recipeGroup';
import { AUTH_TOKEN } from '$lib/constants/global';
import ShoppingService from './shopping';
import StatsService from './stats';

export const API_ENDPOINT = import.meta.env.VITE_API_URL;

class ApiService {
	api: any;
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

const apiService = new ApiService();
const api = apiService.getInstance();

export const AuthRequest = new AuthService({ api });
export const UserRequest = new UserService({ api });
export const TrackerRequest = new TrackerService({ api });
export const TrackerLogRequest = new TrackerLogService({ api });
export const shoppingRequest = new ShoppingService({ api });
export const recipeRequest = new RecipeService({ api });
export const recipeGroupRequest = new RecipeGroupService({ api });
export const statsRequest = new StatsService({ api });
