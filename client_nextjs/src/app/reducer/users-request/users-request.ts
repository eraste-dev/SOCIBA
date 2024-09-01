import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { serverEndpoints } from "../../axios/api.route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "app/axios/api";
import { IServerResponse } from "app/axios/api.type";
import { AppDispatch, RootState } from "app/reducer/store";
import axios from "axios";
import { Debug } from "utils/debug.utils";

export interface UserRequest {
	id: number; // Identifiant unique de la demande
	name?: string | null; // Nom de l'utilisateur (nullable)
	email?: string | null; // Email de l'utilisateur (nullable)
	message?: string | null; // Message de la demande (nullable)
	others?: string | null; // Autres informations (nullable)
	is_read: boolean; // Indicateur si la demande a été lue
	ip_address?: string | null; // Adresse IP de l'utilisateur (nullable)
	phone?: string | null; // Numéro de téléphone (nullable)
	area?: string | null; // Zone géographique (nullable)
	location?: string | null; // Localisation (nullable)
	date?: string | null; // Date de la demande (nullable, format ISO)
	created_at?: string; // Date de création (nullable, format ISO)
	updated_at?: string;
}

const initialState: IStoreDataState<UserRequest[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const UserRequestSlice = createSlice({
	name: "UserRequests",
	initialState,
	reducers: {
		fetchUserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchUserRequestsSuccess: (state, action: PayloadAction<UserRequest[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchUserRequestsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		postUserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		postUserRequestsSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		postUserRequestsFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.error = action.payload.error;
		},

		deleteUserRequestsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		deleteUserRequestsSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		deleteUserRequestsFailure: (
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
	fetchUserRequestsStart,
	fetchUserRequestsSuccess,
	fetchUserRequestsFailure,

	postUserRequestsStart,
	postUserRequestsSuccess,
	postUserRequestsFailure,

	deleteUserRequestsStart,
	deleteUserRequestsSuccess,
	deleteUserRequestsFailure,
} = UserRequestSlice.actions;

export const UserRequestAction: IStoreAction<UserRequest[]> = {
	data: (state: RootState) => state.UserRequests.data,
	loading: (state: RootState) => state.UserRequests.loading,
	error: (state: RootState) => state.UserRequests.error,
	errors: (state: RootState) => state.UserRequests.errors,
	message: (state: RootState) => state.UserRequests.message,
	success: (state: RootState) => state.UserRequests.success,
};

export default UserRequestSlice.reducer;
