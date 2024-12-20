import { FC } from "react";
import { Box, IconButton } from "@mui/material";
import { Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";

export interface ProductPreviewImageItemProps {
	handleOpen: () => void;
	handleDelete: () => void;
	url: string;
	index: number;
}

const ProductPreviewImageItem: FC<ProductPreviewImageItemProps> = ({ index, url, handleOpen, handleDelete }) => {
	return (
		<div
			className="relative flex w-48 h-48 mr-2 overflow-hidden items-center hover:bg-gray-100 "
			onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
			onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
		>
			<img src={url} alt={`Preview ${index}`} className="object-cover w-full h-auto m-2" />
			<Box className="actions-lightbox  absolute inset-0 flex items-center opacity-0 justify-center bg-opacity-50 hover:flex hover:opacity-100 hover:bg-opacity-100">
				<IconButton onClick={handleOpen} className="text-blue-500">
					<VisibilityIcon color="primary" />
				</IconButton>
				<IconButton onClick={handleDelete} className="text-white">
					<DeleteIcon color="error" />
				</IconButton>
			</Box>
		</div>
	);
};

export default ProductPreviewImageItem;
