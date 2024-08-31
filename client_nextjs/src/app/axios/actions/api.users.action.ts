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
