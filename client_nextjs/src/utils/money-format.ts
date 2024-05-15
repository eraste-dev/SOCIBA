import numeral from "numeral";

export const _f = (price: number): string => {
	return numeral(price).format("0,0").replace(/,/g, " ") + " FCFA";
};
