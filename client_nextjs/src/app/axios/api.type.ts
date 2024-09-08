import { IPagination } from "app/reducer/products/type";
import { RootState } from "app/reducer/store";
import { AxiosRequestConfig } from "axios";
import { STATUS_LABEL } from "components/Dashboard/Products/ChangeProductType";
import { IPRODUCT_AREA_UNIT_KEY } from "containers/PageDashboard/Posts/DashboardSubmitPost";

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
	fonction: string;
	influence_zone_id: string;
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

export type PeriodicityType = "DAY" | "WEEK" | "MONTH" | "YEAR";
export interface ProductRequest {
	id?: number;
	title?: string;
	category_id?: number;
	periodicity?: PeriodicityType;
	excerpt?: string;
	content?: string;
	type?: string;
	status?: STATUS_LABEL;
	location_id?: string;
	location_description?: string; // detail commune location
	price?: number;
	deposit_price?: number;
	images?: FileList | string[] | null;
	// details
	bathrooms: number | null;
	bedrooms: number | null;
	garages: number | null;
	kitchens: number | null;
	rooms: number | null;
	area: number | null;
	area_unit: IPRODUCT_AREA_UNIT_KEY;
	count_advance: number | null;
	count_monthly: number | null;
	jacuzzi: number;
	bath: number;
	WiFi: number;
	pool: number;
	air_conditioning: number;
	acd: number;
	reservation_type: string;
	security: string;
	purchase_power: string;
	accessibility: string;
}
