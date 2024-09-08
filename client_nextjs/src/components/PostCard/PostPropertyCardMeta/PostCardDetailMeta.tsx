import { FC } from "react";
import { IProduct } from "app/reducer/products/product";
import { FaBath } from "react-icons/fa";
import { Cancel, Kitchen, PhotoSizeSelectSmallTwoTone } from "@mui/icons-material";
import {
	PRODUCT_TYPE,
	TYPE_BIEN_EN_VENTE_KEY,
	TYPE_RESERVATION_KEY,
} from "containers/PageDashboard/Posts/DashboardSubmitPost";
import ItemChecked from "./ItemCheck";
import { CheckCircleIcon } from "@heroicons/react/solid";

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
	const { type, area, bathrooms, kitchens } = meta;

	const LocationMeta = () => {
		if (type === PRODUCT_TYPE[0]) {
			return (
				<div className="grid grid-cols-3 gap-6">
					{/* Superficie */}
					{area && (
						<div className="flex items-center justify-center" title="Superficie">
							{/* <Tooltip title="Superficie"> */}
							<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
							{`${area} / m²`}
							{/* </Tooltip> */}
						</div>
					)}
					{bathrooms && (
						<div className="flex items-center justify-center">
							<FaBath size={iconSize} className="mb-1" />
							{bathrooms}
						</div>
					)}
					{kitchens && (
						<div className="flex items-center justify-center">
							<Kitchen className="mb-1" />
							{kitchens}
						</div>
					)}
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
				<div className="grid grid-cols-2 gap-0 mt-3">
					<div className="flex items-center justify-center mr-2" title="Superficie">
						{/* <Tooltip title="Superficie"> */}
						<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
						{`${area} / m²`}
						{/* </Tooltip> */}
					</div>

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
