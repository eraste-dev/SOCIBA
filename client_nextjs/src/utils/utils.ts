export function isAdminPage___() {
	const currentUrl = window.location.href;
	console.log(currentUrl);
	// return currentUrl.startsWith(`${window.location.origin}/dashboard`);
	// return currentUrl.includes("/dashboard");
	return false;
}

export const updateParamsUrl = (search: string, value: string) => {
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
