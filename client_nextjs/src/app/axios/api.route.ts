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
	},
};
