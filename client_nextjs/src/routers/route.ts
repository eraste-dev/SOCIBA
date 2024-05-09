export interface IAppRoute {
	key: string;
	value: string;
}

export const APP_ROUTE: IAppRoute[] = [
	{ key: "home", value: "/" },

	{ key: "annonces", value: "/annonces" },
	{ key: "annonce", value: "/annonce" },
	{ key: "categories", value: "/categories" },

	{ key: "dashboard", value: "/dashboard" },
	{ key: "add_post", value: "/add-post" },

	{ key: "cart", value: "/cart" },

	{ key: "login", value: "/login" },
	{ key: "signup", value: "/signup" },
];

export type IAppRouteKey = "home" | "annonces" | "annonce" | "categories" | "cart" | "dashboard" | "login" | "signup" | "add_post";
export function route(key: IAppRouteKey, slug?: string): string {
	let output: string = "";

	const route = APP_ROUTE.find((route) => route.key === key);
	output = route ? route.value : "home";

	return slug ? `${output}/${slug}` : output;
}
