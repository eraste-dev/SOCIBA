import { TableCell, TableRow } from "@mui/material";
import { IProduct, IProductImage } from "app/reducer/products/product";
import { FC, useState } from "react";
import ChangeProductType, { STATUS_LABEL } from "./Products/ChangeProductType";
import { LIST_STATUS, STATUS_TEXT } from "./ProductTable";
import { PERIODICITY_LIST } from "containers/PageDashboard/Posts/DashboardSubmitPost";
import { _f } from "utils/money-format";
import { isAdmin } from "app/axios/actions/api.action";
import { AuthAction } from "app/reducer/auth/auth";
import { useSelector } from "react-redux";
import ProductTableAction from "./ProductTableAction";
import PostFeaturedMedia from "components/PostCard/PostFeaturedMedia/PostFeaturedMedia";
import CategoryPropertyBadgeOne from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeOne";
import CategoryPropertyBadgeTwo from "components/CategoryPropertyBadgeList/CategoryPropertyBadgeTwo";
import { FaMapMarkerAlt } from "react-icons/fa";
import Card11Price from "components/Cards/Card11/Card11Price";
import PostPropertyCardMetaV2 from "components/PostCard/PostPropertyCardMeta/PostCardMetaV2";
import PostCardDetailMeta from "components/PostCard/PostPropertyCardMeta/PostCardDetailMeta";
import Card11 from "components/Cards/Card11/Card11";

interface ProductTableRowProps {
	row: IProduct;
	getFeatureImage: (images: IProductImage[]) => string;
	getStatus: (status: STATUS_TEXT) => JSX.Element;
	handleChangeStatus: (row: IProduct, status: STATUS_LABEL) => void;
	setOpenDelete: (open: boolean) => void;
	setRowSelected: (row: any) => void;
}

const ProductTableRow: FC<ProductTableRowProps> = ({
	row,
	getFeatureImage,
	getStatus,
	handleChangeStatus,
	setOpenDelete,
	setRowSelected,
}) => {
	const [isHover, setIsHover] = useState(false);
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

	return (
		<>
			<TableRow hover role="checkbox" tabIndex={-1}>
				<TableCell>
					<div className="flex justify-start items-center p-2 cursor-pointer  ">
						<div
							className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]`}
							data-nc-id="Card11"
							onMouseEnter={() => setIsHover(true)}
							onMouseLeave={() => setIsHover(false)}
							//
						>
							<div
								className="flex items-center post-image-container mr-2"
								style={{
									width: 200,
									height: 150,
								}}
							>
								<PostFeaturedMedia post={row} isHover={isHover} />
							</div>
						</div>

						<div className="px-5">
							<div className="relative " style={{ maxWidth: 150 }}>
								<span className="inset-x-3 z-10 mb-5">
									<CategoryPropertyBadgeOne category={category} />
								</span>
							</div>

							<span className="text-xs text-neutral-500">{updated_at}</span>
							{false && <h4 className="text-xl">{title}</h4>}

							<div className="grid grid-cols-6">
								<div className="grid grid-cols-subgrid lg:col-span-2 col-span-6">
									<CategoryPropertyBadgeTwo
										className="text-xs md:text-md"
										item={row}
									/>
									<p className="mt-2 text-xs font-semibold text-secondary-900 dark:text-neutral-100 ">
										{false && (
											<span className="text-xs text-neutral-500 flex justify-items-center ">
												<FaMapMarkerAlt className="mr-1" />
											</span>
										)}
										Commune: {location.name} <br />
										Quatier : {location_description}
										{/* , {location.city?.name} */}
									</p>
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
				</TableCell>

				<TableCell>
					<div className="flex">
						<span className="mr- 2">
							<Card11Price item={row} />
						</span>
						<span>
							{PERIODICITY_LIST.find((p) => p.id === periodicity)?.name &&
								"/ " + PERIODICITY_LIST.find((p) => p.id === periodicity)?.name}
						</span>
					</div>
				</TableCell>

				<TableCell>
					<div className="flex">
						{category && <span className="mr- 2">{category.name}</span>}
					</div>
				</TableCell>

				<TableCell>
					{user && isAdmin(user) ? (
						<ChangeProductType
							lists={LIST_STATUS}
							selectedIndex={LIST_STATUS.findIndex(
								(item) => item.name === row.status
							)}
							handleChange={(row: IProduct, status: STATUS_LABEL) =>
								handleChangeStatus(row, status)
							}
							row={row}
						/>
					) : (
						getStatus(status as STATUS_TEXT)
					)}
				</TableCell>

				<TableCell>
					<ProductTableAction
						row={row}
						handleOpenDelete={() => {
							setOpenDelete(true);
							setRowSelected(row);
						}}
					/>
				</TableCell>
			</TableRow>
		</>
	);
};

export default ProductTableRow;
