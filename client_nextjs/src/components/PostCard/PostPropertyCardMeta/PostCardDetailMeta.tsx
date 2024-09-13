import { FC } from "react";
import { IProduct } from "app/reducer/products/product";
import { FaBath, FaFirstOrderAlt } from "react-icons/fa";
import {
	Apps,
	Cancel,
	Fastfood,
	FoodBankOutlined,
	ForkLeftRounded,
	Kitchen,
	KitchenOutlined,
	PhotoSizeSelectSmallTwoTone,
	ToysTwoTone,
} from "@mui/icons-material";
import {
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_RESERVATION_KEY,
} from "containers/PageDashboard/Posts/DashboardSubmitPost";
import ItemChecked from "./ItemCheck";
import { CheckCircleIcon, HomeIcon } from "@heroicons/react/solid";
import { Tooltip } from "@mui/material";
import { ProductcategoryUUID } from "data/categories_uuid";

export interface PostCardDetailMetaProps {
	className?: string;
	meta: IProduct;
	hiddenAvatar?: boolean;
	size?: "large" | "normal";
}

const PostCardDetailMeta: FC<PostCardDetailMetaProps> = ({
	className = "leading-none",
	meta,
	hiddenAvatar = false,
	size = "normal",
}) => {
	const iconSize: number = 18;
	const { type, home_type, area, area_count, area_unit, bathrooms, kitchens } = meta;

	const getAreaUnit = (): string => {
		return area_unit ? area_unit : " m²";
	};

	const LocationMeta = () => {
		if (type === PRODUCT_TYPE[0]) {
			return (
				<div>
					<div className="grid grid-cols-3 gap-6">
						{/* Superficie */}
						{area && area != 0 ? (
							<div className="flex items-center justify-center" title="Superficie">
								{/* <Tooltip title="Superficie"> */}
								<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
								{`${area} / ${getAreaUnit()}`}
								{/* {`${area} / m²`} */}
								{/* </Tooltip> */}
							</div>
						) : null}

						{bathrooms && (
							<div className="flex items-center justify-center">
								<FaBath size={iconSize} className="mb-1 mr-1" />
								{bathrooms}
							</div>
						)}

						{kitchens && (
							<Tooltip title="Cuisine">
								<div className="flex items-center justify-center">
									{/* <Kitchen className="mb-1 mr-1" /> */}
									<Fastfood className="mb-1 mr-1" />
									{kitchens}
								</div>
							</Tooltip>
						)}
					</div>

					<div className="grid grid-cols-3 gap-6 mt-3">
						{/* SECURITY */}
						{meta.security && meta.security == "WITH_GUARD" ? (
							<ItemChecked
								name="Avec virgile"
								condition={meta.security == "WITH_GUARD"}
								className="justify-self-start"
							/>
						) : null}

						{/* ACCESSIBILITY */}
						{meta.accessibility && meta.accessibility == "NOT_FAR_FROM_THE_TAR" ? (
							<ItemChecked
								name="Accès facile"
								condition={meta.accessibility == "NOT_FAR_FROM_THE_TAR"}
								className="justify-self-start"
							/>
						) : null}

						{/* PURCHASE_POWER */}
						{false &&
						meta.purchase_power &&
						meta.purchase_power == "NOT_FAR_FROM_THE_TAR" ? (
							<ItemChecked
								name="Accès facile"
								condition={meta.purchase_power == "NOT_FAR_FROM_THE_TAR"}
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
				<div className="grid grid-cols-2 gap-0 mt-3">
					{/* JACUZZI */}
					{meta.jacuzzi && (
						<ItemChecked
							name="Jacuzzi"
							condition={meta.jacuzzi}
							className="justify-self-start"
						/>
					)}

					{/* BATH */}
					{meta.bath && <ItemChecked name="Baignoire" condition={meta.bath} />}

					{/* WIFI */}
					{meta.WiFi && <ItemChecked name="WIFI" condition={meta.WiFi} />}

					{/* PICINE */}
					{meta.pool && <ItemChecked name="Piscine" condition={meta.pool} />}

					{/* CLIMATISATION */}
					{meta.air_conditioning && (
						<ItemChecked name="Climatisation" condition={meta.air_conditioning} />
					)}
				</div>
			</>
		);
	};

	const VenteMeta = () => {
		if (type !== PRODUCT_TYPE[TYPE_BIEN_EN_VENTE_KEY]) return null;

		return (
			<>
				{/* {home_type === ProductcategoryUUID.MAISON.key && <LocationMeta />} */}

				<div className="grid grid-cols-2 gap-0 mt-3">
					{area && area > 0 && (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
							{`${area} / ${getAreaUnit()}`}
						</div>
					)}

					{area_count && (
						<div className="flex items-center justify-center mr-2" title="Superficie">
							<Apps width={iconSize} className="mb-1 mr-2" />
							{`${area_count} pèce${area_count > 1 ? "s" : ""}`}
						</div>
					)}

					{/* ACD */}
					{meta.acd && (
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
					)}
				</div>
			</>
		);
	};

	if (!type) return null;

	return (
		<>
			{/* <hr className="border-b border-neutral-200 dark:border-neutral-700 my-4" /> */}

			<div
				className={`nc-PostCardMetaV2 inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
					size === "normal" ? "text-xs" : "text-sm"
				} ${className}`}
				data-nc-id="PostCardMetaV2"
			>
				<LocationMeta />
				<ReservationMeta />
				<VenteMeta />
			</div>
		</>
	);
};

export default PostCardDetailMeta;
