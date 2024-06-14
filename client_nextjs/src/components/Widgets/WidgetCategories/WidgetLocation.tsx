import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { FC, useEffect } from "react";
import ProductSortOption from "../WidgetSort/ProductSortOption";
import { FaPlusCircle } from "react-icons/fa";
import { PropertyAction } from "app/reducer/products/product";
import { ILocation, LocationAction } from "app/reducer/locations/locations";
import { fetchLocation } from "app/axios/actions/api.others.action";
import { updateParamsUrl } from "utils/utils";

export interface WidgetLocationsProps {
	className?: string;
	handleFetch?: () => void;
}

const WidgetLocations: FC<WidgetLocationsProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800", handleFetch }) => {
	const dispatch = useAppDispatch();

	const locations = useAppSelector(LocationAction.data);
	const loading = useAppSelector(LocationAction.loading);
	const filters = useAppSelector(PropertyAction.data)?.filters;

	const handleChange = (item: ILocation) => {
		let locationIds: number[] = filters?.locations ?? [];

		if (locationIds.includes(item.id)) {
			locationIds = locationIds.filter((cat) => cat !== item.id);
		} else {
			locationIds = [...locationIds, item.id];
		}

		updateParamsUrl("locations", locationIds.length > 0 ? locationIds.join(",") : "");
		dispatch(setFilters({ ...filters, locations: locationIds }));

		handleFetch && handleFetch();
	};

	useEffect(() => {
		if (!locations && !loading) {
			dispatch(fetchLocation());
		}
	}, [dispatch, fetchLocation, locations, loading]);

	return (
		<div
			className="max-h-300px overflow-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
			// style={{ maxHeight: "300px", height: "300px", overflow: "auto" }}
		>
			<div className={`nc-WidgetLocations rounded-3xl overflow-hidden ${className}`} data-nc-id="WidgetLocations">
				<WidgetHeading1 title="Communes" />
				<div className="flow-root">
					<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 px-1">
						{locations &&
							locations.map((location) => (
								<div key={location.id}>
									<ProductSortOption
										label={`${location.name} (${location.count_post})`}
										name="location"
										value={`${location.id}`}
										type="checkbox"
										icon={<FaPlusCircle size={18} className="mr-2 text-neutral-500" />}
										handleChange={() => handleChange(location)}
									/>
								</div>
							))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default WidgetLocations;
