import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IServerResponse } from "app/axios/api.type";
import { RootState } from "app/reducer/store";
import { IUser } from "../auth/auth";

export interface ITestimonial {
    id: number;
    user_id: number;
    message: string;
    validated: boolean;
    user: IUser | null;
    created_at: string;
    updated_at: string;
}

const initialState: IStoreDataState<ITestimonial[] | undefined> = {
    data: undefined,
    success: false,
    message: "",
    loading: false,
    error: null,
};

export const TestimonalSlice = createSlice({
    name: "testimonials",
    initialState,
    reducers: {
        fetchALlTestimonalStart: (state) => {
            state.loading = true;
            state.error = null;
            state.data = [];
            state.success = false;
            state.message = "";
        },
        fetchALlTestimonalSuccess: (state, action: PayloadAction<ITestimonial[]>) => {
            state.loading = false;
            state.error = null;
            state.data = action.payload;
        },
        fetchALlTestimonalFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },

        postTestimonalStart: (state) => {
            state.loading = true;
            state.error = null;
            state.success = false;
            state.message = "";
        },

        postTestimonalSuccess: (state, action: PayloadAction<IServerResponse>) => {
            state.loading = false;
            state.success = true;
            state.message = action.payload.message;
            state.data = undefined;
        },

        postTestimonalFailure: (state, action: PayloadAction<{ error: string; errors: any }>) => {
            state.loading = false;
            state.success = false;
            state.message = "";
            state.error = action.payload.error;
        },
    },
});

export const {
    fetchALlTestimonalStart,
    fetchALlTestimonalSuccess,
    fetchALlTestimonalFailure,

    postTestimonalStart,
    postTestimonalSuccess,
    postTestimonalFailure,
} = TestimonalSlice.actions;

export const TestimonalAction: IStoreAction<ITestimonial[]> = {
    data: (state: RootState) => state.testimonials.data,
    loading: (state: RootState) => state.testimonials.loading,
    error: (state: RootState) => state.testimonials.error,
    errors: (state: RootState) => state.testimonials.errors,
    message: (state: RootState) => state.testimonials.message,
    success: (state: RootState) => state.testimonials.success,
};

export default TestimonalSlice.reducer;
