import { AppDispatch } from "app/reducer/store";
import { axiosRequest } from "../api";
import { IServerResponse } from "../api.type";
import { serverEndpoints } from "../api.route";
import { fetchDefaultSettingsFailure, fetchDefaultSettingsSuccess } from "app/reducer/settings/settings.";
import { fetchALlTestimonalStart, fetchALlTestimonalSuccess, ITestimonial, postTestimonalFailure, postTestimonalStart, postTestimonalSuccess } from "app/reducer/testimonials/testimonial";

/**
 * Fetches all testimonials from the server and dispatches corresponding actions.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const fetchTestimonal = () => async (dispatch: AppDispatch) => {
    dispatch(fetchALlTestimonalStart());

    try {
        const response = await axiosRequest<IServerResponse>({
            ...serverEndpoints.public.testimonials.get(),
        });
        dispatch(fetchALlTestimonalSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchDefaultSettingsFailure(error.message));
    }
};

/**
 * Fetches all testimonials from the server and dispatches corresponding actions.
 *
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the function is complete.
 */
export const fetchAllTestimonal = () => async (dispatch: AppDispatch) => {
    dispatch(fetchALlTestimonalStart());

    try {
        const response = await axiosRequest<IServerResponse>({
            ...serverEndpoints.public.testimonials.getAll(),
        });
        dispatch(fetchALlTestimonalSuccess(response.data));
    } catch (error: any) {
        dispatch(fetchDefaultSettingsFailure(error.message));
    }
};


/**
 * Saves a testimonial to the server.
 *
 * @param {ITestimonial} payload - The testimonial data.
 * @param {AppDispatch} dispatch - The Redux dispatch function.
 * @return {Promise<void>} A Promise that resolves when the testimonial is saved successfully.
 */
export const saveTestimonial = (payload: ITestimonial) => async (dispatch: AppDispatch) => {
    dispatch(postTestimonalStart());

    try {
        const response = await axiosRequest<IServerResponse>({
            ...serverEndpoints.public.testimonials.post(payload),
        });
        dispatch(postTestimonalSuccess(response));
    } catch (error: any) {
        console.log(error);
        dispatch(postTestimonalFailure(error.message));
    }
};
