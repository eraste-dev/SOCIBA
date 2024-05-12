import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import React, { FC } from "react";

export interface IPropertyType {
	id: number;
	name: string;
}

export const PROPERTY_TYPES: IPropertyType[] = [
	{ id: 1, name: "Vente" },
	{ id: 2, name: "Location" },
	{ id: 3, name: "Achat" },
	{ id: 4, name: "Autre" },
];

export interface SelectProductTypeProps {
	options: string[];
	onChangeOption: (item: string) => void;
	selected: string | null;
}

const SelectProductType: FC<SelectProductTypeProps> = ({ options, onChangeOption, selected }) => {
	const className = "cursor-pointer bg-gray-200 rounded-md p-2 m-2";
	const classNameSelected = "cursor-pointer bg-yellow-300 rounded-md p-2 m-2";

	return (
		<div className="flex flex-wrap justify-start">
			{options &&
				options.map((option) => (
					<div
						key={option}
						className={option.toString() === (selected ?? null) ? classNameSelected : className}
						onClick={() => onChangeOption(option.toString())}
					>
						{option}
					</div>
				))}
		</div>
	);
};

export default SelectProductType;
