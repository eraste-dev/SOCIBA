import { fetchLocationsFailure, fetchLocationsStart, fetchLocationsSuccess } from "app/reducer/locations/locations";
import { AppDispatch } from "app/reducer/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";
import { fetchAllUsersFailure, fetchAllUsersStart, fetchAllUsersSuccess } from "app/reducer/users/users";

export const fetchAllUser = () => async (dispatch: AppDispatch) => {
	dispatch(fetchAllUsersStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.users.getAll });
		dispatch(fetchAllUsersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchAllUsersFailure(error.message));
	}
};
