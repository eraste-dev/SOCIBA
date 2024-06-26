import React, { useState, ChangeEvent } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createPortal } from "react-dom";

interface ImageModalProps {
	image: string;
	onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, onClose }) => {
	return createPortal(
		<Modal open={true} onClose={onClose}>
			<Box
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					bgcolor: "background.paper",
					boxShadow: 24,
					p: 4,
				}}
			>
				<img src={image} alt="modal-img" className="w-full h-auto" />
			</Box>
		</Modal>,
		document.body
	);
};

export default ImageModal;
