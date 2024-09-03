import { FC, useEffect } from "react";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { SORT_TYPE } from "app/reducer/products/product";
import { fetchCategories, setFilters } from "app/axios/actions/api.action";
import { route } from "routers/route";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "./ListBoxSelectFilter";
import { useSelector } from "react-redux";
import { CategoryAction, IPropertyCategory } from "app/reducer/products/propertiy-category";

export interface WidgetCategoryBookingProps {
	className?: string;
	handleFetch?: () => void;
	groupFilter?: boolean;
}

const WidgetCategoryBooking: FC<WidgetCategoryBookingProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
	groupFilter = false,
}) => {
	const dispatch = useAppDispatch();

	const categories = useAppSelector(CategoryAction.data);
	const categoriesLoading = useAppSelector(CategoryAction.loading);

	const flatCategories = () => {
		let data: IPropertyCategory[] = [];

		categories?.forEach((category) => {
			data.push(category);
			if (category.children) {
				category.children.forEach((child) => {
					data.push(child);
				});
			}
		});

		return data;
	};

	/**
	 * A function to handle the change of category.
	 *
	 * @param {IListBoxSelectFilterWidget} item - The selected item from the list box.
	 * @return {void} No return value.
	 */
	const handleChangeCategory = (item: IListBoxSelectFilterWidget): void => {
		const category = flatCategories()?.find((category) => category.slug === item.value);
		console.log("handleChangeCategory", flatCategories());
		console.log("handleChangeCategory", item, category);
		if (!category) return;
		updateParamsUrl("category_slug", item.value);
		// updateParamsUrl("category", item.value);
		dispatch(setFilters({ category: category.id }));
		handleFetch && handleFetch();
	};

	/**
	 * A function that generates a list of IListBoxSelectFilterWidget items based on the categories array.
	 *
	 * @return {IListBoxSelectFilterWidget[]} The list of IListBoxSelectFilterWidget items
	 */
	function CATEGORIES(): IListBoxSelectFilterWidget[] {
		let data: IListBoxSelectFilterWidget[] = [
			{ name: "Tous(*)", value: "*" },
			{ name: "Residence", value: "residence" },
			{ name: "Hôtel", value: "hotel" },
			{ name: "Maison", value: "maison" },
			{ name: "Bureau", value: "bureau" },
			{ name: "Magasin", value: "magasin" },
			{ name: "Enrepôt", value: "entrepot" },
			{ name: "Terrain", value: "terrain" },
		];

		// if (categories && categories.length > 0) {
		// 	categories.forEach((category) => {
		// 		data.push({ name: category.name, value: category.id.toString(), selected: false });
		// 		if (category && category.children && category.children.length > 0) {
		// 			category.children.forEach((child) => {
		// 				data.push({
		// 					name: ">>>>>" + child.name,
		// 					value: child.id.toString(),
		// 					selected: false,
		// 				});
		// 			});
		// 		}
		// 	});
		// }

		return data;
	}

	// FETCH_CATEGORIES
	useEffect(() => {
		if (!categories && !categoriesLoading) {
			dispatch(fetchCategories());
		}
	}, [dispatch, fetchCategories, categories, categoriesLoading]);

	return (
		<div
			className={
				!groupFilter
					? `nc-WidgetCategoryBooking rounded-3xl overflow-hidden ${className}`
					: ""
			}
			data-nc-id="WidgetCategoryBooking"
		>
			{!groupFilter && (
				<WidgetHeading1 title="Trier" viewAll={{ label: "", href: route("annonces") }} />
			)}
			<div className={!groupFilter ? `flex flex-wrap p-4 xl:p-5` : "flex flex-wrap"}>
				<ListBoxSelectFilter
					onChange={handleChangeCategory}
					options={CATEGORIES()}
					label="Vous recherchez ?"
					labelID="category-booking"
				/>
			</div>
		</div>
	);
};

export default WidgetCategoryBooking;
