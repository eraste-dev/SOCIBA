import { IGetQueryParams, IGetSearchPropertiesParams, QueryBuilder } from "utils/query-builder.utils";
import { ProductRequest, UpdateUserRequest } from "./api.type";
import { IProperty } from "app/reducer/products/propertiy";

export const apiBase: string = "http://localhost:8000";

export const v100: string = "/api/v1";

export const serverUrl = `${apiBase}${v100}/api`;

export interface IAxiosRequestConfig {
	method: string;
	url: string;
	data?: any;
	params?: any;
}

export interface IServerEndpoint {
	public: {
		sliders: {
			get: IAxiosRequestConfig;
		};
		locations: {
			get: IAxiosRequestConfig;
		};
		properties: {
			categories: IAxiosRequestConfig;
			search: (query: IGetSearchPropertiesParams) => IAxiosRequestConfig;
			post: (product: ProductRequest) => IAxiosRequestConfig;
			delete: (id: number) => IAxiosRequestConfig;
		};
		auth: {
			login: (data: { email: string; password: string }) => IAxiosRequestConfig;
			register: IAxiosRequestConfig;
			logout: (data: { token: string }) => IAxiosRequestConfig;
			forgetPassword: IAxiosRequestConfig;
			resetPassword: IAxiosRequestConfig;
			refreshToken: IAxiosRequestConfig;
			profile: IAxiosRequestConfig;
			updateProfile: (data: UpdateUserRequest) => IAxiosRequestConfig;
			updatePassword: (data: UpdateUserRequest) => IAxiosRequestConfig;
			verifyEmail: IAxiosRequestConfig;
			resendEmail: IAxiosRequestConfig;
			confirmEmail: IAxiosRequestConfig;
		};
	};
	authentificated?: any;
}

export const serverEndpoints: IServerEndpoint = {
	public: {
		sliders: {
			get: { method: "GET", url: `${v100}/sliders` },
		},
		locations: {
			get: { method: "GET", url: `${v100}/locations` },
		},
		properties: {
			categories: { method: "GET", url: `${v100}/categories` },
			search: (query: IGetSearchPropertiesParams) => ({ method: "GET", url: `${v100}/properties${QueryBuilder.searchProperties(query)}` }),
			post: (data: ProductRequest) => ({ method: "POST", url: `${v100}/admin/products`, data }),
			delete: (id: number) => ({ method: "DELETE", url: `${v100}/admin/products`, data: { id } }),
		},
		auth: {
			login: (data: { email: string; password: string }) => ({ method: "POST", url: `${v100}/auth/login`, data }),
			register: { method: "POST", url: `${v100}/auth/register` },
			logout: (data: { token: string }) => ({ method: "POST", url: `${v100}/auth/logout`, data }),
			forgetPassword: { method: "POST", url: `${v100}/auth/forget-password` },
			resetPassword: { method: "POST", url: `${v100}/auth/reset-password` },
			refreshToken: { method: "POST", url: `${v100}/auth/refresh-token` },
			profile: { method: "GET", url: `${v100}/auth/profile` },
			verifyEmail: { method: "POST", url: `${v100}/auth/verify-email` },
			resendEmail: { method: "POST", url: `${v100}/auth/resend-email` },
			confirmEmail: { method: "POST", url: `${v100}/auth/confirm-email` },
			updateProfile: (data: UpdateUserRequest) => ({ method: "PUT", url: `${v100}/user/update-profile`, data }),
			updatePassword: (data: UpdateUserRequest) => ({ method: "PUT", url: `${v100}/user/update-password` }),
		},
	},
};
