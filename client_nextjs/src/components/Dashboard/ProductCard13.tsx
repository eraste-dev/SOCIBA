import { isAdmin, postProduct } from "app/axios/actions/api.action";
import { IProduct } from "app/reducer/products/product";
import Card11Price from "components/Cards/Card11/Card11Price";
import CategoryPropertyBadgeOne from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeOne";
import CategoryPropertyBadgeTwo from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeTwo";
import PostFeaturedMedia from "components/PostCard/PostFeaturedMedia/PostFeaturedMedia";
import PostCardDetailMeta from "components/PostCard/PostPropertyCardMeta/PostCardDetailMeta";
import PostPropertyCardMetaV2 from "components/PostCard/PostPropertyCardMeta/PostCardMetaV2";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import ChangeProductType, { getStatuslabel, STATUS_LABEL } from "./Products/ChangeProductType";
import { LIST_STATUS, STATUS_TEXT } from "./ProductTable";
import {
	convertPayloadToFormData,
	mapIProductToProductRequest,
} from "containers/PageDashboard/Posts/posts.constantes";
import { useDispatch, useSelector } from "react-redux";
import { AuthAction } from "app/reducer/auth/auth";

export interface ProductCard13Props {
	setIsHover: (isHover: boolean) => void;
	row: IProduct;
	isHover: boolean;
}
export const ProductCard13 = ({ setIsHover, row, isHover }: ProductCard13Props) => {
	const dispatch = useDispatch();
	const user = useSelector(AuthAction.data)?.user;
	const {
		id,
		title,
		description,
		category,
		status,
		images,
		location,
		location_description,
		price,
		periodicity,
		updated_at,
	} = row;

	const handleChangeStatus = (row: IProduct, status: STATUS_LABEL) => {
		const formData: FormData = convertPayloadToFormData(
			mapIProductToProductRequest({ ...row, status: status })
		);
		dispatch(postProduct(formData));
	};

	return (
		<div className="grid grid-cols-2  items-center p-2 cursor-pointer  ">
			{/* sm:flex justify-start */}
			<div className="col-span-2 sm:col-span-1">
				<div
					className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]`}
					data-nc-id="Card11"
					onMouseEnter={() => setIsHover(true)}
					onMouseLeave={() => setIsHover(false)}
					//
				>
					<div className="flex items-center post-image-container mr-2">
						<div className="h-[300px] w-full">
							<PostFeaturedMedia post={row} isHover={isHover} />
						</div>
					</div>
				</div>
			</div>

			<div className="col-span-2 sm:col-span-1">
				<div className="w-full">
					<div className="flex justify-between">
						<div>
							<Card11Price item={row} />
						</div>

						<div className="relative " style={{ maxWidth: 150 }}>
							<span className="inset-x-3 z-10 mb-5">
								<CategoryPropertyBadgeOne category={category} />
							</span>
						</div>
					</div>

					<span className="text-xs text-neutral-500">{updated_at}</span>
					{false && <h4 className="text-xl">{title}</h4>}

					<div className="flex justify-between items-center">
						<CategoryPropertyBadgeTwo className="text-xs md:text-md" item={row} />
						<div className="mt-2 text-xs font-semibold text-secondary-900 dark:text-neutral-100 ">
							{false && (
								<span className="text-xs text-neutral-500 flex justify-items-center ">
									<FaMapMarkerAlt className="mr-1" />
								</span>
							)}
							Commune: {location.name} <br />
							Quatier : {location_description}
							{/* , {location.city?.name} */}
						</div>
					</div>

					<div>
						{row && <PostCardDetailMeta meta={row} />}

						{row && row.author && row.author.href && (
							<PostPropertyCardMetaV2 meta={row} />
						)}
					</div>
				</div>
			</div>

			<div className="col-span-2 sm:col-span-1">
				{user && isAdmin(user) ? (
					<ChangeProductType
						lists={LIST_STATUS}
						selectedIndex={LIST_STATUS.findIndex((item) => item.name === row.status)}
						handleChange={(row: IProduct, status: STATUS_LABEL) =>
							handleChangeStatus(row, status)
						}
						row={row}
					/>
				) : (
					getStatuslabel(status as STATUS_TEXT)
				)}
			</div>
		</div>
	);
};

export default ProductCard13;
