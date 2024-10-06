import { FC } from "react";
import { IProduct } from "app/reducer/products/product";
import { FaBath, FaMoneyBill, FaMoneyBillWave, FaRoute } from "react-icons/fa";
import { Apps, Fastfood, PhotoSizeSelectSmallTwoTone, Security } from "@mui/icons-material";

import ItemChecked, { iconColor, iconSizeSingle } from "./ItemCheck";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Tooltip } from "@mui/material";
import { ProductcategoryUUID } from "data/categories_uuid";
import { getSecurityLabel } from "utils/utils";
import {
	accessibilities,
	purchase_powers,
} from "containers/PageDashboard/Posts/components/Forms/DetailBienTwo";
import {
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "containers/PageDashboard/Posts/posts.constantes";
import { smText, smTextOnIsSingle } from "components/Cards/Card11/Card11Price";
import ItemCheckTwo from "./ItemCheckTwo";

export interface PostCardDetailMetaSingleProps {
	className?: string;
	meta: IProduct;
	hiddenAvatar?: boolean;
	size?: "large" | "normal";
	isSingle?: boolean;
}

const PostCardDetailMetaSingle: FC<PostCardDetailMetaSingleProps> = ({
	className = "leading-none",
	meta,
	hiddenAvatar = false,
	size = "normal",
	isSingle = false,
}) => {
	const { type, category, home_type, area, area_count, area_unit, bathrooms, kitchens } = meta;
	const gridThree = "grid grid-cols-3 gap-1";
	const gridThreeAlt = isSingle
		? "flex item-center justify-start item-center"
		: "grid grid-cols-2 sm:grid-cols-3 gap-1";
	const locationItemClassName = "col-span-1";
	const ItemCheckedClassName = "justify-self-start item-center";

	const getFontSize = (): "large" | "medium" | "small" | "inherit" => {
		return "large";
		if (isSingle) {
			return "medium";
		} else {
			return "small";
		}
	};

	const getAreaUnit = (): string => {
		let unit = " m²";
		if (!area_unit) {
			return unit;
		}

		if (area_unit === "M") {
			return " m²";
		}
		return area_unit;
	};

	const LocationMeta = () => {
		const get_purchase_power_label = (label: string) => {
			return purchase_powers.find((item) => item.value === meta.purchase_power)?.label ?? "";
		};
		if (type === PRODUCT_TYPE[TYPE_LOCATION_KEY]) {
			return (
				<div>
					{/*  */}
					<div className={`${gridThree}`}>
						{/* Superficie */}
						{area && area != 0 ? (
							<div className={`${locationItemClassName}`} title="Superficie">
								<div className="flex">
									<PhotoSizeSelectSmallTwoTone
										fontSize={getFontSize()}
										style={{ width: iconSizeSingle }}
										className="mt-0 mr-2"
									/>
									{/* {isSingle && <span className="mr-1">Superficie: </span>} */}
									<span className={smTextOnIsSingle}>
										{`${area}/${getAreaUnit()}`}
									</span>
								</div>
							</div>
						) : (
							<div className={`${locationItemClassName} mr-16`} title="Superficie" />
						)}

						{bathrooms ? (
							<div className={locationItemClassName}>
								<div className="flex items-center">
									<FaBath
										size={iconSizeSingle}
										fontSize={getFontSize()}
										style={{ width: iconSizeSingle }}
										className="mb-1 mr-1"
									/>
									{/* Salle de bain :  */}
									{`${bathrooms}`}
								</div>
							</div>
						) : null}

						{kitchens ? (
							<div className={locationItemClassName}>
								<Fastfood
									fontSize={getFontSize()}
									style={{ width: iconSizeSingle }}
									className="mb-1 mr-1"
								/>
								{/* Cuisine :  */}
								{`${kitchens}`}
							</div>
						) : null}
					</div>

					{/* grid grid-cols-3 */}
					<div className={`${gridThree} mt-0`}>
						{/* SECURITY */}
						{isSingle && meta.security ? (
							<div className="flex items-center">
								<ItemCheckTwo
									name={getSecurityLabel(meta.security)}
									condition={true}
									className={ItemCheckedClassName}
									icon={
										<Security width={iconSizeSingle} height={iconSizeSingle} />
									}
								/>
							</div>
						) : meta.security && meta.security == "WITH_GUARD" ? (
							<div className="flex items-center">
								<ItemCheckTwo
									name="Avec virgile"
									condition={meta.security == "WITH_GUARD"}
									className={ItemCheckedClassName}
								/>
							</div>
						) : null}

						{/* ACCESSIBILITY */}
						{isSingle && meta.accessibility ? (
							<div className="flex items-center">
								<ItemCheckTwo
									name={
										accessibilities.find(
											(item) => item.value === meta.accessibility
										)?.label ?? ""
									}
									condition={true}
									className={ItemCheckedClassName}
									icon={<FaRoute size={iconSizeSingle} />}
								/>
							</div>
						) : meta.accessibility && meta.accessibility == "NOT_FAR_FROM_THE_TAR" ? (
							<div className="flex items-center">
								<ItemCheckTwo
									name="Accès facile"
									condition={meta.accessibility == "NOT_FAR_FROM_THE_TAR"}
									className={ItemCheckedClassName}
								/>
							</div>
						) : null}

						{/* PURCHASE_POWER */}
						{isSingle ? (
							<>
								{meta.purchase_power ? (
									<ItemCheckTwo
										name={
											"Pouvoir d'achat : " +
											get_purchase_power_label(meta.purchase_power)
										}
										condition={true}
										className={ItemCheckedClassName}
										icon={
											["LESS_EXPENSIVE", "EQUAL_EXPENSIVE"].includes(
												meta.purchase_power
											) ? (
												<FaMoneyBillWave
													width={iconSizeSingle}
													height={iconSizeSingle}
												/>
											) : (
												<FaMoneyBill fontSize={iconSizeSingle} />
											)
										}
									/>
								) : meta.purchase_power &&
								  ["LESS_EXPENSIVE", , "EQUAL_EXPENSIVE"].includes(
										meta.purchase_power
								  ) ? (
									<ItemCheckTwo
										name="Zone à pouvoir d'achat"
										condition={["LESS_EXPENSIVE", , "EQUAL_EXPENSIVE"].includes(
											meta.purchase_power
										)}
										className={ItemCheckedClassName}
									/>
								) : null}
							</>
						) : null}
					</div>
				</div>
			);
		}

		return null;
	};

	const ReservationMeta = () => {
		if (type !== PRODUCT_TYPE[TYPE_RESERVATION_KEY]) return null;

		return (
			<>
				<div
					className={`grid gap-0 sm:gap-0 mt-0  ${
						isSingle ? "grid-cols-3 sm:grid-cols-5 " : "grid-cols-2"
					}`}
				>
					{/* JACUZZI */}
					{meta.jacuzzi ? (
						<ItemCheckTwo
							isSingle={true}
							name="Jacuzzi"
							condition={meta.jacuzzi}
							className={ItemCheckedClassName}
						/>
					) : null}

					{/* BATH */}
					{meta.bath ? (
						<ItemCheckTwo isSingle={true} name="Baignoire" condition={meta.bath} />
					) : null}

					{/* WIFI */}
					{meta.WiFi ? (
						<ItemCheckTwo isSingle={true} name="WIFI" condition={meta.WiFi} />
					) : null}

					{/* PICINE */}
					{meta.pool ? (
						<ItemCheckTwo isSingle={true} name="Piscine" condition={meta.pool} />
					) : null}

					{/* CLIMATISATION */}
					{meta.air_conditioning ? (
						<ItemCheckTwo
							isSingle={true}
							name="Climatisation"
							condition={meta.air_conditioning}
						/>
					) : null}
				</div>
			</>
		);
	};

	const VenteMeta = () => {
		if (type !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]) return null;

		return (
			<>
				{/* grid grid-cols-3 gap-0*/}
				{/* grid-cols-1 sm: */}
				<div className="grid grid-cols-3 gap-0">
					{/* *SUPERFICIE */}
					{area && area > 0 ? (
						<div className="col-span-1">
							<div className="flex items-center justify-center" title="Superficie">
								<PhotoSizeSelectSmallTwoTone
									fontSize={getFontSize()}
									style={{ width: iconSizeSingle }}
									className="mb-1 mr-2"
								/>
								{`${area} / ${getAreaUnit()}`}
							</div>
						</div>
					) : null}

					{/* nombre de pièce ou terrain */}
					{area_count ? (
						<div className="col-span-1">
							<div className="flex items-center justify-center" title="Superficie">
								{type === "BIEN EN VENTE" &&
								category.uuid ===
									ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN &&
								area_count < 0 ? (
									<Apps
										width={iconSizeSingle}
										fontSize={getFontSize()}
										style={{ width: iconSizeSingle }}
										className=""
									/>
								) : null}

								{type === "BIEN EN VENTE" &&
								category.uuid ===
									ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN ? (
									<span>
										{area_count > 1 ? (
											<>{`${area_count} terrain${
												area_count > 1 ? "s" : ""
											}`}</>
										) : null}
									</span>
								) : (
									<span>
										{" "}
										{`${area_count} pièce${area_count > 1 ? "s" : ""}`}
									</span>
								)}
							</div>
						</div>
					) : null}

					{/* ACD */}
					{meta.acd ? (
						<div className="flex items-center">
							<ItemCheckTwo
								name="ACD"
								condition={true}
								className={ItemCheckedClassName}
								icon={
									<CheckCircleIcon
										className="mr-2"
										width={iconSizeSingle}
										height={iconSizeSingle}
										color={iconColor}
									/>
								}
							/>
						</div>
					) : (
						<div className="flex items-center">
							{/* SITE_APPROVED */}
							{meta.site_approved ? (
								<ItemCheckTwo
									name="Approuvé"
									condition={true}
									className={ItemCheckedClassName}
									icon={
										<CheckCircleIcon
											className=""
											width={iconSizeSingle}
											height={iconSizeSingle}
											color={iconColor}
										/>
									}
								/>
							) : null}
						</div>
					)}
				</div>
			</>
		);
	};

	if (!type) return null;

	return (
		<>
			<div
				className={
					isSingle ? "bg-gray-100 dark:bg-neutral-800 rounded-md px-2 py-2 mb-2" : ""
				}
			>
				{isSingle ? (
					<>
						<p className="text-base text-neutral-900 dark:text-neutral-100 font-semibold">
							Caractéristiques et commodités
						</p>
						<hr className="border-b border-neutral-200 dark:border-neutral-700 my-4" />
					</>
				) : null}

				<div
					className={`text-neutral-800 dark:text-neutral-200 ${className} ${
						isSingle ? smTextOnIsSingle : smText
					}}`}
					data-nc-id="PostCardMetaV2"
				>
					<LocationMeta />
					<ReservationMeta />
					<VenteMeta />
				</div>
			</div>
		</>
	);
};

export default PostCardDetailMetaSingle;
