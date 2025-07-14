import { serverEndpoints } from "./../api.route";
import {
	fetchUserProductFailure,
	fetchUserProductStart,
	fetchUserProductSuccess,
	uploadVideoFailure,
	uploadVideoStart,
	uploadVideoSuccess,
} from "app/reducer/products/product";
import { AppDispatch } from "app/reducer/store";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { axiosRequest } from "../api";
import { IServerResponse, ProductRequest, UploadVideoProductRequest } from "../api.type";
import { InputsEditCategory } from "components/Dashboard/Products/Categories/EditCategory";
import {
	updateProductCategoryFailure,
	updateProductCategoryStart,
	updateProductCategorySuccess,
} from "app/reducer/products/propertiy-category";

export const initializeUserProduct = () => async (dispatch: AppDispatch) => {
	dispatch(fetchUserProductStart());
};

export const fetchUserProduct =
	(query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
		dispatch(fetchUserProductStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.search(query),
			});
			dispatch(
				fetchUserProductSuccess({
					data: response.data,
					pagination: response.pagination || undefined,
				})
			);
		} catch (error: any) {
			dispatch(fetchUserProductFailure(error.message));
		}
	};

export const updateUser = (params: InputsEditCategory) => async (dispatch: AppDispatch) => {
	dispatch(updateProductCategoryStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.properties.editCategory(params),
			// headers: { "Content-Type": "multipart/form-data" },
		});
		dispatch(updateProductCategorySuccess(response.data));
	} catch (error: any) {
		dispatch(updateProductCategoryFailure(error.message));
	}
};

export const uploadVideo =
	(payload: UploadVideoProductRequest | FormData) => async (dispatch: AppDispatch) => {
		console.log(">>> payload >> postProduct ", payload);

		dispatch(uploadVideoStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.uploadVideo(payload),
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: payload,
			});
			dispatch(uploadVideoSuccess(response.data));
		} catch (error: any) {
			console.log(error);
			dispatch(uploadVideoFailure({ error: error.message, errors: error.errors }));
		}
	};

export const uploadVideoWithProgress =
	(payload: UploadVideoProductRequest | FormData, onUploadProgress?: (progressEvent: any) => void) => async (dispatch: AppDispatch) => {
		console.log(">>> payload >> uploadVideoWithProgress ", payload);

		dispatch(uploadVideoStart());

		try {
			const response = await axiosRequest<IServerResponse>({
				...serverEndpoints.public.properties.uploadVideo(payload),
				headers: {
					"Content-Type": "multipart/form-data",
				},
				data: payload,
				onUploadProgress: onUploadProgress,
			});
			dispatch(uploadVideoSuccess(response.data));
		} catch (error: any) {
			console.log(error);
			dispatch(uploadVideoFailure({ error: error.message, errors: error.errors }));
		}
	};