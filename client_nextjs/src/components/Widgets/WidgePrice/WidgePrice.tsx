import { setFilters } from "app/axios/api.action";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { PropertyAction } from "app/reducer/products/propertiy";
import CardAuthor from "components/Card/CardAuthor/CardAuthor";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { PostAuthorType } from "data/types";
import React, { FC, useState } from "react";

export interface WidgetAuthorsProps {
	className?: string;
}

const WidgePrice: FC<WidgetAuthorsProps> = ({ className = "bg-neutral-100 dark:bg-neutral-800" }) => {
	const dispatch = useAppDispatch();
	const filters = useAppSelector(PropertyAction.data)?.filters;
	const [price, setPrice]: any = useState([0, 9999999999999]);

	const handleChange = () => {
		if (price && price.length > 2 && price[0] > price[1]) {
			dispatch(setFilters({ price_range: { min: price[0], max: price[1] } }));
		}
	};

	return (
		<div className={`nc-WidgetAuthors rounded-3xl overflow-hidden ${className}`} data-nc-id="WidgetAuthors">
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
