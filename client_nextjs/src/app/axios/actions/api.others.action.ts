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
	updateUserScoreFailure,
	updateUserScoreStart,
	updateUserScoreSuccess,
} from "app/reducer/products/product";
import { ISetUserScore } from "containers/PageSingle/SingleAuthorRating";

export const showSnackbar = (message: string, variant: "default" = "default") => ({
	type: "SHOW_SNACKBAR",
	payload: { message, variant },
});

export const fetchLocation = () => async (dispatch: AppDispatch) => {
	dispatch(fetchLocationsStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.locations.get,
		});
		dispatch(fetchLocationsSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchLocationsFailure(error.message));
	}
};

export const updateUserScore = (data: ISetUserScore) => async (dispatch: AppDispatch) => {
	dispatch(updateUserScoreStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.properties.updateUserScore({
				user_id: data.userId,
				score: data.score,
			}),
		});
		dispatch(updateUserScoreSuccess(response.data));
	} catch (error: any) {
		dispatch(updateUserScoreFailure(error.message));
	}
};
