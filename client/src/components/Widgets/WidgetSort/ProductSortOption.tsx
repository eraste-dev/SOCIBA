import React, { FC } from "react";
import { ProductSortOptionProps } from "./WidgetSort.type";

const ProductSortOption: FC<ProductSortOptionProps> = ({ label, name, value, type = "checkbox", handleChange, icon }) => {
	return (
		<div className="flex items-center mr-4 mb-2 justify-between w-full">
			<div className="flex items-center mr-2">
				{/* {icon && icon} */}
				<input type={type} id={value} name={name} value={value} onChange={handleChange} className="mr-2" />
				<label htmlFor={value}>{label}</label>
			</div>
		</div>
	);
};

export default ProductSortOption;
