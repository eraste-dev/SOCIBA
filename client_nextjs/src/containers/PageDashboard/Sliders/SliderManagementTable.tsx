import React, { FC } from "react";
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
import { VIEW_ADMIN_USER } from "containers/PageDashboard/DashboardUsers";
import ConfirmDialogUser from "components/Dialog/ConfirmDialogUser";
import { IPropertyCategory } from "app/reducer/products/propertiy-category";
import { VIEW_ADMIN_POST_CATEGORY } from "containers/PageDashboard/DashboardPostCategories";
import { Slider } from "app/reducer/sliders/sliders";
import NcImage from "components/NcImage/NcImage";
import SlidersTableAction from "./SlidersTableAction";
import { VIEW_ADMIN_SLDIERS } from "./DashboardSliders";
import { deleteSliders } from "app/axios/actions/api.action";

export interface ColumnSliderTable {
	id: "id" | "image" | "actions";
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

export interface SliderManagementTableProps {
	rows: Slider[];
	// selected: Slider | null;
	// setSelected: (item: Slider | null) => void;
}

const SliderManagementTable: FC<SliderManagementTableProps> = ({ rows }) => {
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

	const columns: ColumnSliderTable[] = [
		{ id: "id", label: "id", minWidth: 100 },
		{ id: "image", label: "Image", minWidth: 100 },
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
								const { id, image } = row;
								return (
									<React.Fragment key={id}>
										<TableRow hover role="checkbox" tabIndex={-1} key={id}>
											<TableCell>{id}</TableCell>
											<TableCell>
												<NcImage src={image} />
											</TableCell>{" "}
											<TableCell>
												<SlidersTableAction
													row={row}
													handleOpenUpdate={() => {
														// setOpenUpdate(true);
														setRowSelected(row);
														// setSelected(row);
													}}
													handleOpenDelete={() => {
														setRowSelected(row);
														// setOpenDelete(true);
														dispatch(
															deleteSliders({ id: parseInt(row.id) })
														);
													}}
												/>
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
		</Paper>
	);
};

export default SliderManagementTable;
