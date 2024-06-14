import { fetchLocationsFailure, fetchLocationsStart, fetchLocationsSuccess } from "app/reducer/locations/locations";
import { AppDispatch } from "app/reducer/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";

export const showSnackbar = (message: string, variant: "default" = "default") => ({
	type: "SHOW_SNACKBAR",
	payload: { message, variant },
});

export const fetchLocation = () => async (dispatch: AppDispatch) => {
	dispatch(fetchLocationsStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.locations.get });
		dispatch(fetchLocationsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchLocationsFailure(error.message));
	}
};
