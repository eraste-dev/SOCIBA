import { IGetQueryParams, IGetSearchPropertiesParams, QueryBuilder } from "utils/query-builder.utils";

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
		properties: {
			categories: IAxiosRequestConfig;
			search: (query: IGetSearchPropertiesParams) => IAxiosRequestConfig;
		};
		auth: {
			login: IAxiosRequestConfig;
			register: IAxiosRequestConfig;
			logout: IAxiosRequestConfig;
			forgetPassword: IAxiosRequestConfig;
			resetPassword: IAxiosRequestConfig;
			refreshToken: IAxiosRequestConfig;
			profile: IAxiosRequestConfig;
			updateProfile: IAxiosRequestConfig;
			updatePassword: IAxiosRequestConfig;
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
		properties: {
			categories: { method: "GET", url: `${v100}/categories` },
			search: (query: IGetSearchPropertiesParams) => ({ method: "GET", url: `${v100}/properties${QueryBuilder.searchProperties(query)}` }),
		},
		auth: {
			login: { method: "POST", url: `${v100}/auth/login` },
			register: { method: "POST", url: `${v100}/auth/register` },
			logout: { method: "POST", url: `${v100}/auth/logout` },
			forgetPassword: { method: "POST", url: `${v100}/auth/forget-password` },
			resetPassword: { method: "POST", url: `${v100}/auth/reset-password` },
			refreshToken: { method: "POST", url: `${v100}/auth/refresh-token` },
			profile: { method: "GET", url: `${v100}/auth/profile` },
			updateProfile: { method: "PUT", url: `${v100}/auth/profile` },
			updatePassword: { method: "PUT", url: `${v100}/auth/password` },
			verifyEmail: { method: "POST", url: `${v100}/auth/verify-email` },
			resendEmail: { method: "POST", url: `${v100}/auth/resend-email` },
			confirmEmail: { method: "POST", url: `${v100}/auth/confirm-email` },
		},
	},
};
