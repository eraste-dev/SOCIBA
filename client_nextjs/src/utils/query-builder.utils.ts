import { IPropertyFilter } from "app/reducer/products/propertiy";

export interface IGetQueryParams {
	[key: string]: string;
}

export interface IGetSearchPropertiesParams {
	id?: number | string;
	slug?: string;
	category?: number;
	categories?: number[];
	top?: boolean;
	orderBy?: "desc" | "asc";
	offset?: number;
	range?: { min: number; max: number };
	limit?: number;
	location?: number | string;
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
