import { IProduct } from "app/reducer/products/product";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import React, { FC, useEffect } from "react";

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
	const className = "cursor-pointer bg-gray-200 rounded-md p-2 m-2 dark:bg-neutral-800";
	const classNameSelected =
		"cursor-pointer bg-primary-800 text-white rounded-md p-2 m-2 dark:bg-primary-800 dark:text-white";

	const noneSelection = () => {
		if (options.filter((option) => option === selected).length === 0) {
			onChangeOption(options[0]);
		}
	};

	const selectClassName = (option: string): string => {
		return option.toString() === selected ? classNameSelected : className;
	};

	useEffect(() => {
		if (selected === null) {
			noneSelection();
		}
	}, [options, selected]);

	return (
		<div className="flex flex-wrap justify-start">
			{options &&
				options.map((option) => (
					<div
						key={option}
						className={selectClassName(option.toString())}
						onClick={() => onChangeOption(option.toString())}
					>
						{option}
					</div>
				))}
		</div>
	);
};

export default SelectProductType;
