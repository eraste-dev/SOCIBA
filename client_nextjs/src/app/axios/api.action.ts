import { fetchSlidersFailure, fetchSlidersStart, fetchSlidersSuccess } from "app/sliders/sliders";
import { AppDispatch } from "app/store";
import { IServerResponse, ProductRequest, RegisterRequest } from "./api.type";
import { serverEndpoints } from "./api.route";
import { axiosRequest } from "./api";
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from "app/reducer/products/propertiy-category";
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
	postProductStart,
	postProductSuccess,
	postProductFailure,
} from "app/reducer/products/propertiy";
import { IGetQueryParams, IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { initAuthentication, loginFailure, loginStart, loginSuccess, registerFailure, registerStart, registerSuccess } from "app/auth/auth";

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

export const postProduct = (payload: ProductRequest) => async (dispatch: AppDispatch) => {
	dispatch(postProductStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.post(payload) }, true);
		dispatch(postProductSuccess(response.data));
	} catch (error: any) {
		dispatch(postProductFailure(error.message));
	}
};

// ----------------------------------------

// AUTH -----------------------------------
export const login = (params: { email: string; password: string }) => async (dispatch: AppDispatch) => {
	dispatch(loginStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.login(params) }, false);
		dispatch(loginSuccess(response.data));
	} catch (error: any) {
		dispatch(loginFailure(error.message));
	}
};

export const logout = (token: string) => async (dispatch: AppDispatch) => {
	dispatch(loginStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.logout(token) }, false);
		dispatch(loginSuccess(response.data));
	} catch (error: any) {
		dispatch(loginFailure(error.message));
	}
};

export const registerUser = (params: RegisterRequest) => async (dispatch: AppDispatch) => {
	dispatch(registerStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.register, params }, false);
		dispatch(registerSuccess(response.data));
	} catch (error: any) {
		dispatch(registerFailure({ error: error.message, errors: error.errors }));
	}
};

export const initAuth = () => async (dispatch: AppDispatch) => {
	dispatch(initAuthentication());
};
// ----------------------------------------

export const getErrors = (errorArray: any, key: string) => {
	if (typeof errorArray === "object") {
		const errors = Object.values(errorArray).filter((error: any) => error[key]);
		return errors;
	}

	return undefined;
};
