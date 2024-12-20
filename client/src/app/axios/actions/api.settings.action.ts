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

import { MovingRequestInputs } from "containers/PageMovingRequest/MovingFormContact";
import {
	fetchALlUserRequestsFailure,
	fetchALlUserRequestsStart,
	fetchALlUserRequestsSuccess,
	postuserRequestsFailure,
	postuserRequestsInitial,
	postuserRequestsStart,
	postuserRequestsSuccess,
} from "app/reducer/userRequest/userRequest";
import {
	fetchALlNotificationFailure,
	fetchALlNotificationStart,
	fetchALlNotificationSuccess,
	markAsReadNotificationFailure,
	markAsReadNotificationStart,
	markAsReadNotificationSuccess,
} from "app/reducer/notifications/notifications";
import {
	fetchDefaultSettingsFailure,
	fetchDefaultSettingsStart,
	fetchDefaultSettingsSuccess,
	initializeState,
	ISettings,
	SETTINGS_KEY,
	updateSettingsFailure,
	updateSettingsStart,
	updateSettingsSuccess,
} from "app/reducer/settings/settings.";

const key: SETTINGS_KEY = "DEFAULT_SETTINGS";

/**
 * Initializes the settings by dispatching the initializeState action.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const initSettings = () => async (dispatch: AppDispatch) => {
	dispatch(initializeState());
};

/**
 * Fetches the default settings from the server and dispatches corresponding actions.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const fetchDefaultSettings = () => async (dispatch: AppDispatch) => {
	dispatch(fetchDefaultSettingsStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.settings.get(key),
		});
		dispatch(fetchDefaultSettingsSuccess(response));
	} catch (error: any) {
		dispatch(fetchDefaultSettingsFailure(error.message));
	}
};

/**
 * Updates a setting by dispatching the updateSettingsStart action, making a POST request to the server with the provided payload, and dispatching either updateSettingsSuccess or updateSettingsFailure based on the response.
 *
 * @param {ISettings} payload - The setting to be updated.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const updateSetting = (payload: ISettings) => async (dispatch: AppDispatch) => {
	dispatch(updateSettingsStart());

	try {
		const response = await axiosRequest<IServerResponse>({
			...serverEndpoints.public.settings.post(payload),
		});
		dispatch(updateSettingsSuccess(response));
	} catch (error: any) {
		console.log(error);
		dispatch(updateSettingsFailure(error.message));
	}
};
