import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect } from "react";
import ProductSortOption from "../WidgetSort/ProductSortOption";
import { FaPlusCircle } from "react-icons/fa";
import { IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "../WidgetSort/ListBoxSelectFilter";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import { PRODUCT_TYPE } from "containers/PageDashboard/DashboardSubmitPost";

export interface WidgetTypeWithSelectProps {
	className?: string;
	handleFetch?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter?: any;
	groupFilter?: boolean;
}

const WidgetTypeWithSelect: FC<WidgetTypeWithSelectProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
	useStateFilter,
	setUseStateFilter,
	groupFilter,
}) => {
	const dispatch = useAppDispatch();

	const locations = useAppSelector(LocationAction.data);
	const loading = useAppSelector(LocationAction.loading);
	const filters = useAppSelector(PropertyAction.data)?.filters;

	function LOCATION_OPTION(): IListBoxSelectFilterWidget[] {
		let data: IListBoxSelectFilterWidget[] = [
			{
				name: "Tous(*)",
				value: "*",
				selected: false,
			},
		];

		if (PRODUCT_TYPE && PRODUCT_TYPE.length > 0) {
			PRODUCT_TYPE.forEach((t) => {
				data.push({
					name: t,
					value: t.toString(),
					selected: false,
				});
			});
		}

		return data;
	}

	const handleChange = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("type", item.value);
		dispatch(setFilters({ location: item.value }));
		setUseStateFilter && setUseStateFilter({ ...useStateFilter, location: item.value });
		handleFetch && handleFetch();
	};

	useEffect(() => {
		if (!locations && !loading) {
			dispatch(fetchLocation());
		}
	}, [dispatch, fetchLocation, locations, loading]);

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
				{!groupFilter && <WidgetHeading1 title="Type" />}
				<div className="w-full">
					<ListBoxSelectFilter
						onChange={handleChange}
						options={LOCATION_OPTION()}
						label="COMMUNE"
						labelID="location"
					/>
				</div>
			</div>
		</div>
	);
};

export default WidgetTypeWithSelect;
