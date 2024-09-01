import {
	fetchLocationsFailure,
	fetchLocationsStart,
	fetchLocationsSuccess,
} from "app/reducer/locations/locations";
import { AppDispatch } from "app/reducer/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";
import {
	fetchAllUsersFailure,
	fetchAllUsersStart,
	fetchAllUsersSuccess,
	deleteUserStart,
	deleteUserSuccess,
	deleteUserFailure,
} from "app/reducer/users/users";
import {
	postUserRequestsFailure,
	postUserRequestsStart,
	postUserRequestsSuccess,
	UserRequest,
} from "app/reducer/users-request/users-request";
import { MovingRequestInputs } from "containers/PageMovingRequest/SectionContact";

/**
 * Fetches all users from the server and dispatches corresponding actions.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const fetchAllUser = () => async (dispatch: AppDispatch) => {
	dispatch(fetchAllUsersStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.users.getAll,
		});
		dispatch(fetchAllUsersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAllUsersFailure(error.message));
	}
};

/**
 * Deletes a user based on the provided payload.
 *
 * @param {number} payload - The ID of the user to delete.
 * @return {Promise<void>} A Promise that resolves when the user is deleted successfully.
 */
export const deleteUser = (payload: number) => async (dispatch: AppDispatch) => {
	dispatch(deleteUserStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.users.delete(payload),
		});
		dispatch(deleteUserSuccess(response.message));
	} catch (error: any) {
		console.log(error);
		dispatch(deleteUserFailure(error.message));
	}
};

/**
 * Sends a user request with the given payload.
 *
 * @param {MovingRequestInputs} payload - The data for the user request.
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the request is sent successfully.
 */
export const sendUserRequest = (payload: MovingRequestInputs) => async (dispatch: AppDispatch) => {
	dispatch(postUserRequestsStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.users.sendUserRequest(payload),
		});
		dispatch(postUserRequestsSuccess(response));
	} catch (error: any) {
		console.log(error);
		dispatch(postUserRequestsFailure(error.message));
	}
};
