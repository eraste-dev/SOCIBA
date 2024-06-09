import { serverEndpoints } from "./../api.route";
import { fetchUserProductFailure, fetchUserProductStart, fetchUserProductSuccess } from "app/reducer/products/propertiy";
import { AppDispatch } from "app/store";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";

export const initializeUserProduct = () => async (dispatch: AppDispatch) => {
	dispatch(fetchUserProductStart());
};

export const fetchUserProduct = (query: IGetSearchPropertiesParams) => async (dispatch: AppDispatch) => {
	dispatch(fetchUserProductStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.properties.search(query) });
		dispatch(fetchUserProductSuccess({ data: response.data, pagination: response.pagination || undefined }));
	} catch (error: any) {
		dispatch(fetchUserProductFailure(error.message));
	}
};
