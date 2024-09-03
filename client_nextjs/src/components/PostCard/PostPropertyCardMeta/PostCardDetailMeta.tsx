import React, { FC } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import { IProduct } from "app/reducer/products/product";
import { FaBath } from "react-icons/fa";
import { Kitchen, PhotoSizeSelectSmallTwoTone } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { PRODUCT_TYPE } from "containers/PageDashboard/DashboardSubmitPost";

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
					<div className="flex items-center justify-center" title="Superficie">
						{/* <Tooltip title="Superficie"> */}
						<PhotoSizeSelectSmallTwoTone className="mb-1 mr-2" />
						{`${area} / m²`}
						{/* </Tooltip> */}
					</div>
					<div className="flex items-center justify-center">
						<FaBath size={iconSize} className="mb-1" />
						{bathrooms}
					</div>
					<div className="flex items-center justify-center">
						<Kitchen className="mb-1" />
						{kitchens}
					</div>
				</div>
			);
		}

		return null;
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
			</div>
		</>
	);
};

export default PostCardDetailMeta;
