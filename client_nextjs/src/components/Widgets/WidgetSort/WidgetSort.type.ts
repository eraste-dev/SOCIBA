export interface ProductSortOptionProps {
	label: string;
	name: string;
	value: string;
	type?: "checkbox" | "radio";
	handleChange: any;
	icon?: JSX.Element;
}

export const sortIconSize: number = 25;
