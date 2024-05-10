import { IPropertyCategory } from "app/properties/propertiy-category";
import React, { FC } from "react";

export interface SelectProductTypeProps {
	options: IPropertyCategory[];
	onChangeOption: (cat: IPropertyCategory) => void;
	selected: number | null;
}

const SelectProductType: FC<SelectProductTypeProps> = ({ options, onChangeOption, selected }) => {
	const className = "bg-gray-200 rounded-md p-2 m-2";
	const classNameSelected = "bg-yellow-300 rounded-md p-2 m-2";

	console.log({ selected, options }, "SelectProductType");

	return (
		<div className="flex flex-wrap justify-start">
			{options &&
				options.map((option) => (
					<div
						key={option.id}
						// className={option.id === (selected?.id ?? null) ? classNameSelected : className}
						className={className}
						onClick={() => onChangeOption(option)}
					>
						{option.name}
					</div>
				))}
		</div>
	);
};

export default SelectProductType;
