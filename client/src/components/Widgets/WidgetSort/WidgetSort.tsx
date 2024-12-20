import { FC } from "react";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { useAppDispatch } from "app/hooks";
import { SORT_TYPE } from "app/reducer/products/product";
import { setFilters } from "app/axios/actions/api.action";
import { route } from "routers/route";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "./ListBoxSelectFilter";

export const PRICE_SORT_LIST: IListBoxSelectFilterWidget[] = [
	{ name: "Choisir", value: "*" },
	{ name: "Prix croissant", value: "asc" },
	{ name: "Prix décroissant", value: "desc" },
];

export const DEPOSIT_PRICE_SORT_LIST: IListBoxSelectFilterWidget[] = [
	{ name: "Choisir", value: "*" },
	{ name: "Loyer croissant", value: "asc" },
	{ name: "Loyer décroissant", value: "desc" },
];

export interface WidgetSortProps {
	className?: string;
	handleFetch?: () => void;
	groupFilter?: boolean;
}

const WidgetSort: FC<WidgetSortProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
	groupFilter = false,
}) => {
	const dispatch = useAppDispatch();
	const urlSearchParams = new URLSearchParams(window.location.search);
	const sortSelected = urlSearchParams.get("price_sort");

	const handleChangeSortPrice = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("price_sort", item.value);
		// dispatch(setFilters({ price_sort: item.value as SORT_TYPE }));
		handleFetch && handleFetch();
	};

	const handleChangeDepositSortPrice = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("deposit_price_sort", item.value);
		// dispatch(setFilters({ deposit_price_sort: item.value as SORT_TYPE }));
		handleFetch && handleFetch();
	};

	const getPriceSortList = (): IListBoxSelectFilterWidget[] => {
		let data: IListBoxSelectFilterWidget[] = PRICE_SORT_LIST;
		console.log("sortSelected", sortSelected);

		data = data.map((item) => {
			if (item.value === sortSelected) {
				item.selected = true;
			}
			return item;
		});

		if (!sortSelected || sortSelected === null) {
			data[0].selected = true;
		}
		return data;
	};

	// useEffect(() => {
	//   if(sortSelected) {
	// 	handleChangeSortPrice(PRICE_SORT_LIST[0]);
	//   }
	// }, [])
	

	return (
		<div
			className={!groupFilter ? `nc-WidgetSort rounded-3xl overflow-hidden ${className}` : ""}
			data-nc-id="WidgetSort"
		>
			{!groupFilter && (
				<WidgetHeading1 title="Trier" viewAll={{ label: "", href: route("annonces") }} />
			)}
			<div className={!groupFilter ? `flex flex-wrap p-4 xl:p-5` : "flex flex-wrap"}>
				{/* Option de tri par prix */}
				{/* <SelectFilterWidget className="w-full" handleChange={handleChangeSortPrice} lists={PRICE_SORT_LIST} /> */}
				<ListBoxSelectFilter
					onChange={handleChangeSortPrice}
					options={getPriceSortList()}
					label="Prix"
					labelID="prix"
				/>

				{false && (
					<ListBoxSelectFilter
						onChange={handleChangeDepositSortPrice}
						options={DEPOSIT_PRICE_SORT_LIST}
						label="Loyer"
						labelID="loyer"
					/>
				)}
			</div>
		</div>
	);
};

export default WidgetSort;
