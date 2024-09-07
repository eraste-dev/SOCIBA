import { CheckCircleIcon } from "@heroicons/react/solid";
import { IProduct } from "app/reducer/products/product";
import {
	IPRODUCT_AREA_UNIT,
	IPRODUCT_AREA_UNIT_KEY,
	IPRODUCT_PERIODICITY,
	PERIODICITY_LIST,
	PERIODICITY_RESERVATION_LIST,
	PRODUCT_AREA_UNIT,
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
} from "containers/PageDashboard/DashboardSubmitPost";
import React from "react";
import { _f } from "utils/money-format";

interface Card11PriceProps {
	item: IProduct;
}

const Card11Price: React.FC<Card11PriceProps> = ({ item }) => {
	const GET_PERIODICITY = (): IPRODUCT_PERIODICITY[] => {
		let data: IPRODUCT_PERIODICITY[] = [];
		data = [...PERIODICITY_LIST, ...PERIODICITY_RESERVATION_LIST];

		return data;
	};

	const GET_AREA_UNIT = (): IPRODUCT_AREA_UNIT[] => {
		let data: IPRODUCT_AREA_UNIT[] = [];
		data = [...PRODUCT_AREA_UNIT];
		return data;
	};

	return (
		<div className=" grid grid-cols-subgrid lg:col-span-4 text-justify col-span-6">
			{/* SHOW PRICE *********************************************************************** */}
			<div className="w-full flex lg:justify-end justify-start mt-2 lg:mt-0 ">
				<span className="nc-card-title block font-bold text-primary-800 dark:text-neutral-100 md:text-base text-xs ">
					{_f(item.price)}
					{/* // PERIODICITY */}
					{item.type !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
						item.periodicity &&
						GET_PERIODICITY().find((p) => p.id === item.periodicity) && (
							<>
								{` / ` +
									GET_PERIODICITY().find((p) => p.id === item.periodicity)?.name}
							</>
						)}

					{/* // AREA UNIT FOR (VENTE) */}
					{item.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
						item.area_unit &&
						GET_AREA_UNIT().find((u) => u.id === item.area_unit) && (
							<>
								{` / ` + GET_AREA_UNIT().find((u) => u.id === item.area_unit)?.name}
							</>
						)}
				</span>
			</div>
			{/* SHOW PRICE *********************************************************************** */}

			{/* ! DEAD CODE *************************************************** */}
			<div className="w-full flex lg:justify-end justify-start ">
				{item.deposit_price && false && (
					<p className="nc-card-title block text-base font-bold text-primary-800 dark:text-neutral-100 text-md sm:text-xs ">
						{_f(item.deposit_price)}
					</p>
				)}
			</div>
			{/* ! DEAD CODE *************************************************** */}

			{item.type && item.type === PRODUCT_TYPE[0] && (
				<>
					{/* MOIS DE LOYER *************************************************** */}
					{item.count_monthly && (
						<div className="w-full flex lg:justify-end justify-start ">
							<p className="block text-base font-bold text-primary-800 dark:text-neutral-100 text-md sm:text-xs ">
								{`Caution: ${item.count_monthly} mois`}
							</p>
						</div>
					)}
					{/* MOIS DE LOYER *************************************************** */}

					{/* MOIS D'AVANCE *************************************************** */}
					{item.count_advance && false && (
						<div className="w-full flex lg:justify-end justify-start ">
							<p className="block text-base font-bold text-primary-800 dark:text-neutral-100 text-md sm:text-xs ">
								{`${item.count_advance} mois d'avance`}
							</p>
						</div>
					)}
					{/* MOIS D'AVANCE *************************************************** */}
				</>
			)}
		</div>
	);
};

export default Card11Price;
