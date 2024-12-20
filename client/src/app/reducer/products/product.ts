import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import {
	IServerResponse,
	IStoreAction,
	IStoreDataState,
	IStoreDataStateItem,
	ProductRequest,
	createStoreDataStateItem,
} from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";
import { IUser } from "app/reducer/auth/auth";
import { ILocation } from "../locations/locations";
import { IPagination } from "./type";
import { IPRODUCT_AREA_UNIT_KEY } from "containers/PageDashboard/Posts/posts.constantes";

export interface IProductImage {
	id: number;
	image: string;
}

export interface IProductVideo {
	id: number;
	src: string;
}

export interface IProduct {
	id: number;
	href: string;
	category: IPropertyCategory;
	title: string;
	description: string;
	excerpt: string;
	content: string;
	address: string;
	client_address: string;
	price: number;
	price_second: number | null;
	deposit_price: number;
	location_description: string;
	location: ILocation;
	unlisted_city?: ILocation;
	city: string;
	status: "PUBLISH" | "DRAFT" | "DELETED" | "REJECTED" | "PENDING" | "BLOCKED" | null;
	total_click: number;
	latitude: number;
	longitude: number;
	// property_type: string;
	details: string | null;
	whatsapp_link: null;
	facebook_link: null;
	video_link: string;
	images: IProductImage[];
	videos: IProductVideo[];
	featured_image: string;
	type: string;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	author: IUser;
	isLiked: boolean;
	like: number;
	commentCount: number;
	periodicity: string;
	//details
	bathrooms: number | null;
	bedrooms: number | null;
	garages: number | null;
	kitchens: number | null;
	rooms: number | null;
	area: number | null;
	area_unit: IPRODUCT_AREA_UNIT_KEY;
	count_advance: number;
	count_monthly: number;
	jacuzzi: boolean;
	bath: boolean;
	WiFi: boolean;
	pool: boolean;
	air_conditioning: boolean;
	home_type: string;
	home_type_more?: string;
	acd: boolean;
	site_approved: boolean;
	security: string;
	area_count: number;
	purchase_power: string;
	accessibility: string;
}

export type SORT_TYPE = "asc" | "desc" | "*";

export interface IPropertyFilter {
	id?: number;
	slug?: string;
	price_range?: { min: number; max: number };
	offset?: number;
	limit?: number;
	order_by?: SORT_TYPE;
	sort?:
	| "price_asc"
	| "price_desc"
	| "price_desc"
	| "rating_desc"
	| "rating_asc"
	| "featured"
	| "trending"
	| "latest";
	price_sort?: SORT_TYPE;
	deposit_price_sort?: SORT_TYPE;
	posted_by?: number[] | "admin";
	created_by?: number;
	city?: string;
	location?: number | string;
	unlisted_location?: string;
	citySearch?: string;
	top?: boolean;
	categories?: number[];
	locations?: number[];
	searchText?: string;
	textSearch?: string;
	category?: number | "*";
	date?: "all" | "week" | "month" | "year";
	page?: number;
}

export interface IPropertyType {
	id: string;
	name: string;
}

export interface IStorePropertyDataAction {
	success?: boolean;
	message?: string;
	loading?: boolean;
	error?: string | null;
	selected?: IProduct | null;
}

const successProductDataAction = (selected: IProduct, message: string = "") => {
	const output: IStorePropertyDataAction = {
		success: true,
		loading: false,
		error: null,
		selected: selected,
		message: message,
	};
};

const failProductDataAction = (message: string = "") => {
	const output: IStorePropertyDataAction = {
		success: false,
		loading: false,
		error: null,
		message: message,
	};
};

export interface IStorePropertyData {
	all?: IStoreDataStateItem<IProduct[] | undefined>;
	search?: IStoreDataStateItem<IProduct[] | undefined>;
	user?: IStoreDataStateItem<IProduct[] | undefined>;
	paginate?: IPagination;
	features?: IStoreDataStateItem<IProduct[] | undefined>;
	similars?: IProduct[] | undefined;
	single?: IProduct | undefined;
	filters?: IPropertyFilter;
	types?: IPropertyType[];
	updateScore?: IStorePropertyDataAction;
	actions?: {
		delete?: IStorePropertyDataAction;
		store?: IStorePropertyDataAction;
	};
	upload?: {
		video?: IStorePropertyDataAction,
		image?: IStorePropertyDataAction
	}
}

export const defaultFilters: IPropertyFilter = {
	limit: 33,
	order_by: "desc",
	page: 1,
};

const INITIAL_STORE_PROPERTY_DATA: IStorePropertyData = {
	all: undefined,
	features: undefined,
	similars: undefined,
	single: undefined,
	filters: defaultFilters,
};

const initialState: IStoreDataState<IStorePropertyData | undefined> = {
	data: INITIAL_STORE_PROPERTY_DATA,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const PropertiesSlice = createSlice({
	name: "Products",
	initialState,
	reducers: {
		// ALL
		initFetchAllProperties: (state) => {
			state.loading = false;
			state.error = null;
			state.data = {
				...state.data,
				all: createStoreDataStateItem(undefined, false),
				single: undefined,
			};
			state.success = true;
			state.message = "";
		},
		fetchAllPropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = {
				...state.data,
				all: createStoreDataStateItem(undefined, true),
				single: undefined,
			};
			state.success = false;
			state.message = "";
		},
		fetchAllPropertiesSuccess: (
			state,
			action: PayloadAction<{ data: IProduct[]; pagination: IPagination | undefined }>
		) => {
			state.loading = false;
			state.error = null;
			// paginate: action.payload?.pagination
			state.data = {
				...state.data,
				all: createStoreDataStateItem(action.payload?.data, false, true),
			};
		},
		fetchAllPropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				all: createStoreDataStateItem(undefined, false, false, action.payload),
				paginate: undefined,
			};
			// state.error = action.payload;
		},

		searchPropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = {
				...state.data,
				search: createStoreDataStateItem(undefined, true),
				single: undefined,
			};
			state.success = false;
			state.message = "";
		},
		searchPropertiesSuccess: (
			state,
			action: PayloadAction<{ data: IProduct[]; pagination: IPagination | undefined }>
		) => {
			state.loading = false;
			state.error = null;
			// paginate: action.payload?.pagination
			state.data = {
				...state.data,
				search: createStoreDataStateItem(action.payload?.data, false, true),
			};
		},
		searchPropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				search: createStoreDataStateItem(undefined, false, false, action.payload),
				paginate: undefined,
			};
			// state.error = action.payload;
		},

		// FROM USER ALL
		fetchUserProductStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, all: undefined, user: undefined };
			state.success = false;
			state.message = "";
		},
		fetchUserProductSuccess: (
			state,
			action: PayloadAction<{ data: IProduct[]; pagination: IPagination | undefined }>
		) => {
			state.loading = false;
			state.error = null;
			state.data = {
				...state.data,
				user: createStoreDataStateItem<IProduct[] | undefined>(
					action.payload.data,
					false,
					true
				),
			};
		},
		fetchUserProductFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				user: createStoreDataStateItem<IProduct[] | undefined>(
					undefined,
					false,
					false,
					action.payload
				),
			};
			state.error = action.payload;
		},

		// FEATURE
		fetchFeaturePropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, features: createStoreDataStateItem(undefined, true) };
			state.success = false;
			state.message = "";
		},
		fetchFeaturePropertiesSuccess: (state, action: PayloadAction<IProduct[]>) => {
			state.loading = false;
			state.error = null;
			state.data = {
				...state.data,
				features: createStoreDataStateItem(action.payload, false, true),
			};
		},
		fetchFeaturePropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				features: createStoreDataStateItem(undefined, false, false, action.payload),
			};
			// state.error = action.payload;
		},

		// SINGLE
		fetchSinglePropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, single: undefined };
			state.success = false;
			state.message = "";
		},
		fetchSinglePropertiesSuccess: (state, action: PayloadAction<IProduct>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, single: action.payload };
		},
		fetchSinglePropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// SET SINGLE
		setSinglePropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, single: undefined, similars: undefined };
			state.success = false;
			state.message = "";
		},
		setSinglePropertiesSuccess: (state, action: PayloadAction<IProduct>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, single: action.payload };
		},
		setSinglePropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// set selected to actions by user
		postProductInit: (state) => {
			state.loading = false;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.errors = undefined;
			state.message = "";
		},

		// POST
		postProductStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.errors = undefined;
			state.message = "";
		},
		postProductSuccess: (state, action: PayloadAction<ProductRequest>) => {
			state.loading = false;
			state.error = null;
			state.data = undefined;
			state.success = true;
			state.message = "";
		},
		postProductFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.error = action.payload.error;
			state.errors = action.payload.errors;
		},

		// DELETE
		deleteProductStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.errors = undefined;
			state.message = "";
		},
		deleteProductSuccess: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = null;
			// state.data = undefined;
			state.success = true;
			state.message = action.payload;
		},
		deleteProductFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// UPDATE USER SCORE
		updateUserScoreStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = {
				...state.data,
				updateScore: { ...state.data?.updateScore, loading: true },
			}; // single: undefined
			state.success = false;
			state.message = "";
		},
		updateUserScoreSuccess: (state, action: PayloadAction<{ score: number }>) => {
			let single = state.data?.single;
			if (single && single.author && single.author.rating !== undefined) {
				single.author.rating = action.payload.score;
			}
			state.loading = false;
			state.error = null;
			state.data = {
				...state.data,
				single: single,
				updateScore: {
					error: null,
					loading: false,
					message: "",
					success: true,
				},
			};
		},
		updateUserScoreFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// FIlTERS
		setFiltersSuccess: (state, action: PayloadAction<IPropertyFilter>) => {
			state.data = { ...state.data, filters: { ...state.data?.filters, ...action.payload } };
		},
		resetFiltersSuccess: (state) => {
			state.data = { ...state.data, filters: defaultFilters };
		},

		// SIMILAR
		fetchSimilarsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, similars: [] };
			state.success = false;
			state.message = "";
		},
		fetchSimilarsSuccess: (state, action: PayloadAction<IProduct[]>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, similars: action.payload };
		},
		fetchSimilarsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// TYPE
		postTypeStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},
		postTypeSuccess: (state, action: PayloadAction<{ types: IPropertyType[] }>) => {
			state.loading = false;
			state.error = null;
			// state.data = { ...state.data, types: action.payload };
			state.success = true;
			state.message = "";
		},
		postTypeFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// POST
		uploadVideoStart: (state) => {
			state.data = {
				...state.data, upload: {
					video: {
						error: null,
						loading: true,
						message: "",
						success: false,
						selected: null
					}
				}
			}
		},
		uploadVideoSuccess: (state, action: PayloadAction<string>) => {
			state.data = {
				...state.data, upload: {
					video: {
						error: null,
						loading: false,
						message: "Video uploaded successfully",
						success: true,
						selected: null
					}
				}
			}
		},
		uploadVideoFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.data = {
				...state.data, upload: {
					video: {
						error: action.payload.error,
						loading: false,
						message: "",
						success: false,
						selected: null
					}
				}
			}
		},
	},
});

export const {
	initFetchAllProperties,
	fetchAllPropertiesStart,
	fetchAllPropertiesSuccess,
	fetchAllPropertiesFailure,

	searchPropertiesStart,
	searchPropertiesSuccess,
	searchPropertiesFailure,

	fetchSinglePropertiesStart,
	fetchSinglePropertiesSuccess,
	fetchSinglePropertiesFailure,
	setSinglePropertiesStart,
	setSinglePropertiesSuccess,
	setSinglePropertiesFailure,
	fetchFeaturePropertiesStart,
	fetchFeaturePropertiesSuccess,
	fetchFeaturePropertiesFailure,
	fetchSimilarsStart,
	fetchSimilarsSuccess,
	fetchSimilarsFailure,
	setFiltersSuccess,
	resetFiltersSuccess,
	postProductStart,
	postProductInit,
	postProductSuccess,
	postProductFailure,
	deleteProductStart,
	deleteProductSuccess,
	deleteProductFailure,

	fetchUserProductStart,
	fetchUserProductSuccess,
	fetchUserProductFailure,

	updateUserScoreStart,
	updateUserScoreSuccess,
	updateUserScoreFailure,

	uploadVideoStart,
	uploadVideoSuccess,
	uploadVideoFailure,
} = PropertiesSlice.actions;

export const PropertyAction: IStoreAction<IStorePropertyData> = {
	data: (state: RootState) => state.products.data,
	loading: (state: RootState) => state.products.loading,
	error: (state: RootState) => state.products.error,
	errors: (state: RootState) => state.products.errors,
	message: (state: RootState) => state.products.message,
	success: (state: RootState) => state.products.success,
};

export default PropertiesSlice.reducer;
