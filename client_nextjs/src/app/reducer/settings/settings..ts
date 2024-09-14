import {
	IStoreAction,
	IStoreDataState,
	IStoreDataStateItem,
	ProductRequest,
	createStoreDataStateItem,
} from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";

export type SETTINGS_KEY = "DEFAULT_SETTINGS";

export interface ISettings {
	id: number;

	key: SETTINGS_KEY;
	value: string;
	about_us: string;
	terms_and_conditions: string;
	privacy_policy: string;
	refund_policy: string;
	support_policy: string;

	created_at: Date;
	updated_at: Date;
}

export interface IStoreSettingDataAction {
	success?: boolean;
	message?: string;
	Loading?: boolean;
	error?: string | null;
	data?: ISettings;
}

const successSettingsDataAction = (data: ISettings, message: string = "") => {
	const output: IStoreSettingDataAction = {
		success: true,
		Loading: false,
		error: null,
		data: data,
		message: message,
	};
};

const failSettingsDataAction = (message: string = "") => {
	const output: IStoreSettingDataAction = {
		success: false,
		Loading: false,
		error: null,
		message: message,
	};
};

export interface IStoreSettingData {
	default?: IStoreDataStateItem<ISettings | undefined>;
}

const INITIAL_STORE_SETTING_DATA: IStoreSettingData = {
	default: undefined,
};

const initialState: IStoreDataState<IStoreSettingData | undefined> = {
	data: INITIAL_STORE_SETTING_DATA,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const SettingsSlice = createSlice({
	name: "Settings",
	initialState,
	reducers: {
		initializeState: (state) => {
			state.loading = false;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.errors = undefined;
			state.message = "";
		},

		// DEFAULT
		fetchDefaultSettingsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = {
				...state.data,
				default: createStoreDataStateItem(undefined, true),
			};
			state.success = false;
			state.message = "";
		},
		fetchDefaultSettingsSuccess: (state, action: PayloadAction<{ data: ISettings }>) => {
			state.loading = false;
			state.error = null;
			// paginate: action.payload?.pagination
			state.data = {
				...state.data,
				default: createStoreDataStateItem(action.payload?.data, false, true),
			};
		},
		fetchDefaultSettingsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				default: createStoreDataStateItem(undefined, false, false, action.payload),
			};
			// state.error = action.payload;
		},

		// UPDATE
		updateSettingsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = {
				...state.data,
				default: createStoreDataStateItem(undefined, true),
			};
			state.success = false;
			state.message = "";
		},
		updateSettingsSuccess: (state, action: PayloadAction<{ data: ISettings }>) => {
			state.loading = false;
			state.error = null;
			// paginate: action.payload?.pagination
			state.data = {
				...state.data,
				default: createStoreDataStateItem(action.payload?.data, false, true),
			};
		},
		updateSettingsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.data = {
				...state.data,
				default: createStoreDataStateItem(undefined, false, false, action.payload),
			};
			// state.error = action.payload;
		},
	},
});

export const {
	initializeState,

	fetchDefaultSettingsStart,
	fetchDefaultSettingsSuccess,
	fetchDefaultSettingsFailure,

	updateSettingsStart,
	updateSettingsSuccess,
	updateSettingsFailure,
} = SettingsSlice.actions;

export const SettingsAction: IStoreAction<IStoreSettingData> = {
	data: (state: RootState) => state.settings.data,
	loading: (state: RootState) => state.settings.loading,
	error: (state: RootState) => state.settings.error,
	errors: (state: RootState) => state.settings.errors,
	message: (state: RootState) => state.settings.message,
	success: (state: RootState) => state.settings.success,
};

export default SettingsSlice.reducer;
