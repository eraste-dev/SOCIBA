import { fetchLocationsFailure, fetchLocationsStart, fetchLocationsSuccess } from "app/reducer/locations/locations";
import { AppDispatch } from "app/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";

export const fetchLocation = () => async (dispatch: AppDispatch) => {
	dispatch(fetchLocationsStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.locations.get }, false);
		dispatch(fetchLocationsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchLocationsFailure(error.message));
	}
};
