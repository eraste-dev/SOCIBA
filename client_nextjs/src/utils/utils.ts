import { EMPTY_LOCATION, EMPTY_PRODUCT } from "app/axios/api.type";
import { ILocation } from "app/reducer/locations/locations";
import { route } from "routers/route";

export function isAdminPage___() {
	const currentUrl = window.location.href;
	console.log(currentUrl);
	// return currentUrl.startsWith(`${window.location.origin}/dashboard`);
	// return currentUrl.includes("/dashboard");
	return false;
}

export const updateParamsUrl = (search: string, value?: string) => {
	const urlSearchParams = new URLSearchParams(window.location.search);

	if (value) {
		urlSearchParams.set(search, value);
	} else {
		urlSearchParams.delete(search);
	}

	// Met à jour l'URL avec les nouveaux paramètres
	const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
	window.history.replaceState(null, "", newUrl);
};

export const PROD_URL = "https://api.eebtp-ci.com";

/**
 * Formats a given price by adding spaces as thousand separators.
 *
 * @param {number | null | undefined} price - The price to be formatted
 * @return {string} The formatted price as a string
 */
export const formatPrice = (price: number | null | undefined): string => {
	if (price === null || price === undefined) return "";
	if (typeof price !== "number")
		throw new TypeError(`Expected a number but received ${typeof price}`);
	return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getAccessibilityText = (text: string): string => {
	let label = "";

	if (text === "NOT_FAR_FROM_THE_TAR") {
		label = "Non loin du goudron";
	}
	return label;
};

export const getSecurityLabel = (text: string): string => {
	let label = "";

	switch (text) {
		case "WITH_GUARD":
			return "Avec virgile";

		case "WITHOUT_GUARD":
		default:
			return "Sans virgile";
	}
};

export const buildLocationItem = (name_: string, unlisted_: boolean = true): ILocation => {
	const href: string = route("annonces") + "?unlisted_location=" + true;
	let location: ILocation = { ...EMPTY_LOCATION, name: name_, unlisted: unlisted_, href: href };

	// ? /annonces/?location=yopougon&location_id=6

	console.log(">>> location :: ", location);
	return location;
};
