import { IPagination } from "app/reducer/products/type";
import { RootState } from "app/reducer/store";
import { AxiosRequestConfig } from "axios";
import { STATUS_LABEL } from "components/Dashboard/Products/ChangeProductType";

export interface IServerResponse {
	success: boolean;
	message: string;
	data: any;
	error: any;
	errors?: any[];
	pagination?: IPagination;
}

export interface IAxiosRequestConfig extends AxiosRequestConfig {
	// Add any custom properties here
}

export interface IStoreDataStateItem<T> {
	get?: T | undefined;
	loading: boolean;
	error?: string | null;
	errors?: any;
	message?: string | null;
	success?: boolean;
}

export const createStoreDataStateItem = <T>(
	get: T,
	loading: boolean = true,
	success: boolean = false,
	error: string | null = null,
	errors: any = null,
	message: string | null = null
): IStoreDataStateItem<T> => {
	return {
		get: get,
		loading: loading,
		error: error,
		success: success,
		errors: errors,
		message: message,
	};
};

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
	avatar?: FileList | null;
}

export type UpdateUserRequest = {
	// email: string;
	id: number;
	password?: string;
	confirmPassword?: string;
	name?: string;
	last_name?: string;
	phone?: string;
	phone_whatsapp?: string;
	avatar?: File | null;
};

export interface ProductRequest {
	id?: number;
	title?: string;
	category_id?: number;
	excerpt?: string;
	content?: string;
	type?: string;
	status?: STATUS_LABEL;
	location_id?: string;
	location_description?: string; // detail commune location
	price?: number;
	deposit_price?: number;
	images?: FileList | string[] | null;
}
