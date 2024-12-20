import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";
import { IUser } from "../auth/auth";

export const META_FUNCTION_KEY = "@USER_FUNCTION";
export const META_FOOTER_KEY = "@FOOTER";

export interface IMeta {
	id: number;
	title?: string;
	key: string;
	value?: string;
	type?: string;
	description?: string;
	user?: IUser;
	deleted_at: string | null;
}

export interface IMetaStateItem {
	key: "@USER_FUNCTION" | "@FOOTER";
	data: IMeta[] | undefined;
	success: boolean;
	message: string | null;
	loading: boolean;
	error: string | null;
}

export interface IMetaState {
	functions?: IMetaStateItem;
	footer?: IMetaStateItem;
}

export const GET_DEFAULT_META_STATE = (key: "@USER_FUNCTION" | "@FOOTER"): IMetaStateItem => {
	return {
		key,
		data: undefined,
		success: false,
		message: null,
		loading: false,
		error: null,
	};
};

const initialState: IStoreDataState<IMetaState | undefined> = {
	data: {
		functions: GET_DEFAULT_META_STATE(META_FUNCTION_KEY),
		footer: GET_DEFAULT_META_STATE(META_FOOTER_KEY),
	},
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const MetaSlice = createSlice({
	name: "meta",
	initialState,
	reducers: {
		initStateUsers: (state) => {
			state.data = undefined;
			state.success = false;
			state.message = "";
			state.loading = false;
			state.error = null;
		},
		fetchAllFunctionsStart: (state) => {
			if (state && state.data && state.data.functions) {
				state.data.functions.loading = true;
				state.data.functions.error = null;
				state.data.functions.success = false;
				state.data.functions.message = "";
				state.data.functions.data = [];
			}
		},
		fetchAllFunctionsSuccess: (state, action: PayloadAction<IMeta[]>) => {
			if (!state.data?.functions) {
				state.data = {
					...state.data,
					functions: GET_DEFAULT_META_STATE(META_FUNCTION_KEY),
				};
			}

			if (state.data.functions) {
				state.data.functions.loading = false;
				state.data.functions.error = null;
				state.data.functions.success = true;
				state.data.functions.message = "";
				state.data.functions.data = action.payload;
			}
		},
		fetchAllFunctionsFailure: (state, action: PayloadAction<string>) => {
			if (state.data && state.data.functions) {
				state.data.functions.loading = false;
				state.data.functions.error = action.payload;
				state.data.functions.success = false;
				state.data.functions.message = "";
			}
		},
	},
});

export const {
	initStateUsers,
	fetchAllFunctionsStart,
	fetchAllFunctionsSuccess,
	fetchAllFunctionsFailure,
} = MetaSlice.actions;

export const MetaAction: IStoreAction<IMetaState> = {
	data: (state: RootState) => state.meta.data,
	loading: (state: RootState) => state.meta.loading,
	error: (state: RootState) => state.meta.error,
	errors: (state: RootState) => state.meta.errors && state.auth.errors,
	message: (state: RootState) => state.meta.message,
	success: (state: RootState) => state.meta.success,
};

export default MetaSlice.reducer;
