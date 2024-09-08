import React, { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { VIEW_ADMIN_POST_CATEGORY } from "containers/PageDashboard/DashboardPostCategories";
import { IUserRequest } from "app/reducer/userRequest/userRequest";
import Button from "components/Button/Button";
import { EyeIcon } from "@heroicons/react/solid";
import { FaEye } from "react-icons/fa";
import UserRequestDetail from "./UserRequestDetail";

export interface ColumnTable {
	id: "id" | "name" | "location" | "area" | "message" | "other" | "actions";
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

export interface UserRequestTableProps {
	rows: IUserRequest[];
}

const UserRequestTable: FC<UserRequestTableProps> = ({ rows }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [rowSelected, setRowSelected]: any = React.useState(null);
	const [open, setopen] = useState(false);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const columns: ColumnTable[] = [
		{ id: "id", label: "id", minWidth: 100 },
		{ id: "name", label: "Libellé", minWidth: 100 },
		{ id: "location", label: "Lieu", minWidth: 100 },
		{ id: "area", label: "Sufarce", minWidth: 100 },
		{ id: "message", label: "MEssage", minWidth: 100 },
		{ id: "other", label: "Autre", minWidth: 100 },
		{ id: "actions", label: "Actions" },
	];

	if (!columns && !rows) {
		return null;
	}

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
									email,
									message,
									others,
									is_read,
									reply,
									location,
									phone,
									area,
								} = row;
								return (
									<React.Fragment key={id}>
										<TableRow hover role="checkbox" tabIndex={-1} key={id}>
											<TableCell>{id}</TableCell>
											<TableCell>
												<strong>{name} </strong> <br />
												Email : {email} <br />
												Téléphone : {phone} <br />
											</TableCell>{" "}
											<TableCell>{location}</TableCell>
											<TableCell>{area}</TableCell>
											<TableCell> {message}</TableCell>
											<TableCell> {others}</TableCell>
											<TableCell>
												<Button
													onClick={() => {
														setRowSelected(row);
														setopen(true);
													}}
												>
													<EyeIcon
														color="primary"
														height={25}
														width={25}
														className="cursor-pointer text-primary-700 "
													/>
												</Button>
											</TableCell>
										</TableRow>
									</React.Fragment>
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
			<UserRequestDetail open={open} handleClose={() => setopen(false)} row={rowSelected} />
		</Paper>
	);
};

export default UserRequestTable;
