import { AppDispatch } from "app/reducer/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";
import {
	fetchAllFunctionsFailure,
	fetchAllFunctionsStart,
	fetchAllFunctionsSuccess,
	META_FUNCTION_KEY,
} from "app/reducer/meta/meta";

/**
 * Fetches meta functions from the server and dispatches corresponding actions.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const fetchMetaFunction = () => async (dispatch: AppDispatch) => {
	if (!dispatch) {
		throw new Error("dispatch is null or undefined");
	}

	dispatch(fetchAllFunctionsStart());

	try {
		const response = await axiosRequest<IServerResponse>(
			serverEndpoints.public.meta.search(META_FUNCTION_KEY)
		);

		if (!response || !response.data) {
			throw new Error("Server response is null or undefined");
		}

		dispatch(fetchAllFunctionsSuccess(response.data));
	} catch (error: any) {
		if (error.message) {
			dispatch(fetchAllFunctionsFailure(error.message));
		} else {
			dispatch(fetchAllFunctionsFailure("An unknown error occurred"));
		}
	}
};
