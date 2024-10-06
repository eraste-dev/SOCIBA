import { FC, useEffect } from "react";
import { IProduct, PropertyAction } from "app/reducer/products/product";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { deleteProduct, initProductState } from "app/axios/actions/api.action";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import EditSlider from "./EditSlider";
import { Slider, sliderAction } from "app/reducer/sliders/sliders";

export interface SliderEditDialogProps {
	handleClose: () => void;
	// handleClickOpen: () => void;
	open: boolean;
	row: Slider | null;
}

const SliderEditDialog: FC<SliderEditDialogProps> = ({ open, handleClose, row }) => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const snackbar = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const sliders = useAppSelector(sliderAction.data);
	const loading = useSelector(sliderAction.loading);
	const error = useSelector(sliderAction.error);
	const success = useSelector(sliderAction.success);
	const message = useSelector(sliderAction.message);

	const handleDelete = () => {
		if (row && row.id) {
			dispatch(deleteProduct(parseInt(row.id)));
		}
	};

	useEffect(() => {
		if (!loading && success && message) {
			snackbar.enqueueSnackbar(message, { variant: "success", autoHideDuration: 2500 });
			handleClose();
		}
	}, [success, loading, handleClose, message, snackbar]);

	useEffect(() => {
		if (!loading && error) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 2500 });
		}
	}, [error, loading, snackbar]);

	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				{false && (
					<DialogTitle id="responsive-dialog-title">{"Suppression annonce"}</DialogTitle>
				)}

				<DialogContent>
					<DialogContentText>
						<p className="mb-5">Ajouter une bannière</p>
						<EditSlider item={row} />
					</DialogContentText>
				</DialogContent>

				{false && (
					<DialogActions>
						<Button autoFocus onClick={handleClose} color="error">
							Non
						</Button>
						<Button onClick={handleDelete} autoFocus>
							Oui
						</Button>
					</DialogActions>
				)}
			</Dialog>
		</>
	);
};

export default SliderEditDialog;
