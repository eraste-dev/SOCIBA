import numeral from "numeral";

export const _f = (price: number): string => {
	return numeral(price).format("0,0").replace(/,/g, " ") + " F";
};

export const _suffix = () => {
	return " / mois";
};
