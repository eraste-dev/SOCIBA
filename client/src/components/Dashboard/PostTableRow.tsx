import { TableCell, TableRow } from "@mui/material";
import { IProduct, IProductImage } from "app/reducer/products/product";
import { FC, useState } from "react";
import ChangeProductType, { STATUS_LABEL } from "./Products/ChangeProductType";
import { LIST_STATUS, STATUS_TEXT } from "./ProductTable";
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
import ProductCard13 from "./ProductCard13";

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
					<ProductCard13 isHover={isHover} setIsHover={setIsHover} row={row} />
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
