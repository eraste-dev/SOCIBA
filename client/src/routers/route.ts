export interface IAppRoute {
	key: string;
	value: string;
}

export const APP_ROUTE: IAppRoute[] = [
	{ key: "home", value: "/" },

	{ key: "annonces", value: "/annonces" },
	{ key: "annonce", value: "/annonce" },
	{ key: "categories", value: "/categories" },

	{ key: "dashboard", value: "/dashboard/posts" },
	{ key: "edit_profile", value: "/dashboard/edit-profile" },
	{ key: "posts", value: "/dashboard/posts" },
	{ key: "user_post", value: "/user/posts" },
	{ key: "add_post", value: "/dashboard/submit-post" },

	{ key: "cart", value: "/cart" },

	{ key: "login", value: "/login" },
	{ key: "signup", value: "/signup" },

	{ key: "about", value: "/about" },
	{ key: "cgu", value: "/condition-generale-d-utilisation" },
	{ key: "pgv", value: "/politique-generale-de-vente" },
	{ key: "pc", value: "/politique-de-confidentialite" },
	{ key: "rd", value: "/regle-de-diffusion" },
];

export type IAppRouteKey =
	| "home"
	| "annonces"
	| "annonce"
	| "categories"
	| "cart"
	| "dashboard"
	| "login"
	| "signup"
	| "add_post"
	| "edit_profile"
	| "posts"
	| "user_post"
	| "about"
	| "cgu"
	| "pgv"
	| "pc"
	| "rd";
export function route(key: IAppRouteKey, slug?: string): string {
	let output: string = "";

	const route = APP_ROUTE.find((route) => route.key === key);
	output = route ? route.value : "home";

	return slug ? `${output}/${slug}` : output;
}
