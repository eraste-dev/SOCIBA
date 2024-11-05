import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IProduct } from "app/reducer/products/product";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import UserTableAction from "./UserTableAction";
import ConfirmDialog from "components/Dialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { initProductState, updateUser } from "app/axios/actions/api.action";
import { IUser, IuserStatus } from "app/reducer/auth/auth";
import ChangeUserType from "./ChangeUserType";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import UpdateUserDialog from "./UpdateUserDialog";
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";
import ConfirmDialogUser from "components/Dialog/ConfirmDialogUser";
import { UpdateUserRequest } from "app/axios/api.type";

export interface ColumnUserManagementTable {
	id:
		| "id"
		| "name"
		| "status"
		| "phone"
		| "phone_whatsapp"
		| "type"
		| "count_products"
		| "actions";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export const LIST_TYPE: ListBoxItemType[] = [{ name: "ADMIN" }, { name: "USER" }];

// "ACTIVE" | "INACTIVE" | "DELETED" | "REJECTED" | "PENDING" | "BLOCKED"
export const LIST_STATUS: ListBoxItemType[] = [
	{ name: "ACTIVE" },
	{ name: "INACTIVE" },
	{ name: "DELETED" },
	{ name: "REJECTED" },
	{ name: "PENDING" },
	{ name: "BLOCKED" },
];

export interface UserManagementTableProps {
	rows: IUser[];
	handleChangeView: (value: VIEW_ADMIN_USER, user: IUser) => void;
}

const UserManagementTable: FC<UserManagementTableProps> = ({ rows, handleChangeView }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [openDelete, setOpenDelete] = React.useState(false);
	const [openUpdate, setOpenUpdate] = React.useState(false);
	const [rowSelected, setRowSelected]: any = React.useState(null);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns: ColumnUserManagementTable[] = [
		{ id: "id", label: "id", minWidth: 100 },
		{ id: "name", label: "Nom & Prénoms", minWidth: 100 },
		{ id: "count_products", label: "Annonce(s)", minWidth: 100 },
		{ id: "phone", label: "Contacts", minWidth: 100 },
		{ id: "status", label: "Status", minWidth: 100 },
		{ id: "type", label: "PROFIL", minWidth: 100 },
		{ id: "actions", label: "Actions" },
	];

	if (!columns && !rows) {
		return null;
	}

	type TYPE_TEXT = "ADMIN" | "USER";
	const getType = (status: TYPE_TEXT) => {
		const className: string = "text-white p-1 px-3 rounded-lg";
		switch (status) {
			case "ADMIN":
				return <span className={`${className} bg-green-500`}>ADMIN</span>;

			default:
				return <span className={`${className} bg-blue-500`}>Utilisateur</span>;
		}
	};

	const handleChangeType = (row: IUser, e: string) => {
		// dispatch(updateUser())
	};

	/**
	 * Update the status of the user
	 * @param row the user data
	 * @param e the new status
	 */
	const handleChangeStatus = (row: IUser, e: string) => {
		const formData = new FormData();
		const form : UpdateUserRequest = {
			id: row.id,
			status: e as IuserStatus,
		}
		if (row && row.id) {
			formData.append("id", `${row.id}`);
			formData.append("status", e as IuserStatus);
			dispatch(updateUser(form));
		}
	};

	type STATUS_TEXT = "PENDING" | "INACTIVE" | "BLOCKED" | "ACTIVE" | "DELETED";
	const getStatus = (status: STATUS_TEXT) => {
		const className: string = "text-white p-1 px-3 rounded-lg";

		switch (status) {
			case "BLOCKED":
				return "Blocqué";

			case "ACTIVE":
				return "Actif";

			case "PENDING":
				return "En attente";

			case "DELETED":
			default:
				return "Supprimé(e)";
		}
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ minHeight: 640 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead className="bg-gray-500">
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align}
									style={{ minWidth: column.minWidth }}
								>
									{column.label}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((row) => {
								const {
									id,
									name,
									last_name,
									phone,
									phone_whatsapp,
									type,
									status,
									count_products,
								} = row;
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={id}>
										<TableCell>{id}</TableCell>
										<TableCell>
											{name} {last_name}
										</TableCell>
										<TableCell>{count_products}</TableCell>
										<TableCell>
											<a
												href={`tel:${phone}`}
												target="_blank"
												rel="noreferrer"
											>
												{phone}
											</a>
											,{phone_whatsapp && <br />}
											{phone_whatsapp && (
												<a
													href={`https://wa.me/${phone_whatsapp}`}
													target="_blank"
													rel="noreferrer"
												>
													{phone_whatsapp} (Whatsapp)
												</a>
											)}
										</TableCell>
										<TableCell>
											{/* {getType(type as TYPE_TEXT)} */}
											<ChangeUserType
												lists={LIST_TYPE}
												selectedIndex={LIST_TYPE.findIndex(
													(item) => item.name === type
												)}
												handleChange={handleChangeType}
												row={row}
											/>
										</TableCell>
										<TableCell>
											{/* {getStatus(status as STATUS_TEXT)} */}
											<ChangeUserType
												lists={LIST_STATUS.filter(
													(item) =>
														item.name == "ACTIVE" ||
														item.name == "INACTIVE"
												).map((item) => {
													return {
														...item,
														name: getStatus(item.name as STATUS_TEXT),
													};
												})}
												selectedIndex={LIST_STATUS.findIndex(
													(item) => item.name === status
												)}
												handleChange={handleChangeStatus}
												row={row}
											/>
										</TableCell>
										<TableCell>
											<UserTableAction
												row={row}
												handleChangeView={(view: VIEW_ADMIN_USER) =>
													handleChangeView(view, row)
												}
												handleOpenUpdate={() => {
													setOpenUpdate(true);
													setRowSelected(row);
												}}
												handleOpenDelete={() => {
													setOpenDelete(true);
													setRowSelected(row);
												}}
											/>
										</TableCell>
									</TableRow>
								);
							})}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[10, 25, 100]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
			<ConfirmDialogUser
				handleClose={() => setOpenDelete(false)}
				open={openDelete}
				row={rowSelected}
			/>
			<UpdateUserDialog
				handleClose={() => setOpenUpdate(false)}
				open={openUpdate}
				row={rowSelected}
			/>
		</Paper>
	);
};

export default UserManagementTable;
