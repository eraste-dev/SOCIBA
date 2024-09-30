import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect, useState } from "react";
import { IPropertyFilter, PropertyAction } from "app/reducer/products/product";
import { LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { buildLocationItem, updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "../WidgetSort/ListBoxSelectFilter";
import { IGetSearchPropertiesParams } from "utils/query-builder.utils";
import WidgetLocationWithInput from "./WidgetLocationWithInput";
import WidgetOtherCityWithInput from "./WidgetOtherCityWithInput";

export interface WidgetLocationWithSelectProps {
	className?: string;
	handleFetch?: () => void;
	useStateFilter: IPropertyFilter;
	setUseStateFilter?: any;
	groupFilter?: boolean;
}

const WidgetLocationWithSelect: FC<WidgetLocationWithSelectProps> = ({
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
	const other = buildLocationItem("Autres Villes");

	const locationId = urlSearchParams.get("location_id");
	const otherLocation = urlSearchParams.get("unlisted_location");
	const [citySearch, setCitySearch] = useState<string>("");

	/**
	 * Generates an array of IListBoxSelectFilterWidget objects representing the available location options.
	 *
	 * @return {IListBoxSelectFilterWidget[]} An array of IListBoxSelectFilterWidget objects.
	 */
	const LOCATION_OPTION = (): IListBoxSelectFilterWidget[] => {
		let data: IListBoxSelectFilterWidget[] = [
			{
				name: "Tous(*)",
				value: "*",
				selected: false,
			},
		];

		if (locations && locations.length > 0) {
			locations.forEach((location) => {
				data.push({
					name: location.name,
					value: location.id.toString(),
					selected: locationId ? parseInt(locationId) === location.id : false,
				});
			});
		}
		data.push({
			name: other.name,
			value: other.id.toString(),
			selected: !locationId && otherLocation ? true : false,
		});
		return data;
	};

	const currentSelected = (): IListBoxSelectFilterWidget => {
		const firstValue: IListBoxSelectFilterWidget = LOCATION_OPTION()[0];
		let current: IListBoxSelectFilterWidget = LOCATION_OPTION()[0];

		if (!locationId && otherLocation) {
			current = LOCATION_OPTION().find((l) => l.value === other.id.toString()) ?? firstValue;
			return current;
		}

		if (!locationId && !otherLocation) {
			return firstValue;
		}

		current = locationId
			? LOCATION_OPTION().filter((location) => location.value === locationId)[0]
			: firstValue;

		return current;
	};

	const handleChange = (item: IListBoxSelectFilterWidget) => {
		if (item.value !== "0") {
			updateParamsUrl("location", item.value);
			updateParamsUrl("unlisted_location");
			dispatch(setFilters({ location: item.value }));
			setUseStateFilter &&
				setUseStateFilter({
					...useStateFilter,
					location: item.value,
					unlisted_location: undefined,
				});
		} else {
			console.log("unlisted_location :: ", item.value);
			updateParamsUrl("location");
			updateParamsUrl("unlisted_location", "true");
			dispatch(setFilters({ unlisted_location: "true" }));
			setUseStateFilter &&
				setUseStateFilter({
					...useStateFilter,
					unlisted_location: "true",
					location: undefined,
				});
		}
		handleFetch && handleFetch();
	};

	const handleChangeInput = (eventText: string) => {
		setCitySearch(eventText);
		updateParamsUrl("other_location", eventText);
		// updateParamsUrl("unlisted_location"); // ? reset
		updateParamsUrl("location"); // ? reset
		// dispatch(setFilters({ other_location: citySearch }));
		setUseStateFilter &&
			setUseStateFilter({
				...useStateFilter,
				location: undefined,
				unlisted_location: undefined,
				other_location: citySearch,
			});
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
				{!groupFilter && <WidgetHeading1 title="Communes" />}
				<div className="w-full">
					<ListBoxSelectFilter
						onChange={handleChange}
						options={LOCATION_OPTION()}
						label="Communes"
						labelID="location"
					/>
				</div>
			</div>

			{currentSelected() && currentSelected().value === other.id.toString() ? (
				<div
					className={
						!groupFilter
							? `nc-WidgetLocations rounded-3xl overflow-hidden ${className}`
							: "flex flex-wrap"
					}
					data-nc-id="WidgetLocations"
				>
					{!groupFilter && <WidgetHeading1 title="Communes" />}
					<div className="w-full">
						<WidgetOtherCityWithInput
							handleChange={handleChangeInput}
							useStateFilter={useStateFilter}
							groupFilter={groupFilter}
						/>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default WidgetLocationWithSelect;
