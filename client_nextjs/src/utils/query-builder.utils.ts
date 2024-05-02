export interface IGetQueryParams {
	[key: string]: string;
}

export interface IGetSearchPropertiesParams {
	id?: number;
	category?: number;
	categories?: number[];
	top?: boolean;
	orderBy?: "desc" | "asc";
	offset?: number;
	range?: { min: number; max: number };
	limit: number;
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
				query += `${key}=${value}&`;
			}
			query = query.slice(0, -1);
		}

		return query;
	}
}
