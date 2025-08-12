import {
	IUser,
	updateUserFailure,
	updateUserPasswordFailure,
	updateUserPasswordStart,
	updateUserPasswordSuccess,
	updateUserStart,
	updateUserSuccess,
} from "../../reducer/auth/auth";
import {
	fetchSlidersFailure,
	fetchSlidersStart,
	fetchSlidersSuccess,
	postSlidersFailure,
	postSlidersStart,
	postSlidersSuccess,
} from "app/reducer/sliders/sliders";
import { AppDispatch } from "app/reducer/store";
import { IServerResponse, ProductRequest, RegisterRequest, UpdateUserRequest } from "../api.type";
import { serverEndpoints } from "../api.route";
import { axiosRequest } from "../api";
import {
	fetchCategoriesFailure,
	fetchCategoriesStart,
	fetchCategoriesSuccess,
} from "app/reducer/products/propertiy-category";
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
	IProduct,
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
	searchPropertiesStart,
	searchPropertiesFailure,
	searchPropertiesSuccess,
	initFetchAllProperties,
	postProductInit,
} from "app/reducer/products/product";
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
} from "app/reducer/auth/auth";
import { InputsEditSlider } from "containers/PageDashboard/Sliders/EditSlider";
import { initLocations } from "app/reducer/locations/locations";
import { UpdatePasswordRequest } from "containers/PageDashboard/Users/form/UpdatePassword";

export const fetchSliders = () => async (dispatch: AppDispatch) => {
	dispatch(fetchSlidersStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.sliders.get,
		});
		dispatch(fetchSlidersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSlidersFailure(error.message));
	}
};

export const initEditSliders = () => async (dispatch: AppDispatch) => {
	dispatch(postSlidersStart());
};

export const editSliders =
	(payload: InputsEditSlider | FormData) => async (dispatch: AppDispatch) => {
		dispatch(postSlidersStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.sliders.post(payload),
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: payload,
			});
			dispatch(postSlidersSuccess(response.data));
		} catch (error: any) {
			console.log(error);
			dispatch(postSlidersFailure({ error: error.message, errors: error.errors }));
		}
	};

export const deleteSliders = (payload: { id: number }) => async (dispatch: AppDispatch) => {
	dispatch(postSlidersStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.sliders.delete(payload),
			data: payload,
		});
		dispatch(postSlidersSuccess(response.data));
	} catch (error: any) {
		console.log(error);
		dispatch(postSlidersFailure({ error: error.message, errors: error.errors }));
	}
};

// PROPERTIES ----------------------------------

/**
 * Fetches the categories from the server.
 *
 * @param {AppDispatch} dispatch - The dispatch function from the Redux store.
 * @return {Promise<void>} A promise that resolves when the categories are fetched successfully.
 */
export const fetchCategories = () => async (dispatch: AppDispatch) => {
	dispatch(fetchCategoriesStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.properties.categories,
		});
		dispatch(fetchCategoriesSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchCategoriesFailure(error.message));
	}
};

/**
 * Fetches all properties based on the provided query parameters.
 *
 * @param {IGetSearchPropertiesParams} query - The query parameters for fetching properties.
 * @return {Promise<void>} A promise that resolves once all properties are fetched.
 */
export const fetchAllProperties =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		dispatch(fetchAllPropertiesStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			dispatch(
				fetchAllPropertiesSuccess({
					data: response.data,
					pagination: response.pagination || undefined,
				})
			);
		} catch (error: any) {
			dispatch(fetchAllPropertiesFailure(error.message));
		}
	};

export const searchProperties =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		dispatch(searchPropertiesStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			dispatch(
				searchPropertiesSuccess({
					data: response.data,
					pagination: response.pagination || undefined,
				})
			);
		} catch (error: any) {
			dispatch(searchPropertiesFailure(error.message));
		}
	};

export const inittializePropertyList = () => async (dispatch: AppDispatch) => {
	dispatch(fetchAllPropertiesStart());
};

export const inittPropertyList = () => async (dispatch: AppDispatch) => {
	dispatch(initFetchAllProperties());
};

export const initCitiesList = () => async (dispatch: AppDispatch) => {
	dispatch(initLocations());
};

/**
 * Fetches feature properties based on the provided query parameters.
 *
 * @param {IGetSearchPropertiesParams} query - The query parameters for fetching properties.
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A promise that resolves once the feature properties are fetched.
 */
export const fetchFeatureProperties =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		if (!dispatch) {
			throw new Error("dispatch is null or undefined");
		}

		dispatch(fetchFeaturePropertiesStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			if (!response || !response.data) {
				throw new Error("Server response is null or undefined");
			}
			dispatch(fetchFeaturePropertiesSuccess(response.data));
		} catch (error: any) {
			if (error.message) {
				dispatch(fetchFeaturePropertiesFailure(error.message));
			} else {
				dispatch(fetchFeaturePropertiesFailure("An unknown error occurred"));
			}
		}
	};

export const fetchSingleProperties =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		dispatch(fetchSinglePropertiesStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			dispatch(fetchSinglePropertiesSuccess(response.data));
		} catch (error: any) {
			dispatch(fetchSinglePropertiesFailure(error.message));
		}
	};

export const fetchSimilars =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		dispatch(fetchSimilarsStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			dispatch(fetchSimilarsSuccess(response.data));
		} catch (error: any) {
			dispatch(fetchSimilarsFailure(error.message));
		}
	};

export const setSingleProduct = (product: IProduct) => async (dispatch: AppDispatch) => {
	dispatch(setSinglePropertiesSuccess(product));
};

export const setFilters = (filters: IPropertyFilter) => async (dispatch: AppDispatch) => {
	dispatch(setFiltersSuccess(filters));
};

export const resetFilters = () => async (dispatch: AppDispatch) => {
	dispatch(resetFiltersSuccess());
};

export const postProduct =
	(payload: ProductRequest | FormData) => async (dispatch: AppDispatch) => {
		console.log(">>> payload >> postProduct ", payload);

		dispatch(postProductStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.post(payload),
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: payload,
			});
			dispatch(postProductSuccess(response.data));
		} catch (error: any) {
			console.log(error);
			dispatch(postProductFailure({ error: error.message, errors: error.errors }));
		}
	};

export const postProductWithProgress =
	(payload: ProductRequest | FormData, onUploadProgress?: (progressEvent: any) => void) => async (dispatch: AppDispatch) => {
		console.log(">>> payload >> postProductWithProgress ", payload);

		dispatch(postProductStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.post(payload),
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: payload,
				onUploadProgress: onUploadProgress,
			});
			dispatch(postProductSuccess(response.data));
		} catch (error: any) {
			console.log(error);
			dispatch(postProductFailure({ error: error.message, errors: error.errors }));
		}
	};

export const deleteProduct = (payload: number) => async (dispatch: AppDispatch) => {
	dispatch(deleteProductStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.properties.delete(payload),
		});
		dispatch(deleteProductSuccess(response.message));
	} catch (error: any) {
		console.log(error);
		dispatch(deleteProductFailure(error.message));
	}
};

export const deleteProductImage = (payload: { property_id: number; image_url: string }) => async (dispatch: AppDispatch) => {
    console.log("Début de l'action deleteProductImage");
    try {
        const response = await axiosRequest<IServerResponse>({
            ...serverEndpoints.public.properties.deleteImage(payload),
        });
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

export const initProductState = () => async (dispatch: AppDispatch) => {
	dispatch(postProductInit());
};

// ----------------------------------------

// AUTH -----------------------------------
export const login =
	(params: { email: string; password: string }) => async (dispatch: AppDispatch) => {
		dispatch(loginStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.auth.login(params),
			});
			localStorage.setItem("token", response.data?.token);
			dispatch(loginSuccess(response.data));
		} catch (error: any) {
			dispatch(loginFailure(error.message));
		}
	};

export const logout = (token: string) => async (dispatch: AppDispatch) => {
	// dispatch(logoutStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.auth.logout({ token }),
		});
		localStorage.removeItem("token");
		dispatch(logoutSuccess());
	} catch (error: any) {
		// dispatch(loginFailure(error.message));
	}
};

export const registerUser = (params: RegisterRequest) => async (dispatch: AppDispatch) => {
	dispatch(registerStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.auth.register,
			params,
		});
		dispatch(registerSuccess(response.data));
	} catch (error: any) {
		dispatch(registerFailure({ error: error.message, errors: error.errors }));
	}
};

export const initAuth = () => async (dispatch: AppDispatch) => {
	dispatch(initAuthentication());
};

/**
 * Update the current user
 * use for change password
 * @param params { email: string; password: string }
 * @returns
 */
export const updateUser = (params: FormData | UpdateUserRequest) => async (dispatch: AppDispatch) => {
	dispatch(updateUserStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.auth.updateProfile(params),
			headers: { "Content-Type": "multipart/form-data" },
		});
		dispatch(updateUserSuccess(response.data));
	} catch (error: any) {
		dispatch(updateUserFailure(error.message));
	}
};

export const updateUserPassword = (params: UpdatePasswordRequest) => async (dispatch: AppDispatch) => {
	dispatch(updateUserPasswordStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.auth.updateUserPassword(params),
		});
		dispatch(updateUserPasswordSuccess(response.data));
	} catch (error: any) {
		dispatch(updateUserPasswordFailure(error.message));
	}
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
