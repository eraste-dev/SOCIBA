import { FC } from "react";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { useAppDispatch } from "app/hooks";
import { SORT_TYPE } from "app/reducer/products/product";
import { setFilters } from "app/axios/actions/api.action";
import { route } from "routers/route";
import { updateParamsUrl } from "utils/utils";
import ListBoxSelectFilter, { IListBoxSelectFilterWidget } from "./ListBoxSelectFilter";

export const PRICE_SORT_LIST: IListBoxSelectFilterWidget[] = [
	{ name: "Tous(*)", value: "*" },
	{ name: "Prix croissant", value: "asc" },
	{ name: "Prix décroissant", value: "desc" },
];

export const DEPOSIT_PRICE_SORT_LIST: IListBoxSelectFilterWidget[] = [
	{ name: "Tous(*)", value: "*" },
	{ name: "Loyer croissant", value: "asc" },
	{ name: "Loyer décroissant", value: "desc" },
];

export interface WidgetSortProps {
	className?: string;
	handleFetch?: () => void;
}

const WidgetSort: FC<WidgetSortProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800", handleFetch }) => {
	const dispatch = useAppDispatch();

	const handleChangeSortPrice = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("price_sort", item.value);
		dispatch(setFilters({ price_sort: item.value as SORT_TYPE }));
		handleFetch && handleFetch();
	};

	const handleChangeDepositSortPrice = (item: IListBoxSelectFilterWidget) => {
		updateParamsUrl("deposit_price_sort", item.value);
		dispatch(setFilters({ deposit_price_sort: item.value as SORT_TYPE }));
		handleFetch && handleFetch();
	};

	return (
		<div className={`nc-WidgetSort rounded-3xl overflow-hidden ${className}`} data-nc-id="WidgetSort">
			<WidgetHeading1 title="Trier" viewAll={{ label: "", href: route("annonces") }} />
			<div className="flex flex-wrap p-4 xl:p-5">
				{/* Option de tri par prix */}
				{/* <SelectFilterWidget className="w-full" handleChange={handleChangeSortPrice} lists={PRICE_SORT_LIST} /> */}
				<ListBoxSelectFilter onChange={handleChangeSortPrice} options={PRICE_SORT_LIST} label="Prix" />

				<ListBoxSelectFilter onChange={handleChangeDepositSortPrice} options={DEPOSIT_PRICE_SORT_LIST} label="Loyer" />
			</div>
		</div>
	);
};

export default WidgetSort;
