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

export const SIMPLIFY_LIST_CAT = [
	{ name: "Tous(*)", value: "*" },
	{
		name: "Residence",
		value: "residence",
		uuid: ["RESERVATION__RéSIDENCE_"],
	},
	{ name: "Hôtel", value: "hotel", uuid: ["RESERVATION__HôTEL"] },
	{ name: "Maison", value: "maison" },
	{ name: "Bureau", value: "bureau" },
	{ name: "Magasin", value: "location-magasin" },
	{ name: "Entrepôt", value: "entrepot" },
	{ name: "Terrain", value: "terrain" },
];

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
	const urlSearchParams = new URLSearchParams(window.location.search);
	const category_uuid = urlSearchParams.get("category_uuid");
	const category_slug = urlSearchParams.get("category_slug");
	const category_slug_selected = urlSearchParams.get("category_slug_selected");

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
		let id: number | "*" = "*";
		const value: string = item.value;

		if (item.value === "*") {
		} else {
			const category = flatCategories()?.find((category) => category.slug === item.value);
			if (!category) return;
			console.log("handleChangeCategory", flatCategories());
			console.log("handleChangeCategory", item, category);
			id = category.id;
		}
		updateParamsUrl("category_slug", value);
		updateParamsUrl("category_slug_selected", value);
		// updateParamsUrl("category", item.value);
		dispatch(setFilters({ category: id }));
		handleFetch && handleFetch();
	};

	/**
	 * A function that generates a list of IListBoxSelectFilterWidget items based on the categories array.
	 *
	 * @return {IListBoxSelectFilterWidget[]} The list of IListBoxSelectFilterWidget items
	 */
	function CATEGORIES(): IListBoxSelectFilterWidget[] {
		let data: IListBoxSelectFilterWidget[] = SIMPLIFY_LIST_CAT;

		console.log("categories", category_uuid, data);
		// http://localhost:3000/annonces/?type=LOCATION&category_uuid=LOCATION__MAISON
		// http://localhost:3000/?category_slug=residence&category_slug_selected=residence

		data = data.map((item) => {
			item.selected = item.value === category_slug;
			return item;
		});

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
