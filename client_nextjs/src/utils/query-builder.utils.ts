import { IPropertyFilter, SORT_TYPE } from "app/reducer/products/product";
import { PROD_URL } from "./utils";

export interface IGetQueryParams {
	[key: string]: string;
}

export interface IGetSearchPropertiesParams {
	id?: number | string;
	slug?: string;
	category?: number;
	categories?: number[];
	top?: boolean;
	orderBy?: SORT_TYPE;
	price_sort?: SORT_TYPE;
	deposit_price_sort?: SORT_TYPE;
	offset?: number;
	range?: { min: number; max: number };
	limit?: number;
	location?: number | string;
	locations?: string;
	created_by?: number;
	path?: string;
}

export class QueryBuilder {
	public static buildGetQuery(params: IGetQueryParams): string {
		const queries: IGetQueryParams = params;
		let query: string = "";

		if (Object.keys(queries).length > 0) {
			query = "?";
			for (const [key, value] of Object.entries(queries)) {
				query += `${key}=${value}&`;
			}
			query = query.slice(0, -1);
		}

		return query;
	}

	public static searchProperties(params: IGetSearchPropertiesParams): string {
		const queries: IGetSearchPropertiesParams = params;
		let query: string = "";

		if (Object.keys(queries).length > 0) {
			query = "?";
			for (const [key, value] of Object.entries(queries)) {
				if (Array.isArray(value)) {
					for (const item of value) {
						query += `${key}=${item}&`;
					}
				} else if (typeof value === "object") {
					for (const [subKey, subValue] of Object.entries(value)) {
						query += `${subKey}=${subValue}&`;
					}
				} else {
					query += `${key}=${value}&`;
				}
			}
			query = query.slice(0, -1);
		}

		return query;
	}
}

export const getFiltersFromIPropertyFilter = (filter: IPropertyFilter) => {
	const query: IGetSearchPropertiesParams = {};

	if (filter && filter.sort) {
		query.orderBy = filter.sort === "price_asc" ? "asc" : "desc";
	}

	if (filter && filter.price_range) {
		query.range = filter.price_range;
	}

	return query;
};

export const searchParamsFromURL = () => {
	const urlParams = new URLSearchParams(window.location.search);
	console.log(urlParams, "searchParamsFromURL()");

	const params: IGetSearchPropertiesParams = {};

	if (urlParams.has("id")) {
		params.id = urlParams.get("id") ?? "*";
	}

	if (urlParams.has("slug")) {
		params.slug = urlParams.get("slug") ?? "*";
	}

	if (urlParams.has("category")) {
		params.category = parseInt(urlParams.get("category") as string, 10);
	}

	// TODO : fix
	// if (urlParams.has("categories")) {
	// 	params.categories = urlParams
	// 		.get("categories")
	// 		.split(",")
	// 		.map((category) => parseInt(category, 10));
	// }

	if (urlParams.has("top")) {
		params.top = urlParams.get("top") === "true";
	}

	if (urlParams.has("orderBy")) {
		params.orderBy = urlParams.get("orderBy") as "desc" | "asc";
	}

	if (urlParams.has("offset")) {
		params.offset = parseInt(urlParams.get("offset") as string, 10);
	}

	if (urlParams.has("range")) {
		const range = urlParams.get("range")?.split("-");
		if (range) {
			params.range = { min: parseInt(range[0], 10), max: parseInt(range[1], 10) };
		}
	}

	if (urlParams.has("limit")) {
		params.limit = parseInt(urlParams.get("limit") as string, 10);
	}

	if (urlParams.has("location")) {
		params.location = urlParams.get("location") ?? "*";
	}

	if (urlParams.has("created_by")) {
		params.created_by = parseInt(urlParams.get("created_by") as string, 10);
	}

	if (urlParams.has("path")) {
		params.path = urlParams.get("path") ?? PROD_URL;
	}

	return params;
};

export const searchParamsFromRedux = (filter: IPropertyFilter) => {
	const params: IGetSearchPropertiesParams = {};

	if (filter && filter.id) {
		params.id = filter.id;
	}

	if (filter && filter.slug) {
		params.slug = filter.slug;
	}

	if (filter && filter.category) {
		params.category = filter.category;
	}

	if (filter && filter.categories) {
		params.categories = filter.categories.map((category) => category);
	}

	if (filter && filter.top) {
		params.top = filter.top;
	}

	if (filter && filter.order_by) {
		params.orderBy = filter.order_by;
	}

	if (filter && filter.price_sort) {
		params.price_sort = filter.price_sort;
	}

	if (filter && filter.deposit_price_sort) {
		params.price_sort = filter.deposit_price_sort;
	}

	if (filter && filter.offset) {
		params.offset = filter.offset;
	}

	if (filter && filter.price_range) {
		params.range = { min: filter.price_range.min, max: filter.price_range.max };
	}

	if (filter && filter.limit) {
		params.limit = filter.limit;
	}

	if (filter && filter.location) {
		params.location = filter.location;
	}

	if (filter && filter.locations) {
		params.locations = filter.locations.join(',');
	}

	if (filter && filter.created_by) {
		params.created_by = filter.created_by;
	}

	// if (urlParams.has("path")) {
	// 	params.path = urlParams.get("path") ?? PROD_URL;
	// }

	return params;
};
