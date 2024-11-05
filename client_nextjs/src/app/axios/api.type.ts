import { IUser, IuserStatus } from "app/reducer/auth/auth";
import { ILocation } from "app/reducer/locations/locations";
import { IProduct } from "app/reducer/products/product";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { IPagination } from "app/reducer/products/type";
import { RootState } from "app/reducer/store";
import { AxiosRequestConfig } from "axios";
import { STATUS_LABEL } from "components/Dashboard/Products/ChangeProductType";
import { IPRODUCT_AREA_UNIT_KEY } from "containers/PageDashboard/Posts/posts.constantes";

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
	fonction?: string;
	influence_zone_id?: number;
	confirmPassword?: string;
	name?: string;
	last_name?: string;
	phone?: string;
	phone_whatsapp?: string;
	avatar?: File | null;
	status?: IuserStatus;
};

export type PeriodicityType = "DAY" | "WEEK" | "MONTH" | "YEAR" | "VISIT";

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
	unlisted_city?: string;
	location_description?: string; // detail commune location
	price?: number;
	price_second?: number | null;
	deposit_price?: number;
	images?: FileList | string[] | null;
	videos?: FileList | string[] | null;
	// details
	bathrooms?: number | null;
	bedrooms?: number | null;
	garages?: number | null;
	kitchens?: number | null;
	rooms?: number | null;
	area?: number | null;
	area_unit?: IPRODUCT_AREA_UNIT_KEY;
	count_advance?: number | null;
	count_monthly?: number | null;
	jacuzzi?: number;
	bath?: number;
	WiFi?: number;
	pool?: number;
	air_conditioning?: number;
	acd?: number;
	site_approved?: number;
	home_type?: string;
	home_type_more?: string;
	security?: string;
	purchase_power?: string;
	accessibility?: string;
	area_count?: number;
}

export const PRODUCT_REQUEST_EMPTY: ProductRequest = {
	price: 0,
	price_second: null,
	bathrooms: null,
	bedrooms: null,
	garages: null,
	kitchens: null,
	rooms: null,
	area: null,
	area_unit: "M",
	count_advance: null,
	count_monthly: null,
	jacuzzi: 0,
	bath: 0,
	WiFi: 0,
	pool: 0,
	air_conditioning: 0,
	acd: 0,
	home_type: "",
	security: "",
	purchase_power: "",
	accessibility: "",
	area_count: 0,
};

const EMPTY_AUTHOR: IUser = {
	id: 0,
	avatar: "",
	count_products: 0,
	email: "",
	fonction: "",
	href: "",
	last_name: "",
	name: "",
	phone: "",
	phone_whatsapp: "",
	status: "PENDING",
	type: "USER",
	influence_zone: null,
	rating: 0,
};

const EMPTY_CATEGORY: IPropertyCategory = {
	id: 0,
	name: "",
	slug: "",
	href: "",
	description: null,
	thumbnail: null,
	parent_id: null,
	count: 0,
	color: "",
	children: [],
	parent: null,
	type: [],
	uuid: "",
	can_delete: false,
	can_upload_image: true,
};

export const EMPTY_LOCATION: ILocation = {
	id: 0,
	name: "",
	description: null,
	href: "",
	city: null,
	iso3: null,
	iso2: null,
	lat: null,
	long: null,
	thumbnail: null,
	updated_at: null,
	count_post: null,
};

export const EMPTY_PRODUCT: IProduct = {
	id: 0,
	href: "",
	category: EMPTY_CATEGORY,
	title: "",
	description: "",
	excerpt: "",
	content: "",
	address: "",
	client_address: "",
	price: 0,
	price_second: null,
	deposit_price: 0,
	location_description: "",
	location: EMPTY_LOCATION,
	city: "",
	status: null,
	total_click: 0,
	latitude: 0,
	longitude: 0,
	details: null,
	whatsapp_link: null,
	facebook_link: null,
	video_link: "",
	images: [],
	videos: [],
	featured_image: "",
	type: "",
	created_by: "",
	updated_by: "",
	created_at: new Date(),
	updated_at: new Date(),
	author: EMPTY_AUTHOR,
	isLiked: false,
	like: 0,
	commentCount: 0,
	periodicity: "",
	bathrooms: null,
	bedrooms: null,
	garages: null,
	kitchens: null,
	rooms: null,
	area: null,
	area_unit: "M",
	count_advance: 0,
	count_monthly: 0,
	jacuzzi: false,
	bath: false,
	WiFi: false,
	pool: false,
	air_conditioning: false,
	home_type: "",
	acd: false,
	site_approved: false,
	security: "",
	area_count: 0,
	purchase_power: "",
	accessibility: "",
};
