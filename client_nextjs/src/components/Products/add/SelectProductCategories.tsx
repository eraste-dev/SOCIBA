import { IPropertyCategory } from "app/properties/propertiy-category";
import React, { FC } from "react";

export interface SelectProductCategoriesProps {
	options: IPropertyCategory[];
	onChangeOption: (cat: IPropertyCategory) => void;
	selected: number | null;
}

const SelectProductCategories: FC<SelectProductCategoriesProps> = ({ options, onChangeOption, selected }) => {
	const className = "cursor-pointer bg-gray-200 rounded-md p-2 m-2";
	const classNameSelected = "cursor-pointer bg-yellow-300 rounded-md p-2 m-2";

	if (!options || options.length === 0) {
		return <p className="p-2 italic text-neutral-400 mt-5">Selectionner une catégorie</p>;
	}

	return (
		<div className="flex flex-wrap justify-start">
			{options &&
				options.map((option) => (
					<div key={option.id} className={option.id === (selected ?? null) ? classNameSelected : className} onClick={() => onChangeOption(option)}>
						{option.name}
					</div>
				))}
		</div>
	);
};

export default SelectProductCategories;
