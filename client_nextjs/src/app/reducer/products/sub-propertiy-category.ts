import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/reducer/store";
import { IProductType } from "containers/PageDashboard/Posts/DashboardSubmitPost";

export interface IPropertySubCategory {
	id: number;
	name: string;
	allow: string[];
	allow_type: IProductType | "*";
	uuid: string;
	// can_delete: boolean;
	// can_upload_image: boolean;
}

export interface IStoreDataCategorie {
	parent?: IPropertySubCategory[];
	all?: IPropertySubCategory[];
	children?: IPropertySubCategory[];
	selected?: IPropertySubCategory;
}

const initialState: IStoreDataState<IPropertySubCategory[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const CategorySubSlice = createSlice({
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
		fetchCategoriesSuccess: (state, action: PayloadAction<IPropertySubCategory[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchCategoriesFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		updateProductCategoryStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		updateProductCategorySuccess: (state, action: PayloadAction<IPropertySubCategory>) => {
			state.loading = false;
			state.error = null;
			state.success = true;
			state.message = "";
			state.data = state.data?.map((item) => {
				if (item.id === action.payload.id) {
					return action.payload;
				}
				return item;
			});
		},
		updateProductCategoryFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const {
	fetchCategoriesStart,
	fetchCategoriesSuccess,
	fetchCategoriesFailure,
	updateProductCategoryStart,
	updateProductCategorySuccess,
	updateProductCategoryFailure,
} = CategorySubSlice.actions;

export const CategorySubAction: IStoreAction<IPropertySubCategory[]> = {
	data: (state: RootState) => state.subCategories.data,
	loading: (state: RootState) => state.subCategories.loading,
	error: (state: RootState) => state.subCategories.error,
	errors: (state: RootState) => state.subCategories.errors,
	message: (state: RootState) => state.subCategories.message,
	success: (state: RootState) => state.subCategories.success,
};

export default CategorySubSlice.reducer;
