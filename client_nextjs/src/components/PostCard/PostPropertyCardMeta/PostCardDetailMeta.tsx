import { FC } from "react";
import { IProduct } from "app/reducer/products/product";
import { FaBath, FaMoneyBill, FaMoneyBillWave, FaRoute } from "react-icons/fa";
import { Apps, Fastfood, PhotoSizeSelectSmallTwoTone, Security } from "@mui/icons-material";

import ItemChecked, { iconColor, iconSize, iconSizeSingle } from "./ItemCheck";
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

export interface PostCardDetailMetaProps {
	className?: string;
	meta: IProduct;
	hiddenAvatar?: boolean;
	size?: "large" | "normal";
	isSingle?: boolean;
}

const PostCardDetailMeta: FC<PostCardDetailMetaProps> = ({
	className = "leading-none",
	meta,
	hiddenAvatar = false,
	size = "normal",
	isSingle = false,
}) => {
	const { type, category, home_type, area, area_count, area_unit, bathrooms, kitchens } = meta;
	const gridThree = "grid grid-cols-3 sm:grid-cols-5 gap-1";
	const gridFive = isSingle ? "grid grid-cols-3" : "flex justify-between w-full";
	const gridThreeAlt = isSingle
		? "flex item-center justify-start item-center"
		: "grid grid-cols-2 sm:grid-cols-3 gap-1";
	const locationItemClassName = isSingle
		? "flex item-center justify-start item-center " // col-span-1
		: ""; // flex item-center justify-center item-center 
	const ItemCheckedClassName = "justify-self-start item-center";

	const getFontSize = (): "large" | "medium" | "small" | "inherit" => {
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
					<div className={`${gridFive}`}>
						{/* Superficie */}
						{area && area != 0 ? (
							<div className={`${locationItemClassName}`} title="Superficie">
								<div className="flex h-full items-center">
									<PhotoSizeSelectSmallTwoTone
										fontSize={getFontSize()}
										style={{ width: isSingle ? iconSizeSingle : iconSize }}
										className="mt-0 mr-2"
									/>
									{/* {isSingle && <span className="mr-1">Superficie: </span>} */}
									<span className={isSingle ? smTextOnIsSingle : smText}>
										{`${area}/${getAreaUnit()}`}
									</span>
								</div>
							</div>
						) : (
							<div className={`${locationItemClassName} mr-16`} title="Superficie" />
						)}

						{bathrooms ? (
							<div className={locationItemClassName}>
								<div className="flex h-full items-center">
									<FaBath
										size={isSingle ? iconSizeSingle : iconSize}
										fontSize={getFontSize()}
										style={{ width: isSingle ? iconSizeSingle : iconSize }}
										className="mb-1 mr-1"
									/>
									{isSingle && false ? (
										<span className={"text-sm"}>
											Salle de bain : {bathrooms}{" "}
										</span>
									) : null}
									{bathrooms}
								</div>
							</div>
						) : null}

						{kitchens ? (
							<div className={locationItemClassName}>
								{/* <Kitchen className="mb-1 mr-1" /> */}
								<Fastfood
									fontSize={getFontSize()}
									style={{ width: isSingle ? iconSizeSingle : iconSize }}
									className="mb-1 mr-1"
								/>
								{/* {isSingle && <span className="mr-1">Cuisine : </span>} */}
								{kitchens}
							</div>
						) : null}
					</div>

					{/* grid grid-cols-3 */}
					<div className={`${gridThreeAlt} mt-0`}>
						{/* SECURITY */}
						{isSingle && meta.security ? (
							<div className="flex items-center">
								<ItemChecked
									name={getSecurityLabel(meta.security)}
									condition={true}
									className={ItemCheckedClassName}
									icon={<Security width={iconSize} height={iconSize} />}
								/>
							</div>
						) : meta.security && meta.security == "WITH_GUARD" ? (
							<ItemChecked
								name="Avec virgile"
								condition={meta.security == "WITH_GUARD"}
								className={ItemCheckedClassName}
							/>
						) : null}

						{/* ACCESSIBILITY */}
						{isSingle && meta.accessibility ? (
							<ItemChecked
								name={
									accessibilities.find(
										(item) => item.value === meta.accessibility
									)?.label ?? ""
								}
								condition={true}
								className={ItemCheckedClassName}
								icon={<FaRoute size={isSingle ? iconSizeSingle : iconSize} />}
							/>
						) : meta.accessibility && meta.accessibility == "NOT_FAR_FROM_THE_TAR" ? (
							<ItemChecked
								name="Accès facile"
								condition={meta.accessibility == "NOT_FAR_FROM_THE_TAR"}
								className={ItemCheckedClassName}
								// width={isSingle ? iconSizeSingle : iconSize}
								// height={isSingle ? iconSizeSingle : iconSize}
							/>
						) : null}

						{/* PURCHASE_POWER */}
						{isSingle ? (
							<>
								{meta.purchase_power ? (
									<ItemChecked
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
													width={isSingle ? iconSizeSingle : iconSize}
													height={isSingle ? iconSizeSingle : iconSize}
												/>
											) : (
												<FaMoneyBill
													fontSize={isSingle ? iconSizeSingle : iconSize}
												/>
											)
										}
									/>
								) : meta.purchase_power &&
								  ["LESS_EXPENSIVE", , "EQUAL_EXPENSIVE"].includes(
										meta.purchase_power
								  ) ? (
									<ItemChecked
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
						<ItemChecked
							isSingle={true}
							name="Jacuzzi"
							condition={meta.jacuzzi}
							className={ItemCheckedClassName}
						/>
					) : null}

					{/* BATH */}
					{meta.bath ? (
						<ItemChecked isSingle={true} name="Baignoire" condition={meta.bath} />
					) : null}

					{/* WIFI */}
					{meta.WiFi ? (
						<ItemChecked isSingle={true} name="WIFI" condition={meta.WiFi} />
					) : null}

					{/* PICINE */}
					{meta.pool ? (
						<ItemChecked isSingle={true} name="Piscine" condition={meta.pool} />
					) : null}

					{/* CLIMATISATION */}
					{meta.air_conditioning ? (
						<ItemChecked
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
				<div className="flex items-center">
					{/* *SUPERFICIE */}
					{area && area > 0 ? (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							<PhotoSizeSelectSmallTwoTone
								fontSize={getFontSize()}
								style={{ width: iconSize }}
								className="mb-1 mr-2"
							/>
							{`${area}/${getAreaUnit()}`}
						</div>
					) : null}

					{/* nombre de pièce ou terrain */}
					{area_count ? (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							{type === "BIEN EN VENTE" &&
							category.uuid === ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN &&
							area_count < 0 ? (
								<Apps
									width={iconSize}
									fontSize={getFontSize()}
									style={{ width: iconSize }}
									className=""
								/>
							) : null}

							{type === "BIEN EN VENTE" &&
							category.uuid === ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN ? (
								<span>
									{area_count > 1 ? (
										<>{`${area_count} terrain${area_count > 1 ? "s" : ""}`}</>
									) : null}
								</span>
							) : (
								<span> {`${area_count} pièce${area_count > 1 ? "s" : ""}`}</span>
							)}
						</div>
					) : null}

					{/* ACD */}
					{meta.acd ? (
						<ItemChecked
							name="ACD"
							condition={true}
							className={ItemCheckedClassName}
							icon={
								<CheckCircleIcon
									className="mr-2"
									width={iconSize}
									height={iconSize}
									color={iconColor}
								/>
							}
						/>
					) : (
						<>
							{/* SITE_APPROVED */}
							{meta.site_approved ? (
								<ItemChecked
									name="Approuvé"
									condition={true}
									className={ItemCheckedClassName}
									icon={
										<CheckCircleIcon
											className=""
											width={iconSize}
											height={iconSize}
											color={iconColor}
										/>
									}
								/>
							) : null}
						</>
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

export default PostCardDetailMeta;
