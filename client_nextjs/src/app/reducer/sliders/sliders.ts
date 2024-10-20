import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { serverEndpoints } from "../../axios/api.route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "app/axios/api";
import { IServerResponse } from "app/axios/api.type";
import { AppDispatch, RootState } from "app/reducer/store";
import axios from "axios";
import { Debug } from "utils/debug.utils";

export interface Slider {
	id: string;
	image: string;
	title: string;
	place: "HOME" | "PRODUCT" | "MOVING";
	description: string;
}

const initialState: IStoreDataState<Slider[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const SliderSlice = createSlice({
	name: "sliders",
	initialState,
	reducers: {
		fetchSlidersStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchSlidersSuccess: (state, action: PayloadAction<Slider[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchSlidersFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},

		postSlidersStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		postSlidersSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		postSlidersFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.error = action.payload.error;
		},

		deleteSlidersStart: (state) => {
			state.loading = true;
			state.error = null;
			state.success = false;
			state.message = "";
		},

		deleteSlidersSuccess: (state, action: PayloadAction<IServerResponse>) => {
			state.loading = false;
			state.success = true;
			state.message = action.payload.message;
			state.data = undefined;
		},

		deleteSlidersFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
			state.loading = false;
			state.success = false;
			state.message = "";
			state.error = action.payload.error;
		},
	},
});

export const {
	fetchSlidersStart,
	fetchSlidersSuccess,
	fetchSlidersFailure,

	postSlidersStart,
	postSlidersSuccess,
	postSlidersFailure,

	deleteSlidersStart,
	deleteSlidersSuccess,
	deleteSlidersFailure,
} = SliderSlice.actions;

export const sliderAction: IStoreAction<Slider[]> = {
	data: (state: RootState) => state.sliders.data,
	loading: (state: RootState) => state.sliders.loading,
	error: (state: RootState) => state.sliders.error,
	errors: (state: RootState) => state.sliders.errors,
	message: (state: RootState) => state.sliders.message,
	success: (state: RootState) => state.sliders.success,
};

export default SliderSlice.reducer;
