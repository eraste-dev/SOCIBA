import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { serverEndpoints } from "../../axios/api.route";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { axiosRequest } from "app/axios/api";
import { IServerResponse } from "app/axios/api.type";
import { AppDispatch, RootState } from "app/reducer/store";
import axios from "axios";
import { Debug } from "utils/debug.utils";

interface Slider {
	id: string;
	image: string;
	title: string;
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
	},
});

export const { fetchSlidersStart, fetchSlidersSuccess, fetchSlidersFailure } = SliderSlice.actions;

export const sliderAction: IStoreAction<Slider[]> = {
	data: (state: RootState) => state.sliders.data,
	loading: (state: RootState) => state.sliders.loading,
	error: (state: RootState) => state.sliders.error,
	errors: (state: RootState) => state.sliders.errors,
	message: (state: RootState) => state.sliders.message,
	success: (state: RootState) => state.sliders.success,
};

export default SliderSlice.reducer;
