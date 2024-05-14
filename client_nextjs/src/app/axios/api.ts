import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { serverUrl } from "./api.route";
import { AuthAction, IUser } from "app/auth/auth";
import { useSelector } from "react-redux";

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
			config.baseURL = serverUrl;
			const token: string | undefined = useSelector(AuthAction.data)?.token;
			if (token) {
				config.headers = {
					...config.headers,
					Authorization: "Bearer " + token,
				};
			}
		}
		const response: { data: T } = await axiosInstance.request<T>(config);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
};

export default axiosInstance;
