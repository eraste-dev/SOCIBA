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
import { deleteUser } from "app/axios/actions/api.users.action";
import { IUserRequest } from "app/reducer/userRequest/userRequest";

export interface UserRequestDetailProps {
	handleClose: () => void;
	open: boolean;
	row: IUserRequest;
}

const UserRequestDetail: FC<UserRequestDetailProps> = ({ open, handleClose, row }) => {
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

	// const dispatch = useAppDispatch();
	// const snackbar = useSnackbar();

	// const loading = useSelector(PropertyAction.loading);
	// const error = useSelector(PropertyAction.error);
	// const success = useSelector(PropertyAction.success);
	// const message = useSelector(PropertyAction.message);

	if (!row) {
		return <></>;
	}

	return (
		<>
			<Dialog
				fullScreen={fullScreen}
				open={open}
				onClose={handleClose}
				aria-labelledby="responsive-dialog-title"
			>
				<DialogTitle id="responsive-dialog-title">{"Détail de la demande"}</DialogTitle>

				<DialogContent>
					<DialogContentText>
						{false && (
							<p className="text-lg">
								<span className="font-bold">ID:</span> {row?.id}
							</p>
						)}
						<p className="text-lg">
							<span className="font-bold">Nom:</span> {row?.name}
						</p>
						<p className="text-lg">
							<span className="font-bold">Email:</span> {row?.email}
						</p>
						<p className="text-lg mb-5">
							<span className="font-bold">Message:</span>
							<p>{row?.message}</p>
						</p>
						<p className="text-lg mb-5">
							<span className="font-bold">Autres:</span>
							<p>{row?.others}</p>
						</p>
						<p className="text-lg">
							<span className="font-bold">Lu:</span> {row.is_read ? "Oui" : "Non"}
						</p>
						{false && (
							<p className="text-lg">
								<span className="font-bold">Adresse IP:</span> {row?.ip_address}
							</p>
						)}
						<p className="text-lg">
							<span className="font-bold">Téléphone:</span> {row?.phone}
						</p>
						<p className="text-lg">
							<span className="font-bold">Zone:</span> {row?.area}
						</p>
						<p className="text-lg">
							<span className="font-bold">Lieu:</span> {row?.location}
						</p>
						<p className="text-lg">
							<span className="font-bold">Date:</span> {row?.date}
						</p>
						<p className="text-lg">
							<span className="font-bold">Créé le:</span> {row?.created_at}
						</p>
						{false && (
							<p className="text-lg">
								<span className="font-bold">Modifié le:</span> {row?.updated_at}
							</p>
						)}
						{row && row?.reply && (
							<p className="text-lg">
								<span className="font-bold">Réponse:</span> {row?.reply}
							</p>
						)}
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button autoFocus onClick={handleClose} color="error">
						Fermer
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default UserRequestDetail;
