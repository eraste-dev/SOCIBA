import numeral from "numeral";

export const _f = (price: number): string => {
	// Formater le nombre en monnaie avec le symbole FCFA et les séparateurs de milliers
	return numeral(price).format("0,0").replace(/,/g, " ") + " FCFA";
};
