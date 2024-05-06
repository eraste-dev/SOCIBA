import React, { FC } from "react";
import Tag from "components/Tag/Tag";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { TaxonomyType } from "data/types";
import ProductSortOption from "./ProductSortOption";
import { FaArrowAltCircleUp, FaArrowDown, FaArrowUp, FaUserAlt, FaUserAltSlash } from "react-icons/fa";
import { sortIconSize } from "./WidgetSort.type";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/properties/propertiy";
import { setFilters } from "app/axios/api.action";

export interface WidgetSortProps {
	className?: string;
}

const WidgetSort: FC<WidgetSortProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800" }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(PropertyAction.data)?.filters;

	const handleChangeSortPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
		console.log(event.target.value);
		dispatch(
			setFilters({
				sort: event.target.value as "price_asc" | "price_desc",
			})
		);
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
			<WidgetHeading1 title="Trier" viewAll={{ label: "View all", href: "/#" }} />
			<div className="flex flex-wrap p-4 xl:p-5">
				{/* Option de tri par prix */}
				<ProductSortOption
					label="Prix croissant"
					name="filter_price"
					value="price_asc"
					type="radio"
					icon={<FaArrowDown size={sortIconSize} className="mr-2 text-neutral-500" />}
					handleChange={handleChangeSortPrice}
				/>
				<ProductSortOption
					label="Prix décroissant"
					name="filter_price"
					value="price_desc"
					type="radio"
					icon={<FaArrowUp size={sortIconSize} className="mr-2 text-neutral-500" />}
					handleChange={handleChangeSortPrice}
				/>
				<hr className="my-4 border-neutral-200 dark:border-neutral-700" />
				{/* Option de tri par type de publication */}
				<ProductSortOption
					label="Admin"
					value="admin"
					name="filter_type"
					handleChange={handleChangeSortType}
					icon={<FaUserAlt size={sortIconSize} className="mr-2 text-neutral-500" />}
				/>
				<ProductSortOption
					label="Membres"
					value="member"
					name="filter_type"
					handleChange={handleChangeSortType}
					icon={<FaUserAltSlash size={sortIconSize} className="mr-2 text-neutral-500" />}
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
