import { IGetSearchPropertiesParams, QueryBuilder } from "utils/query-builder.utils";
import { ProductRequest, UpdateUserRequest } from "./api.type";
import { InputsEditCategory } from "components/Dashboard/Products/Categories/EditCategory";
import { InputsEditSlider } from "containers/PageDashboard/Sliders/EditSlider";
import { MovingRequestInputs } from "containers/PageMovingRequest/SectionContact";

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
			post: (product: FormData | InputsEditSlider) => IAxiosRequestConfig;
			delete: (payload: { id: number }) => IAxiosRequestConfig;
		};
		locations: {
			get: IAxiosRequestConfig;
		};
		properties: {
			categories: IAxiosRequestConfig;
			editCategory: (params: InputsEditCategory) => IAxiosRequestConfig;
			search: (query: IGetSearchPropertiesParams) => IAxiosRequestConfig;
			post: (product: FormData | ProductRequest) => IAxiosRequestConfig;
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
			updateProfile: (data: FormData | UpdateUserRequest) => IAxiosRequestConfig; // UpdateUserRequest
			// updatePassword: (data: UpdateUserRequest) => IAxiosRequestConfig;
			verifyEmail: IAxiosRequestConfig;
			resendEmail: IAxiosRequestConfig;
			confirmEmail: IAxiosRequestConfig;
		};
		users: {
			getAll: IAxiosRequestConfig;
			delete: (id: number) => IAxiosRequestConfig;
			sendUserRequest: (payload: MovingRequestInputs) => IAxiosRequestConfig;
			getAllUserRequest: IAxiosRequestConfig;
		};
		meta: {
			search: (key: string) => IAxiosRequestConfig;
		};
	};
	authentificated?: any;
}

export const serverEndpoints: IServerEndpoint = {
	public: {
		sliders: {
			get: { method: "GET", url: `${v100}/sliders` },
			post: (data: FormData | InputsEditSlider) => ({
				method: "POST",
				url: `${v100}/admin/sliders`,
				data,
			}),
			delete: (data: { id: number }) => ({
				method: "DELETE",
				url: `${v100}/admin/sliders`,
				data,
			}),
		},
		locations: {
			get: { method: "GET", url: `${v100}/locations` },
		},
		properties: {
			categories: { method: "GET", url: `${v100}/categories` },
			editCategory: (params: InputsEditCategory) => ({
				method: "PUT",
				url: `${v100}/admin/categories`,
			}),
			search: (query: IGetSearchPropertiesParams) => ({
				method: "GET",
				url: `${v100}/properties${QueryBuilder.searchProperties(query)}`,
			}),
			post: (data: FormData | ProductRequest) => ({
				method: "POST",
				url: `${v100}/admin/products`,
				data,
			}),
			delete: (id: number) => ({
				method: "DELETE",
				url: `${v100}/admin/products`,
				data: { id },
			}),
		},
		auth: {
			login: (data: { email: string; password: string }) => ({
				method: "POST",
				url: `${v100}/auth/login`,
				data,
			}),
			register: { method: "POST", url: `${v100}/auth/register` },
			logout: (data: { token: string }) => ({
				method: "POST",
				url: `${v100}/auth/logout`,
				data,
			}),
			forgetPassword: { method: "POST", url: `${v100}/auth/forget-password` },
			resetPassword: { method: "POST", url: `${v100}/auth/reset-password` },
			refreshToken: { method: "POST", url: `${v100}/auth/refresh-token` },
			profile: { method: "GET", url: `${v100}/auth/profile` },
			verifyEmail: { method: "POST", url: `${v100}/auth/verify-email` },
			resendEmail: { method: "POST", url: `${v100}/auth/resend-email` },
			confirmEmail: { method: "POST", url: `${v100}/auth/confirm-email` },
			updateProfile: (data: FormData | UpdateUserRequest) => ({
				method: "PUT",
				url: `${v100}/user/update-profile`,
				data,
			}),
			// updatePassword: (data: UpdateUserRequest) => ({ method: "PUT", url: `${v100}/user/update-password` }),
		},
		users: {
			getAll: { method: "GET", url: `${v100}/user/list` },
			delete: (id: number) => ({
				method: "DELETE",
				url: `${v100}/user/delete`,
				data: { id },
			}),
			sendUserRequest: (payload: MovingRequestInputs) => ({
				method: "POST",
				url: `${v100}/user/send-request`,
				data: payload,
			}),
			getAllUserRequest: { method: "GET", url: `${v100}/user/user-request` },
		},
		meta: {
			search: (key: string) => ({ method: "GET", url: `${v100}/meta/${key}` }),
		},
	},
};
