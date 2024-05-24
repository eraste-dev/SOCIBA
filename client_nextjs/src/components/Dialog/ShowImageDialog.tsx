import { FC } from "react";
import { IProperty } from "app/reducer/products/propertiy";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "app/hooks";
import { Box, DialogActions, IconButton } from "@mui/material";
import { Close as CloseIcon, Visibility as VisibilityIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { FaArrowCircleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

export interface ShowImageDialogProps {
	handleClose: () => void;
	open: boolean;
	currentImage: string;
}

const ShowImageDialog: FC<ShowImageDialogProps> = ({ open, handleClose, currentImage }) => {
	const theme = useTheme();
	const dispatch = useAppDispatch();

	return (
		<>
			<Dialog open={open} onClose={handleClose}>
				<DialogContent>
					<Box sx={{ position: "relative" }}>
						<IconButton onClick={handleClose} sx={{ position: "absolute", top: 0, right: 0, color: "white" }}>
							<CloseIcon />
						</IconButton>
						{currentImage && <img src={currentImage} alt="Current Preview" style={{ width: "100%", height: "auto" }} />}
					</Box>
				</DialogContent>
				{false && (
					<DialogActions>
						<div className="flex justify-between w-100 bg-neutral-100">
							<button>
								<FaArrowLeft size={44} color="black" />
							</button>
							<button>
								<FaArrowRight size={44} color="black" />
							</button>
						</div>
					</DialogActions>
				)}
			</Dialog>
		</>
	);
};

export default ShowImageDialog;
