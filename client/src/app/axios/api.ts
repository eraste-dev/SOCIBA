import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { useSelector } from "react-redux";

const useMySelector = () => {
	const myState = useSelector((state) => state);
	return myState;
};

const axiosInstance: AxiosInstance = axios.create({
	// baseURL: "http://localhost:8000", // DEV
	baseURL: "https://api.bajorah.com", // PROD
	
});

export const axiosRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
	try {
		const token: string | null = localStorage.getItem("token");
		if (token) {
			config.headers = {
				...config.headers,
				'Access-Control-Allow-Origin' : '*',
				Authorization: "Bearer " + token,
			};
		}

		// Adjust headers if data is FormData
		if (config.data instanceof FormData) {
			config.headers = {
				...config.headers,
				'Content-Type': 'multipart/form-data'
			};
		}

		const response: { data: T } = await axiosInstance.request<T>(config);
		return response.data;
	} catch (error: any) {
		throw error.response?.data || error;
	}
};

export default axiosInstance;
