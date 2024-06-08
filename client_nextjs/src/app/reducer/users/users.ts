import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";
import { IUser } from "../../auth/auth";

export interface IUsersState {
	users: IUser[];
}

const initialState: IStoreDataState<IUsersState | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const UserManagementSlice = createSlice({
	name: "users-management",
	initialState,
	reducers: {
		initStateUsers: (state) => {
			state.data = undefined;
			state.success = false;
			state.message = "";
			state.loading = false;
			state.error = null;
		},
		fetchAllUsersStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = { ...state.data, users: [] };
			state.success = false;
			state.message = "";
		},
		fetchAllUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
			state.loading = false;
			state.error = null;
			state.success = true;
			state.data = { ...state.data, users: action.payload };
		},
		fetchAllUsersFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { initStateUsers, fetchAllUsersStart, fetchAllUsersSuccess, fetchAllUsersFailure } = UserManagementSlice.actions;

export const UserManagementAction: IStoreAction<IUsersState> = {
	data: (state: RootState) => state.usersManagement.data,
	loading: (state: RootState) => state.usersManagement.loading,
	error: (state: RootState) => state.usersManagement.error,
	errors: (state: RootState) => state.usersManagement.errors && state.auth.errors,
	message: (state: RootState) => state.usersManagement.message,
	success: (state: RootState) => state.usersManagement.success,
};

export default UserManagementSlice.reducer;
