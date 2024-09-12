import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";

interface INotificationData {
	title: string;
	message: string;
	data: {
		user_id: number;
	};
}

export interface INotification {
	id: number;
	type: "App\\Notifications\\Notifications";
	notifiable_type: "App\\Models\\User";
	notifiable_id: number;
	data: INotificationData;
	read_at: string | null;
	created_at: string;
	updated_at: string;
}

const initialState: IStoreDataState<INotification[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const NotificationSlice = createSlice({
	name: "notifications",
	initialState,
	reducers: {
		initFetchNotificationStart: (state) => {
			state.loading = false;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},

		fetchALlNotificationStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchALlNotificationSuccess: (state, action: PayloadAction<INotification[]>) => {
			state.loading = false;
			state.success = true;
			state.error = null;
			state.data = action.payload;
		},
		fetchALlNotificationFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		markAsReadNotificationStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		markAsReadNotificationSuccess: (state, action: PayloadAction<INotification[]>) => {
			state.loading = false;
			state.success = true;
			state.error = null;
			state.data = action.payload;
		},
		markAsReadNotificationFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	initFetchNotificationStart,

	fetchALlNotificationStart,
	fetchALlNotificationSuccess,
	fetchALlNotificationFailure,

	markAsReadNotificationStart,
	markAsReadNotificationSuccess,
	markAsReadNotificationFailure,
} = NotificationSlice.actions;

export const NotificationAction: IStoreAction<INotification[]> = {
	data: (state: RootState) => state.notifications.data,
	loading: (state: RootState) => state.notifications.loading,
	error: (state: RootState) => state.notifications.error,
	errors: (state: RootState) => state.notifications.errors,
	message: (state: RootState) => state.notifications.message,
	success: (state: RootState) => state.notifications.success,
};

export default NotificationSlice.reducer;
