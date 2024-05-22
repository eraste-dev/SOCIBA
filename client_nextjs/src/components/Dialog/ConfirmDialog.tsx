import { FC, useEffect, useState } from "react";
import { IProperty, PropertyAction } from "app/reducer/products/propertiy";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useAppDispatch } from "app/hooks";
import { deleteProduct } from "app/axios/api.action";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";

export interface ConfirmDialogProps {
	handleClose: () => void;
	// handleClickOpen: () => void;
	open: boolean;
	row: IProperty;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ open, handleClose, row }) => {
	const theme = useTheme();
	const snackbar = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
	const dispatch = useAppDispatch();

	const loading = useSelector(PropertyAction.loading);
	const error = useSelector(PropertyAction.error);
	const success = useSelector(PropertyAction.success);
	const message = useSelector(PropertyAction.message);

	const handleDelete = () => {
		dispatch(deleteProduct(row.id));
	};

	useEffect(() => {
		if (!loading && success && message) {
			snackbar.enqueueSnackbar(message, { variant: "success" });
			handleClose();
		}
	}, [success, loading, handleClose, message, snackbar]);

	useEffect(() => {
		if (!loading && error) {
			snackbar.enqueueSnackbar(error, { variant: "error" });
		}
	}, [error, loading, snackbar]);

	return (
		<>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
				<DialogTitle id="responsive-dialog-title">
					<h4 className="">{"Suppression annonce"}</h4>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>Voulez vous supprimer l'annonce?</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button autoFocus onClick={handleClose} color="error">
						Non
					</Button>
					<Button onClick={handleDelete} autoFocus>
						Oui
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default ConfirmDialog;
