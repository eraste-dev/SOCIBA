import { RootState } from "app/store";
import { AxiosRequestConfig } from "axios";

export interface IServerResponse {
	success: boolean;
	message: string;
	data: any;
	error: any;
}

export interface IAxiosRequestConfig extends AxiosRequestConfig {
	// Add any custom properties here
}

export interface IStoreDataState<T> {
	data: T;
	success: boolean;
	message: string;
	loading: boolean;
	error: string | null;
}

export interface IStoreAction<T> {
	data: (state: RootState) => T | undefined;
	loading: (state: RootState) => boolean;
	error: (state: RootState) => string | null;
	message: (state: RootState) => string;
	success: (state: RootState) => boolean;
}
