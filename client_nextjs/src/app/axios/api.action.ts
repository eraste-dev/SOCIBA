import { fetchSlidersFailure, fetchSlidersStart, fetchSlidersSuccess } from "app/sliders/sliders";
import { AppDispatch } from "app/store";
import { IServerResponse } from "./api.type";
import { serverEndpoints } from "./api.route";
import { axiosRequest } from "./api";
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from "app/properties/propertiy-category";
import {
	IPropertyFilter,
	fetchAllPropertiesFailure,
	fetchAllPropertiesStart,
	fetchAllPropertiesSuccess,
	fetchFeaturePropertiesFailure,
	fetchFeaturePropertiesStart,
	fetchFeaturePropertiesSuccess,
	fetchSinglePropertiesFailure,
	fetchSinglePropertiesStart,
	fetchSinglePropertiesSuccess,
	setFiltersSuccess,
	resetFiltersSuccess,
	IProperty,
	setSinglePropertiesStart,
	setSinglePropertiesSuccess,
	setSinglePropertiesFailure,
} from "app/properties/propertiy";
import { IGetQueryParams, IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { loginFailure, loginStart, loginSuccess } from "app/auth/auth";

export const fetchSliders = () => async (dispatch: AppDispatch) => {
	dispatch(fetchSlidersStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.sliders.get }, false);
		dispatch(fetchSlidersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSlidersFailure(error.message));
	}
};

// PROPERTIES ----------------------------------
export const fetchCategories = () => async (dispatch: AppDispatch) => {
	dispatch(fetchCategoriesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.categories }, false);
		dispatch(fetchCategoriesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCategoriesFailure(error.message));
	}
};

export const fetchAllProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchAllPropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) }, false);
		dispatch(fetchAllPropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAllPropertiesFailure(error.message));
	}
};

export const fetchFeatureProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchFeaturePropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) }, false);
		dispatch(fetchFeaturePropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchFeaturePropertiesFailure(error.message));
	}
};

export const fetchSingleProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchSinglePropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) }, false);
		dispatch(fetchSinglePropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSinglePropertiesFailure(error.message));
	}
};

export const setSingleProperties = (product: IProperty) => async (dispatch: AppDispatch) => {
	dispatch(setSinglePropertiesStart());

	try {
		dispatch(setSinglePropertiesSuccess(product));
	} catch (error: any) {
		dispatch(setSinglePropertiesFailure("Impossible de définir les propriétés"));
	}
};

export const setFilters = (filters: IPropertyFilter) => async (dispatch: AppDispatch) => {
	dispatch(setFiltersSuccess(filters));
};

export const resetFilters = () => async (dispatch: AppDispatch) => {
	dispatch(resetFiltersSuccess());
};
// ----------------------------------------

// AUTH -----------------------------------
export const login =
	({ email, password }: { email: string; password: string }) =>
	async (dispatch: AppDispatch) => {
		dispatch(loginStart());

		try {
			const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.login }, false);
			dispatch(loginSuccess(response.data));
		} catch (error: any) {
			dispatch(loginFailure(error.message));
		}
	};
// ----------------------------------------
