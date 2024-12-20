import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServerResponse } from "app/axios/api.type";
import { RootState } from "app/reducer/store";

export interface IUserRequest {
	id: number;
	name: string;
	email: string;
	message: string;
	others: string;
	is_read: boolean;
	reply?: string | null;
	ip_address: string;
	phone: string;
	area: string;
	location: string;
	date: string;
	created_at: string;
	updated_at: string;
}

const initialState: IStoreDataState<IUserRequest[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const userRequestSlice = createSlice({
	name: "userRequests",
	initialState,
	reducers: {
		fetchALlUserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchALlUserRequestsSuccess: (state, action: PayloadAction<IUserRequest[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchALlUserRequestsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		postuserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		postuserRequestsInitial: (state) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.data = undefined;
		},

		postuserRequestsSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		postuserRequestsFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.error = action.payload.error;
		},

		deleteuserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		deleteuserRequestsSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		deleteuserRequestsFailure: (
			state,
			action: PayloadAction<{ error: string; errors: any }>
		) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.error = action.payload.error;
		},
	},
});

export const {
	fetchALlUserRequestsStart,
	fetchALlUserRequestsSuccess,
	fetchALlUserRequestsFailure,

	postuserRequestsStart,
	postuserRequestsInitial,
	postuserRequestsSuccess,
	postuserRequestsFailure,

	deleteuserRequestsStart,
	deleteuserRequestsSuccess,
	deleteuserRequestsFailure,
} = userRequestSlice.actions;

export const userRequestAction: IStoreAction<IUserRequest[]> = {
	data: (state: RootState) => state.userRequests.data,
	loading: (state: RootState) => state.userRequests.loading,
	error: (state: RootState) => state.userRequests.error,
	errors: (state: RootState) => state.userRequests.errors,
	message: (state: RootState) => state.userRequests.message,
	success: (state: RootState) => state.userRequests.success,
};

export default userRequestSlice.reducer;
