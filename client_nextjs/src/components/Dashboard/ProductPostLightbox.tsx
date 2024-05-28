import React, { useState } from "react";
import { Dialog, DialogContent, IconButton, Box } from "@mui/material";
import { Close as CloseIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { useBoolean } from "react-use";

interface ProductPostLightboxProps {
	previewUrls: string[];
	onDelete: (index: number) => void;
}

const ProductPostLightbox: React.FC<ProductPostLightboxProps> = ({ previewUrls, onDelete }) => {
	const [open, setOpen] = useBoolean(false);
	const [currentImage, setCurrentImage] = useState<string | null>(null);

	const handleOpen = (url: string) => {
		setCurrentImage(url);
		setOpen(true);
	};

	const handleClose = () => {
		setCurrentImage(null);
		setOpen(false);
	};

	return (
		<div className="flex flex-wrap mt-4">
			{previewUrls.map((url: string, index: number) => (
				<div
					key={index}
					style={{ width: "200px", height: "200px", marginRight: "10px", position: "relative" }}
					onMouseEnter={(e) => e.currentTarget.classList.add("hover")}
					onMouseLeave={(e) => e.currentTarget.classList.remove("hover")}
				>
					<img src={url} alt={`Preview ${index}`} style={{ width: "100%", height: "auto" }} className="object-cover m-2" />
					<Box
						className="hover-buttons"
						sx={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%",
							display: "none",
							justifyContent: "center",
							alignItems: "center",
							backgroundColor: "rgba(0, 0, 0, 0.5)",
						}}
					>
						<IconButton onClick={() => handleOpen(url)} sx={{ color: "white" }}>
							<VisibilityIcon />
						</IconButton>
						<IconButton onClick={() => onDelete(index)} sx={{ color: "white" }}>
							<DeleteIcon />
						</IconButton>
					</Box>
				</div>
			))}
			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<Box sx={{ position: "relative" }}>
						<IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0, color: "white" }}>
							<CloseIcon />
						</IconButton>
						{currentImage && <img src={currentImage} alt="Current Preview" style={{ width: "100%", height: "auto" }} />}
					</Box>
				</DialogContent>
			</Dialog>
		</div>
	);
};

export default ProductPostLightbox;
