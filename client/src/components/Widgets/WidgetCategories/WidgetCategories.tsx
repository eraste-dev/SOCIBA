import { fetchCategories, setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect, useState } from "react";
import ProductSortOption from "../WidgetSort/ProductSortOption";
import { FaArrowCircleRight, FaPlusCircle } from "react-icons/fa";
import { PropertyAction } from "app/reducer/products/product";

export interface WidgetCategoriesProps {
	className?: string;
	handleFetch?: () => void;
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800", handleFetch }) => {
	const dispatch = useAppDispatch();

	const categories = useAppSelector(CategoryAction.data);
	const loading = useAppSelector(CategoryAction.loading);
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const [searchCategory, setSearchCategory] = useState("");

	const handleChangeCategory = (item: IPropertyCategory) => {
		console.log(item, "cats in handleChangeCategory");

		let cats = filters?.categories || [];

		if (cats.includes(item.id)) {
			cats = cats.filter((cat) => cat !== item.id);
		} else {
			cats.push(item.id);
		}
		console.log(cats, filters, "cats in handleChangeCategory #2");
		filters && dispatch(setFilters({ ...filters, categories: cats }));
		handleFetch && handleFetch();
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
			<div className={`nc-WidgetCategories rounded-3xl overflow-hidden ${className}`} data-nc-id="WidgetCategories">
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
					<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
						{categories &&
							categories
								.filter((category) => category.name.toLowerCase().includes(searchCategory.toLowerCase()))
								.map((category) => (
									<div key={category.id}>
										{false && (
											<ProductSortOption
												label={category.name}
												name="categories"
												value={`${category.id}`}
												type="checkbox"
												icon={<FaPlusCircle size={18} className="mr-2 text-neutral-500" />}
												handleChange={() => handleChangeCategory(category)}
											/>
										)}
										{category.children && (
											<div className="pl-2">
												{category.children.map((child) => (
													<ProductSortOption
														key={child.id}
														label={child.name}
														name="categories"
														value={`${child.id}`}
														type="checkbox"
														icon={<FaArrowCircleRight size={18} className="mr-2 text-neutral-500" />}
														handleChange={() => handleChangeCategory(child)}
													/>
												))}
											</div>
										)}
									</div>
								))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WidgetCategories;
