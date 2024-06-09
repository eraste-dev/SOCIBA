import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { serverUrl } from "./api.route";
import { AuthAction, IUser } from "app/auth/auth";
import { useSelector } from "react-redux";

const useMySelector = () => {
	const myState = useSelector((state) => state);
	return myState;
};

const axiosInstance: AxiosInstance = axios.create({
	// baseURL: "http://localhost:8000", // DEV
	baseURL: "https://api.eebtp-ci.com", // PROD
});

export const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		const token: string | null = localStorage.getItem("token");
		if (token) {
			config.headers = {
				...config.headers,
				Authorization: "Bearer " + token,
			};
		}
		const response: { data: T } = await axiosInstance.request<T>(config);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
};

export default axiosInstance;
