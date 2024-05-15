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
	errors?: any;
}

export interface IStoreAction<T> {
	data: (state: RootState) => T | undefined;
	loading: (state: RootState) => boolean;
	error: (state: RootState) => string | null;
	errors: (state: RootState) => any | null;
	message: (state: RootState) => string;
	success: (state: RootState) => boolean;
}

// ---------------------------------- PARAMS

export interface RegisterRequest {
	email: string;
	password: string;
	name: string;
	last_name: string;
	phone: string;
	phone_whatsapp?: string;
}

export interface ProductRequest {
	title: string;
	category_id: number;
	excerpt: string;
	content: string;
	type: string;
	location_id: string;
	location_description: string; // detail commune location
	price: number;
	deposit_price: number;
	images: FileList | null;
}
