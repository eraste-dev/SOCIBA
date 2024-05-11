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
	last_name: string;
	email: string;
	phone: string;
	href: string;
	avatar: string;
}

export interface IAuth {
	token?: string;
	expire?: number;
	user?: IUser;
	registrationSuccess?: boolean;
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

export const AuthSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		initAuthentication: (state) => {
			state.data = undefined;
			state.success = false;
			state.message = "";
			state.loading = false;
			state.error = null;
		},
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
			state.errors = null;
			state.data = undefined;
			state.success = false;
			state.message = "";
		},
		registerSuccess: (state, action: PayloadAction<{ user: IUser; token: string; exprire: number }>) => {
			state.loading = false;
			state.error = null;
			state.data = { ...state.data, registrationSuccess: true, token: action.payload.token, expire: action.payload.exprire, user: action.payload.user };
		},
		registerFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.error = action.payload.error;
			state.errors = action.payload.errors;
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
	initAuthentication,
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
} = AuthSlice.actions;

export const AuthAction: IStoreAction<IAuth> = {
	data: (state: RootState) => state.auth.data,
	loading: (state: RootState) => state.auth.loading,
	error: (state: RootState) => state.auth.error,
	errors: (state: RootState) => state.auth.errors && state.auth.errors,
	message: (state: RootState) => state.auth.message,
	success: (state: RootState) => state.auth.success,
};

export default AuthSlice.reducer;
