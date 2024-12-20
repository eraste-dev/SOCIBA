import { setFilters } from "app/axios/actions/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/product";
import CardAuthor from "components/Cards/CardAuthor/CardAuthor";
import WidgetHeading1 from "components/Widgets/WidgetHeading1/WidgetHeading1";
import { PostAuthorType } from "data/types";
import React, { FC, useState } from "react";

export interface WidgetAuthorsProps {
	className?: string;
	handleFetch?: () => void;
}

const WidgePrice: FC<WidgetAuthorsProps> = ({
	className = "bg-neutral-100 dark:bg-neutral-800",
	handleFetch,
}) => {
	const dispatch = useAppDispatch();
	const [price, setPrice]: any = useState([0, 9999999999999]);

	const urlSearchParams = new URLSearchParams(window.location.search);
	const price_sort = urlSearchParams.get("price_sort");

	const handleChange = () => {
		if (price && price.length > 2 && price[0] > price[1]) {
			dispatch(setFilters({ price_range: { min: price[0], max: price[1] } }));
			handleFetch && handleFetch();
		}
	};

	return (
		<div
			className={`nc-WidgetAuthors rounded-3xl overflow-hidden ${className}`}
			data-nc-id="WidgetAuthors"
		>
			<WidgetHeading1 title="Prix" />
			<div className="flow-root">
				<div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
					<div className="flex flex-col items-center justify-between py-3">
						<input
							type="number"
							onChange={(e) => setPrice([Number(e.target.value), price[1]])}
							value={price[0]}
							className=" px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full w-full"
						/>

						<input
							type="number"
							onChange={(e) => setPrice([price[0], Number(e.target.value)])}
							value={price[1]}
							className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full"
						/>

						<div className="py-3">
							<button
								type="button"
								className="w-full px-3 py-2 border border-neutral-200 dark:border-neutral-700 rounded-full"
								onClick={handleChange}
							>
								Appliquer
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default WidgePrice;
