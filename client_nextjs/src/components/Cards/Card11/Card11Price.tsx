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
} from "containers/PageDashboard/Posts/posts.constantes";
import React from "react";
import { _f } from "utils/money-format";

export const smText = "text-xs md:text-sm";
export const smTextOnIsSingle = "text-base";

interface Card11PriceProps {
	item: IProduct;
	className?: string;
	isSingle?: boolean;
}

const Card11Price: React.FC<Card11PriceProps> = ({ item, className, isSingle = false }) => {
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
		<div className={`nc-Card11Price ${className}`} data-nc-id="Card11Price">
			{/* SHOW PRICE *********************************************************************** */}
			<div className="w-full flex lg:justify-end justify-start ">
				<span
					className={
						className
							? className
							: "nc-card-title block font-bold text-black dark:text-neutral-100 text-sm text-clip overflow-hidden text-end"
					}
				>
					<span className={`${isSingle ? smTextOnIsSingle : smText}`}>
						{_f(item.price)}
					</span>

					{/* // PERIODICITY */}
					{item.type !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] ? (
						<span className={isSingle ? smTextOnIsSingle : smText}>
							{item.periodicity &&
							GET_PERIODICITY().find((p) => p.id === item.periodicity) ? (
								<span>
									{`/` +
										GET_PERIODICITY().find((p) => p.id === item.periodicity)
											?.name}
								</span>
							) : null}
						</span>
					) : null}
				</span>
			</div>
			{/* SHOW PRICE *********************************************************************** */}

			{/*  SHOW SECOND PRICE  ************************************************************** */}
			{item.price_second != null && item.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] ? (
				<div className="w-full flex lg:justify-end justify-start ">
					<span
						className={`nc-card-titles block font-bold text-black dark:text-neutral-100 text-clip overflow-hidden text-end ${
							isSingle ? smTextOnIsSingle : smText
						}`}
					>
						{_f(item.price_second)}

						{/* // AREA UNIT FOR (VENTE) */}
						{item.type === PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY] &&
							item.area_unit &&
							GET_AREA_UNIT().find((u) => u.id === item.area_unit) && (
								<>
									{`/` +
										GET_AREA_UNIT().find((u) => u.id === item.area_unit)?.name}
								</>
							)}
					</span>
				</div>
			) : null}

			{/*  SHOW SECOND PRICE  ************************************************************** */}

			{item.type && item.type === PRODUCT_TYPE[0] && (
				<>
					{/* MOIS DE LOYER *************************************************** */}
					{item.count_monthly && item.count_monthly !== 0 ? (
						<div className="w-full flex lg:justify-end justify-start ">
							<p
								className={
									className
										? className
										: "block font-bold text-black dark:text-neutral-100 text-xs sm:text-base"
								}
							>
								{`Caution: x${item.count_monthly}`}
							</p>
						</div>
					) : null}
					{/* MOIS DE LOYER *************************************************** */}

					{/* MOIS D'AVANCE *************************************************** */}
					{item.count_advance && false && (
						<div className="w-full flex lg:justify-end justify-start ">
							<p className="block text-base font-bold text-black dark:text-neutral-100 text-md sm:text-xs ">
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
