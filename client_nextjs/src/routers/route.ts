export interface IAppRoute {
	key: string;
	value: string;
}

export const APP_ROUTE: IAppRoute[] = [
	{ key: "home", value: "/" },
	{ key: "annonces", value: "/annonces" },
	{ key: "annonce", value: "/annonce" },
	{ key: "categories", value: "/categories" },
	{ key: "cart", value: "/cart" },
];

export type IAppRouteKey = "home" | "annonces" | "annonce" | "categories" | "cart";
export function route(key: IAppRouteKey, slug?: string): string {
	let output: string = "";

	const route = APP_ROUTE.find((route) => route.key === key);
	output = route ? route.value : "home";

	return slug ? `${output}/${slug}` : output;
}
