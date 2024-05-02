import { IStoreAction, IStoreDataState } from "../axios/api.type";
import { serverEndpoints } from "../axios/api.route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "app/axios/api";
import { IServerResponse } from "app/axios/api.type";
import { AppDispatch, RootState } from "app/store";
import axios from "axios";
import { Debug } from "utils/debug.utils";
import { TwMainColor } from "data/types";

export interface IPropertyCategory {
	id: number;
	name: string;
	slug: string;
	href: string;
	description: string | null;
	thumbnail: string | null;
	parent_id: number | null;
	count: number;
	children: IPropertyCategory[];
	color?: TwMainColor | string;
}

const initialState: IStoreDataState<IPropertyCategory[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const CategorySlice = createSlice({
	name: "sliders",
	initialState,
	reducers: {
		fetchCategoriesStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchCategoriesSuccess: (state, action: PayloadAction<IPropertyCategory[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailure } = CategorySlice.actions;

export const CategoryAction: IStoreAction<IPropertyCategory[]> = {
	data: (state: RootState) => state.propertyCategories.data,
	loading: (state: RootState) => state.propertyCategories.loading,
	error: (state: RootState) => state.propertyCategories.error,
	message: (state: RootState) => state.propertyCategories.message,
	success: (state: RootState) => state.propertyCategories.success,
};

export default CategorySlice.reducer;
