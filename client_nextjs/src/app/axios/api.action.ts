import { fetchSlidersFailure, fetchSlidersStart, fetchSlidersSuccess } from "app/sliders/sliders";
import { AppDispatch } from "app/store";
import { IServerResponse } from "./api.type";
import { serverEndpoints } from "./api.route";
import { axiosRequest } from "./api";

export const fetchSliders = () => async (dispatch: AppDispatch) => {
	dispatch(fetchSlidersStart());

	try {
		const response = await axiosRequest<IServerResponse>({ ...serverEndpoints.public.sliders.get }, false);
		dispatch(fetchSlidersSuccess(response.data));
	} catch (error: any) {
		dispatch(fetchSlidersFailure(error.message));
	}
};
