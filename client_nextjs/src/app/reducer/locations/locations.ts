import { IStoreAction, IStoreDataState } from "../../axios/api.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "app/store";

export interface ICity {
	name: string;
	slug: string;
	iso3: string | null;
	iso2: string | null;
	description: string | null;
	country: ICountry | null;
	lat: number | null;
	long: number | null;
	thumbnail: string | null;
	updated_at: string;
}

export interface ICountry {
	id: number;
	name: string;
	iso3: string | null;
	iso2: string | null;
	phone_code: string | null;
	capital: string | null;
	currency: string | null;
	currency_name: string | null;
	currency_symbol: string | null;
	timezones: string | null;
	translations: string | null;
	lat: number | null;
	long: number | null;
	created_at: string;
	updated_at: string;
}

export interface Location {
	id: number;
	name: string;
	href: string;
	city: ICity | null;
	iso3: string | null;
	iso2: string | null;
	description: string | null;
	lat: number | null;
	long: number | null;
	thumbnail: string | null;
	updated_at: string | null;
}

const initialState: IStoreDataState<Location[] | undefined> = {
	data: undefined,
	success: false,
	message: "",
	loading: false,
	error: null,
};

export const LocationSlice = createSlice({
	name: "locations",
	initialState,
	reducers: {
		fetchLocationsStart: (state) => {
			state.loading = true;
			state.error = null;
			state.data = [];
			state.success = false;
			state.message = "";
		},
		fetchLocationsSuccess: (state, action: PayloadAction<Location[]>) => {
			state.loading = false;
			state.error = null;
			state.data = action.payload;
		},
		fetchLocationsFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
	},
});

export const { fetchLocationsStart, fetchLocationsSuccess, fetchLocationsFailure } = LocationSlice.actions;

export const LocationAction: IStoreAction<Location[]> = {
	data: (state: RootState) => state.locations.data,
	loading: (state: RootState) => state.locations.loading,
	error: (state: RootState) => state.locations.error,
	errors: (state: RootState) => state.locations.errors,
	message: (state: RootState) => state.locations.message,
	success: (state: RootState) => state.locations.success,
};

export default LocationSlice.reducer;
