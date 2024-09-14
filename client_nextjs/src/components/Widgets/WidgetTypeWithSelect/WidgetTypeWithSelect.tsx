import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect } from "react";
import { IPropertyFilter } from "app/reducer/products/product";
import { LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "../WidgetSort/ListBoxSelectFilter";
import { PRODUCT_TYPE } from "containers/PageDashboard/Posts/DashboardSubmitPost";

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
	const urlSearchParams = new URLSearchParams(window.location.search);
	const type = urlSearchParams.get("type");

	function LOCATION_OPTION(): IListBoxSelectFilterWidget[] {
		let data: IListBoxSelectFilterWidget[] = [
			{
				name: "Tous(*)",
				value: "*",
				selected: !type || type === "*" ? true : false,
			},
		];

		if (PRODUCT_TYPE && PRODUCT_TYPE.length > 0) {
			PRODUCT_TYPE.forEach((t) => {
				data.push({
					name: t,
					value: t.toString(),
					selected: t === type,
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
		<div className={!groupFilter ? `${className}` : ""}>
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
						label="Type d'offre"
						labelID="location"
					/>
				</div>
			</div>
		</div>
	);
};

export default WidgetTypeWithSelect;
