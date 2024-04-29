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
	};
	authentificated?: any;
}

export const serverEndpoints: IServerEndpoint = {
	public: {
		sliders: {
			get: { method: "GET", url: `${v100}/sliders` },
		},
	},
};
