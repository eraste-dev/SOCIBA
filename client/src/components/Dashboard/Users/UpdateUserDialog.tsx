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
import { useAppDispatch } from "app/hooks";
import { deleteProduct, initProductState } from "app/axios/actions/api.action";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import FormEditUser from "containers/PageDashboard/FormEditUser";
import { IUser } from "app/reducer/auth/auth";

export interface UpdateUserDialogProps {
	handleClose: () => void;
	// handleClickOpen: () => void;
	open: boolean;
	row: IUser;
}

const UpdateUserDialog: FC<UpdateUserDialogProps> = ({ open, handleClose, row }) => {
	const theme = useTheme();
	const dispatch = useAppDispatch();
	const snackbar = useSnackbar();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	const loading = useSelector(PropertyAction.loading);
	const error = useSelector(PropertyAction.error);
	const errorArray = useSelector(PropertyAction.errors);
	const success = useSelector(PropertyAction.success);
	const message = useSelector(PropertyAction.message);

	const handleDelete = () => {
		// dispatch(deleteProduct(row.id));
	};

	useEffect(() => {
		if (!loading && success && message) {
			snackbar.enqueueSnackbar(message, { variant: "success", autoHideDuration: 2500 });
			handleClose();
			dispatch(initProductState());
		}
	}, [success, loading, handleClose, message, snackbar]);

	useEffect(() => {
		if (!loading && error) {
			snackbar.enqueueSnackbar(error, { variant: "error", autoHideDuration: 2500 });
		}
	}, [error, loading, snackbar]);

	return (
		<>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
				<DialogActions>
					<div className="flex justify-between">
						<Button autoFocus onClick={handleClose} color="error">
							Fermer
						</Button>
					</div>
					{/* <Button onClick={handleDelete} autoFocus>
						Mettre à jour
					</Button> */}
				</DialogActions>

				{/* <DialogTitle id="responsive-dialog-title">{"Mettre à jour l'utilisateur"}</DialogTitle> */}

				<DialogContent>
					<DialogContentText>
						<FormEditUser user={row} error={error} errorArray={success} success={success} loading={loading} />
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default UpdateUserDialog;
