import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect } from "react";
import { IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "../WidgetSort/ListBoxSelectFilter";
import {
	SUB_HOTEL_DETAIL,
	SUB_MAISON_DETAIL,
	SUB_MAISON_ONE_DETAIL,
} from "containers/PageDashboard/Posts/DashboardSubmitPost";

export interface WidgetCategoryDetailWithSelectProps {
	className?: string;
	handleFetch?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter?: any;
	groupFilter?: boolean;
}

const WidgetCategoryDetailWithSelect: FC<WidgetCategoryDetailWithSelectProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
	useStateFilter,
	setUseStateFilter,
	groupFilter,
}) => {
	const dispatch = useAppDispatch();

	const filters = useAppSelector(PropertyAction.data)?.filters;

	function OPTIONS(): IListBoxSelectFilterWidget[] {
		const urlSearchParams = new URLSearchParams(window.location.search);
		const categorySlugSelected = urlSearchParams.get("category_slug_selected");

		let data: IListBoxSelectFilterWidget[] = [
			{
				name: "Tous(*)",
				value: "*",
				selected: false,
			},
		];

		if (categorySlugSelected && categorySlugSelected === "residence") {
			if (SUB_MAISON_DETAIL && SUB_MAISON_DETAIL.length > 0) {
				SUB_MAISON_DETAIL.forEach((item) => {
					data.push({
						name: item.name,
						value: item.name.toString(),
						selected: false, // TODO : set the right value
					});
				});
			}
		}

		if (categorySlugSelected && categorySlugSelected === "hotel") {
			if (SUB_HOTEL_DETAIL && SUB_HOTEL_DETAIL.length > 0) {
				SUB_HOTEL_DETAIL.forEach((item) => {
					data.push({
						name: item.name,
						value: item.name.toString(),
						selected: false, // TODO : set the right value
					});
				});
			}
		}

		if (categorySlugSelected && categorySlugSelected === "maison") {
			if (SUB_MAISON_ONE_DETAIL && SUB_MAISON_ONE_DETAIL.length > 0) {
				SUB_MAISON_ONE_DETAIL.forEach((location) => {
					data.push({
						name: location.name,
						value: location.name.toString(),
						selected: false, // TODO : set the right value
					});
				});
			}
		}

		return data;
	}

	const handleChange = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("home_type", item.value);
		// dispatch(setFilters({ location: item.value }));
		setUseStateFilter && setUseStateFilter({ ...useStateFilter, location: item.value });
		handleFetch && handleFetch();
	};

	return (
		<div
			className={!groupFilter ? `${className}` : ""}
			// style={{ maxHeight: "300px", height: "300px", overflow: "auto" }}
		>
			<div
				className={
					!groupFilter
						? `nc-WidgetLocations rounded-3xl overflow-hidden ${className}`
						: "flex flex-wrap"
				}
				data-nc-id="WidgetLocations"
			>
				{!groupFilter && <WidgetHeading1 title="Type de maison" />}
				<div className="w-full">
					<ListBoxSelectFilter
						onChange={handleChange}
						options={OPTIONS()}
						label="Détail"
						labelID="home_type"
					/>
				</div>
			</div>
		</div>
	);
};

export default WidgetCategoryDetailWithSelect;
