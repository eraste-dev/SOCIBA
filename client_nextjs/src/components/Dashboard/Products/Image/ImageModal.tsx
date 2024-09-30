import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createPortal } from "react-dom";
import ImageViewer from "./ImageViwer";

interface ImageModalProps {
	image: string;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
	return createPortal(
		<Modal open={true} onClose={onClose}>
			<>
				<ImageViewer imageUrl={image} />
				{false && (
					<Box
						sx={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							bgcolor: "background.paper",
							boxShadow: 24,
							p: 0,
							width: "auto",
							height: "auto",
							display: "flex",
							justifyContent: "center",
							alignContent: "center",
						}}
					>
						<img src={image} alt="modal-img" className="w-full h-auto" />
					</Box>
				)}
			</>
		</Modal>,
		document.body
	);
};

export default ImageModal;
