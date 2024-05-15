import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IStoreAction, IStoreDataState } from "app/axios/api.type";
import { RootState } from "app/store";

interface Snackbar {
	message: string;
	variant: "default" | "error" | "warning" | "info" | "success";
}

const initialState: IStoreDataState<Snackbar[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const SnackbarSlice = createSlice({
	name: "Snackbars",
	initialState,
	reducers: {
		setSnackbar: (state, action: PayloadAction<Snackbar[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
	},
});

export const { setSnackbar } = SnackbarSlice.actions;

export const SnackbarAction: IStoreAction<Snackbar[]> = {
	data: (state: RootState) => state.snackbars.data,
	loading: (state: RootState) => state.snackbars.loading,
	error: (state: RootState) => state.snackbars.error,
	errors: (state: RootState) => state.snackbars.errors,
	message: (state: RootState) => state.snackbars.message,
	success: (state: RootState) => state.snackbars.success,
};

export default SnackbarSlice.reducer;
