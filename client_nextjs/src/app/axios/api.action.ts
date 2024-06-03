import { IUser } from "./../auth/auth";
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
	deleteProductStart,
	deleteProductSuccess,
	deleteProductFailure,
	fetchSimilarsSuccess,
	fetchSimilarsFailure,
	fetchSimilarsStart,
} from "app/reducer/products/propertiy";
import { IGetQueryParams, IGetSearchPropertiesParams } from "utils/query-builder.utils";
import {
	initAuthentication,
	loginFailure,
	loginStart,
	loginSuccess,
	logoutStart,
	logoutSuccess,
	registerFailure,
	registerStart,
	registerSuccess,
} from "app/auth/auth";

export const fetchSliders = () => async (dispatch: AppDispatch) => {
	dispatch(fetchSlidersStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.sliders.get });
		dispatch(fetchSlidersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSlidersFailure(error.message));
	}
};

// PROPERTIES ----------------------------------
export const fetchCategories = () => async (dispatch: AppDispatch) => {
	dispatch(fetchCategoriesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.categories });
		dispatch(fetchCategoriesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCategoriesFailure(error.message));
	}
};

export const fetchAllProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchAllPropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) });
		dispatch(fetchAllPropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAllPropertiesFailure(error.message));
	}
};

export const fetchFeatureProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchFeaturePropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) });
		dispatch(fetchFeaturePropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchFeaturePropertiesFailure(error.message));
	}
};

export const fetchSingleProperties = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchSinglePropertiesStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) });
		dispatch(fetchSinglePropertiesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSinglePropertiesFailure(error.message));
	}
};

export const fetchSimilars = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchSimilarsStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) });
		dispatch(fetchSimilarsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSimilarsFailure(error.message));
	}
};

export const setSingleProduct = (product: IProperty) => async (dispatch: AppDispatch) => {
	dispatch(setSinglePropertiesSuccess(product));
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
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.post(payload) });
		dispatch(postProductSuccess(response.data));
	} catch (error: any) {
		console.log(error);
		dispatch(postProductFailure({ error: error.message, errors: error.errors }));
	}
};

export const deleteProduct = (payload: number) => async (dispatch: AppDispatch) => {
	dispatch(deleteProductStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.delete(payload) });
		dispatch(deleteProductSuccess(response.message));
	} catch (error: any) {
		console.log(error);
		dispatch(deleteProductFailure(error.message));
	}
};

export const initProductState = () => async (dispatch: AppDispatch) => {
	dispatch(postProductStart());
};

// ----------------------------------------

// AUTH -----------------------------------
export const login = (params: { email: string; password: string }) => async (dispatch: AppDispatch) => {
	dispatch(loginStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.login(params) });
		localStorage.setItem("token", response.data?.token);
		dispatch(loginSuccess(response.data));
	} catch (error: any) {
		dispatch(loginFailure(error.message));
	}
};

export const logout = (token: string) => async (dispatch: AppDispatch) => {
	// dispatch(logoutStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.logout({ token }) });
		localStorage.removeItem("token");
		dispatch(logoutSuccess());
	} catch (error: any) {
		// dispatch(loginFailure(error.message));
	}
};

export const registerUser = (params: RegisterRequest) => async (dispatch: AppDispatch) => {
	dispatch(registerStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.auth.register, params });
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

export const isAdmin = (user: IUser) => {
	return user.type === "ADMIN";
};

export const isGuest = (user: IUser) => {
	return user.type === "GUEST";
};

export const isAgent = (user: IUser) => {
	return user.type === "AGENT";
};

export const isCustomer = (user: IUser) => {
	return user.type === "USER";
};
