import { fetchCategories, setFilters } from "app/axios/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/propertiy";
import propertiyCategory, { CategoryAction } from "app/reducer/products/propertiy-category";
import CardCategory1 from "components/Card/CardCategory1/CardCategory1";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { TaxonomyType } from "data/types";
import React, { FC, useEffect, useState } from "react";
import { APP_ROUTE, route } from "routers/route";
import ProductSortOption from "../WidgetSort/ProductSortOption";
import { FaAnchor, FaArrowCircleRight, FaPlusCircle, FaTable, FaTabletAlt } from "react-icons/fa";
import { sortIconSize } from "../WidgetSort/WidgetSort.type";

export interface WidgetCategoriesProps {
	className?: string;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800" }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const categories = useAppSelector(CategoryAction.data);
	const loading = useAppSelector(CategoryAction.loading);
	const [categoriesSelect, setCategoriesSelect] = useState([]);
	const [searchCategory, setSearchCategory] = useState("");

	const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
		// setCategoriesSelect(event.target.value);
		dispatch(setFilters({ categories: categoriesSelect }));
	};

	useEffect(() => {
		if (!categories && !loading) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, categories, loading]);

	return (
		<div
			className="max-h-300px overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
			style={{ maxHeight: "300px", height: "300px", overflow: "auto" }}
		>
			<div className={`nc-WidgetCategories rounded-3xl  overflow-hidden ${className}`} data-nc-id="WidgetCategories">
				<WidgetHeading1 title="Catégories" />
				<div className="flow-root">
					{categories && categories.length > 10 && (
						<div className="py-2">
							<input
								type="text"
								className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full"
								value={searchCategory}
								placeholder="Filtrer la liste"
								onChange={(e) => setSearchCategory(e.target.value)}
							/>
						</div>
					)}
					<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 pl-2">
						{categories &&
							categories
								.filter((category) => category.name.toLowerCase().includes(searchCategory.toLowerCase()))
								.map((category) => (
									<ProductSortOption
										key={category.id}
										label={category.name}
										name="categories"
										value={`${category.id}`}
										type="checkbox"
										icon={<FaPlusCircle size={18} className="mr-2 text-neutral-500" />}
										handleChange={handleChangeCategory}
									/>
								))}

						{/* <CardCategory1 className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700" key={category.id} category={category} size="normal" /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WidgetCategories;
