import { IStoreAction, IStoreDataState } from "./../axios/api.type";
import { serverEndpoints } from "./../axios/api.route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "app/axios/api";
import { IServerResponse } from "app/axios/api.type";
import { AppDispatch, RootState } from "app/store";
import axios from "axios";
import { Debug } from "utils/debug.utils";

export interface IUser {
	id: number;
	name: string;
	email: string;
	href: string;
	avatar: string;
}

export interface IAuth {
	token?: string;
	expires?: number;
	user?: IUser;
	registration?: IUser;
	forgetPassword?: {
		success?: boolean;
		message?: string;
		loading?: boolean;
		error?: string | null;
	};
	resetPassword?: {
		success?: boolean;
		message?: string;
		loading?: boolean;
		error?: string | null;
	};
}

const initialState: IStoreDataState<IAuth | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const UserSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		loginStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},
		loginSuccess: (state, action: PayloadAction<IAuth>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		loginFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// LOGOUT
		logout: (state) => {
			state.data = undefined;
		},

		// REGISTER
		registerStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},
		registerSuccess: (state, action: PayloadAction<IUser>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, registration: action.payload };
		},
		registerFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// FORGOT
		forgetStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, resetPassword: undefined, forgetPassword: undefined };
			state.success = false;
			state.message = "";
		},
		forgetSuccess: (state) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, forgetPassword: { success: true } };
		},
		forgetFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// RESET PASSWORD
		resetPasswordStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, resetPassword: undefined };
			state.success = false;
			state.message = "";
		},
		resetPasswordSuccess: (state) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, resetPassword: { success: true } };
		},
		resetPasswordFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		// UPDATE
		updateUserStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
		},
		updateUserSuccess: (state, action: PayloadAction<IUser>) => {
			state.loading = false;
			state.error = null;
			state.success = true;
			state.data = { ...state.data, user: action.payload };
		},
		updateUserFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	loginStart,
	loginSuccess,
	loginFailure,
	logout,
	registerStart,
	registerSuccess,
	registerFailure,
	forgetStart,
	forgetSuccess,
	forgetFailure,
	resetPasswordStart,
	resetPasswordSuccess,
	resetPasswordFailure,
	updateUserStart,
	updateUserSuccess,
	updateUserFailure,
} = UserSlice.actions;

export const UserAction: IStoreAction<IAuth> = {
	data: (state: RootState) => state.auth.data,
	loading: (state: RootState) => state.auth.loading,
	error: (state: RootState) => state.auth.error,
	message: (state: RootState) => state.auth.message,
	success: (state: RootState) => state.auth.success,
};

export default UserSlice.reducer;
