import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { serverUrl } from "./api.route";

const axiosInstance: AxiosInstance = axios.create({
	baseURL: "http://localhost:8000",
	// baseURL: "https://votre-api.com", // PROD
});

export const setAuthToken = (token: string | null): void => {
	if (token) {
		axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	} else {
		delete axiosInstance.defaults.headers.common["Authorization"];
	}
};

export const axiosRequest = async <T>(config: AxiosRequestConfig, withAuth: boolean = false): Promise<T> => {
	try {
		if (withAuth) {
			// Ajouter le jeton d'authentification aux en-têtes de la requête
			const token = localStorage.getItem("token"); // Adapter la récupération du jeton à votre logique
			config.baseURL = serverUrl;
			if (token) {
				config.headers = {
					...config.headers,
					"Content-Type": "application/json",
					Accept: "application/json",
					// "Access-Control-Allow-Origin": "*",
					// "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
					// "Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
					// "Access-Control-Allow-Credentials": "true",
					// "Access-Control-Expose-Headers": "Authorization",
					Authorization: `Bearer ${token}`,
				};
				// setAuthToken(token);
			}
		}
		const response: { data: T } = await axiosInstance.request<T>(config);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
};

export default axiosInstance;
