import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";
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
	color?: TwMainColor | string;
	children: IPropertyCategory[];
	parent: IPropertyCategory | null;
}

export interface IStoreDataCategorie {
	parent?: IPropertyCategory[];
	all?: IPropertyCategory[];
	children?: IPropertyCategory[];
	selected?: IPropertyCategory;
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
	data: (state: RootState) => state.categories.data,
	loading: (state: RootState) => state.categories.loading,
	error: (state: RootState) => state.categories.error,
	errors: (state: RootState) => state.categories.errors,
	message: (state: RootState) => state.categories.message,
	success: (state: RootState) => state.categories.success,
};

export default CategorySlice.reducer;
