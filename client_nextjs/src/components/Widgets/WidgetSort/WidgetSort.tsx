import React, { FC, useState } from "react";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import ProductSortOption from "./ProductSortOption";
import { FaArrowDown, FaArrowUp, FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { sortIconSize } from "./WidgetSort.type";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/propertiy";
import { fetchAllProperties, setFilters } from "app/axios/api.action";
import { route } from "routers/route";
import { IGetSearchPropertiesParams, getFiltersFromIPropertyFilter } from "utils/query-builder.utils";

export interface WidgetSortProps {
	className?: string;
	handleFetch?: () => void;
}

const WidgetSort: FC<WidgetSortProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800", handleFetch }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(PropertyAction.data)?.filters;

	const handleChangeSortPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		// console.log(event.target.value);
		dispatch(setFilters({ sort: event.target.value as "price_asc" | "price_desc" }));
		handleFetch && handleFetch();
	};

	const handleChangeSortType = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		dispatch(
			setFilters({
				posted_by: event.target.value as "admin" | number[],
			})
		);
	};

	return (
		<div className={`nc-WidgetSort rounded-3xl overflow-hidden ${className}`} data-nc-id="WidgetSort">
			<WidgetHeading1 title="Trier" viewAll={{ label: "View all", href: route("annonces") }} />
			<div className="flex flex-wrap p-4 xl:p-5">
				{/* Option de tri par prix */}
				<ProductSortOption
					label="Prix"
					name="filter_price"
					value="price_asc"
					type="radio"
					icon={<FaArrowDown size={sortIconSize} className="mr-2 text-neutral-500" />}
					handleChange={handleChangeSortPrice}
				/>
				<ProductSortOption
					label="Prix"
					name="filter_price"
					value="price_desc"
					type="radio"
					icon={<FaArrowUp size={sortIconSize} className="mr-2 text-neutral-500" />}
					handleChange={handleChangeSortPrice}
				/>
				{/* <ProductSortOption
					label="Top"
					value="top"
					name="filter_top"
					handleChange={handleChangeTop}
					icon={<FaArrowAltCircleUp size={sortIconSize} className="mr-2 bg-red-600 text-white rounded-full p-0.5" />}
				/> */}
			</div>
		</div>
	);
};

export default WidgetSort;
