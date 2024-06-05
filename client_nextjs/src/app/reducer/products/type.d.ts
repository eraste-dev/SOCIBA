export interface IPaginationAllLinks {
	url: string | null;
	label: string;
	active: boolean;
}

export interface IPaginationLinks {
	first: string;
	last: string;
	prev: string | null;
	next: string | null;
}

export interface IPaginationMeta {
	currentPage: number;
	from: number;
	lastPage: number;
	path: string;
	perPage: number;
	to: number;
	total: number;
}

export interface IPagination {
	meta: IPaginationMeta;
	links: IPaginationLinks;
	all_links: IPaginationAllLinks[];
}
