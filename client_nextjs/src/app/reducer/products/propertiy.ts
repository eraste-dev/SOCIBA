import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { IStoreAction, IStoreDataState, ProductRequest } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IUser } from "app/auth/auth";
import { ILocation } from "../locations/locations";

export interface IPropertyImage {
	id: number;
	property_id: number;
	image: string;
	created_at: Date;
}

export interface IProperty {
	id: number;
	href: string;
	category: IPropertyCategory;
	title: string;
	description: string;
	content: string;
	address: string;
	client_address: string;
	price: number;
	location_description: string;
	location: ILocation;
	city: string;
	status: string;
	total_click: number;
	latitude: number;
	longitude: number;
	property_type: string;
	details: string | null;
	whatsapp_link: null;
	facebook_link: null;
	video_link: string;
	images: IPropertyImage[];
	featured_image: string;
	post_type: string;
	created_by: string;
	updated_by: string;
	created_at: Date;
	updated_at: Date;
	author: IUser;
	isLiked: boolean;
	like: number;
	commentCount: number;
}

export interface IPropertyFilter {
	price_range?: { min: number; max: number };
	sort?: "price_asc" | "price_desc" | "price_desc" | "rating_desc" | "rating_asc" | "featured" | "trending" | "latest";
	posted_by?: number[] | "admin";
	city?: string;
	categories?: number[];
	date?: "all" | "week" | "month" | "year";
}

export interface IPropertyType {
	id: string;
	name: string;
}

export interface IStorePropertyData {
	all?: IProperty[] | undefined;
	features?: IProperty[] | undefined;
	similars?: IProperty[] | undefined;
	single?: IProperty | undefined;
	filters?: IPropertyFilter;
	types?: IPropertyType[];
}

export const defaultFilters: IPropertyFilter = {
	price_range: { min: 0, max: 1000000 },
	sort: "price_desc",
	city: "",
	categories: [],
	date: "all",
	posted_by: [],
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
		fetchAllPropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, all: [], single: undefined };
			state.success = false;
			state.message = "";
		},
		fetchAllPropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, all: action.payload };
		},
		fetchAllPropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// FEATURE
		fetchFeaturePropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, features: [] };
			state.success = false;
			state.message = "";
		},
		fetchFeaturePropertiesSuccess: (state, action: PayloadAction<IProperty[]>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, features: action.payload };
		},
		fetchFeaturePropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// SINGLE
		fetchSinglePropertiesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, single: undefined };
			state.success = false;
			state.message = "";
		},
		fetchSinglePropertiesSuccess: (state, action: PayloadAction<IProperty>) => {
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
			state.data = { ...state.data, single: undefined };
			state.success = false;
			state.message = "";
		},
		setSinglePropertiesSuccess: (state, action: PayloadAction<IProperty>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, single: action.payload };
		},
		setSinglePropertiesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// POST
		postProductStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},
		postProductSuccess: (state, action: PayloadAction<ProductRequest>) => {
			state.loading = false;
			state.error = null;
			state.data = undefined;
			state.success = true;
			state.message = "";
		},
		postProductFailure: (state, action: PayloadAction<string>) => {
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
		fetchSimilars: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, similars: [] };
			state.success = false;
			state.message = "";
		},
		fetchSimilarsSuccess: (state, action: PayloadAction<IProperty[]>) => {
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
			state.data = { ...state.data, types: action.payload };
			state.success = true;
			state.message = "";
		},
		postTypeFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchAllPropertiesStart,
	fetchAllPropertiesSuccess,
	fetchAllPropertiesFailure,
	fetchSinglePropertiesStart,
	fetchSinglePropertiesSuccess,
	fetchSinglePropertiesFailure,
	setSinglePropertiesStart,
	setSinglePropertiesSuccess,
	setSinglePropertiesFailure,
	fetchFeaturePropertiesStart,
	fetchFeaturePropertiesSuccess,
	fetchFeaturePropertiesFailure,
	fetchSimilars,
	fetchSimilarsSuccess,
	fetchSimilarsFailure,
	setFiltersSuccess,
	resetFiltersSuccess,
	postProductStart,
	postProductSuccess,
	postProductFailure,
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