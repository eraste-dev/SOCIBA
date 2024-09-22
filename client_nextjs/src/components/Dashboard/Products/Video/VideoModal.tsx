import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { createPortal } from "react-dom";
import VideoViewer from "./VideoViewer";

interface VideoModalProps {
	video: string;
	onClose: () => void;
}

const VideoModal: React.FC<VideoModalProps> = ({ video, onClose }) => {
	return createPortal(
		<Modal open={true} onClose={onClose}>
			<>
				<VideoViewer videoUrl={video} />
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
						<video src={video} className="w-full h-auto" controls />
					</Box>
				)}
			</>
		</Modal>,
		document.body
	);
};

export default VideoModal;
