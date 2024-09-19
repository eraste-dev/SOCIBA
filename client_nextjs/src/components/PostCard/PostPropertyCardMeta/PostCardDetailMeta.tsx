import { FC } from "react";
import { IProduct } from "app/reducer/products/product";
import {
	FaBath,
	FaFirstOrderAlt,
	FaMoneyBill,
	FaMoneyBillWave,
	FaReact,
	FaRoute,
} from "react-icons/fa";
import {
	Apps,
	Cancel,
	Fastfood,
	FoodBankOutlined,
	ForkLeftRounded,
	Kitchen,
	KitchenOutlined,
	PhotoSizeSelectSmallTwoTone,
	Security,
	ToysTwoTone,
} from "@mui/icons-material";
import {
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_LOCATION_KEY,
	TYPE_RESERVATION_KEY,
} from "containers/PageDashboard/Posts/DashboardSubmitPost";
import ItemChecked from "./ItemCheck";
import { CheckCircleIcon, HomeIcon } from "@heroicons/react/solid";
import { Tooltip } from "@mui/material";
import { ProductcategoryUUID } from "data/categories_uuid";
import { getAccessibilityText, getSecurityLabel } from "utils/utils";
import {
	accessibilities,
	purchase_powers,
} from "containers/PageDashboard/Posts/components/Forms/DetailBienTwo";

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
	const iconSize: number = 18;
	const { type, category, home_type, area, area_count, area_unit, bathrooms, kitchens } = meta;
	const gridThree = "grid grid-cols-2 sm:grid-cols-3 gap-1";
	const gridThreeAlt = isSingle
		? "grid grid-cols-1 sm:grid-cols-3 gap-1"
		: "grid grid-cols-1 sm:grid-cols-2 gap-1";
	const locationItemClassName = isSingle
		? "flex items-center justify-start"
		: "flex items-center justify-start sm:justify-center";

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
		if (type === PRODUCT_TYPE[TYPE_LOCATION_KEY]) {
			return (
				<div>
					{/*  */}
					<div className={`${gridThree} ${isSingle ? "space-y-1" : ""}`}>
						{/* Superficie */}
						{area && area != 0 ? (
							<div className={locationItemClassName} title="Superficie">
								<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
								{isSingle && <span className="mr-1">Superficie: </span>}
								<span className={isSingle ? "text-base" : "text-xs"}>
									{`${area} / ${getAreaUnit()}`}
								</span>
							</div>
						) : null}

						{bathrooms ? (
							<div className={locationItemClassName}>
								<FaBath size={iconSize} className="mb-1 mr-1" />
								{isSingle && <span className="mr-1">Salle de bain : </span>}
								{bathrooms}
							</div>
						) : null}

						{kitchens ? (
							<Tooltip title="Cuisine">
								<div className={locationItemClassName}>
									{/* <Kitchen className="mb-1 mr-1" /> */}
									<Fastfood className="mb-1 mr-1" />
									{isSingle && <span className="mr-1">Cuisine : </span>}
									{kitchens}
								</div>
							</Tooltip>
						) : null}
					</div>

					{/* grid grid-cols-3 */}
					<div className={`${gridThreeAlt} mt-2`}>
						{/* SECURITY */}
						{isSingle && meta.security ? (
							<ItemChecked
								name={getSecurityLabel(meta.security)}
								condition={true}
								className="justify-self-start"
								icon={
									<Security
										className={
											meta.security === "WITH_GUARD"
												? "mr-2 text-green-800"
												: "mr-2"
										}
										width={iconSize}
										height={iconSize}
									/>
								}
							/>
						) : meta.security && meta.security == "WITH_GUARD" ? (
							<ItemChecked
								name="Avec virgile"
								condition={meta.security == "WITH_GUARD"}
								className="justify-self-start"
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
								className="justify-self-start"
								icon={
									meta.accessibility === "NOT_FAR_FROM_THE_TAR" ? (
										<CheckCircleIcon
											className="mr-2 text-green-800"
											width={iconSize}
										/>
									) : (
										<FaRoute className="mr-2 text-gray-800" width={iconSize} />
									)
								}
							/>
						) : meta.accessibility && meta.accessibility == "NOT_FAR_FROM_THE_TAR" ? (
							<ItemChecked
								name="Accès facile"
								condition={meta.accessibility == "NOT_FAR_FROM_THE_TAR"}
								className="justify-self-start"
							/>
						) : null}

						{/* PURCHASE_POWER */}
						{isSingle && meta.purchase_power ? (
							<ItemChecked
								name={
									"Pouvoir d'achat : " +
										purchase_powers.find(
											(item) => item.value === meta.purchase_power
										)?.label ?? ""
								}
								condition={true}
								className="justify-self-start"
								icon={
									["LESS_EXPENSIVE", "EQUAL_EXPENSIVE"].includes(
										meta.purchase_power
									) ? (
										<FaMoneyBillWave className="mr-2 text-green-800 text-2xl" />
									) : (
										<FaMoneyBill
											className="mr-2 text-gray-800 text-2xl"
											width={iconSize}
										/>
									)
								}
							/>
						) : meta.purchase_power &&
						  ["LESS_EXPENSIVE", , "EQUAL_EXPENSIVE"].includes(meta.purchase_power) ? (
							<ItemChecked
								name="Zone à pouvoir d'achat"
								condition={["LESS_EXPENSIVE", , "EQUAL_EXPENSIVE"].includes(
									meta.purchase_power
								)}
								className="justify-self-start"
							/>
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
					className={`grid gap-2 sm:gap-0 mt-3  ${
						isSingle ? "grid-cols-3 sm:grid-cols-5 " : "grid-cols-2"
					}`}
				>
					{/* JACUZZI */}
					{meta.jacuzzi ? (
						<ItemChecked
							isSingle={true}
							name="Jacuzzi"
							condition={meta.jacuzzi}
							className="justify-self-start"
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
				<div className="flex justify-between mt-3">
					{/* *SUPERFICIE */}
					{area && area > 0 ? (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
							{`${area} / ${getAreaUnit()}`}
						</div>
					) : null}

					{/* nombre de pièce ou terrain */}
					{area_count ? (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							{type === "BIEN EN VENTE" &&
							category.uuid === ProductcategoryUUID.BIEN_EN_VENTE.children.TERRAIN &&
							area_count < 0 ? (
								<Apps width={iconSize} className="mb-1 mr-2" />
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
							className="justify-self-start"
							icon={
								<CheckCircleIcon
									className="mr-2"
									width={iconSize}
									height={iconSize}
									color="green"
								/>
							}
						/>
					) : null}
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
					className={`text-neutral-800 dark:text-neutral-200 ${
						isSingle ? "text-base" : size === "normal" ? "text-xs" : "text-sm"
					} ${className}`}
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
