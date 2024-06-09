import React, { FC } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IProperty } from "app/reducer/products/propertiy";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link, useHistory } from "react-router-dom";
import { route } from "routers/route";
import ProductTableAction from "./ProductTableAction";
import ConfirmDialog from "components/Dialog/ConfirmDialog";
import { useDispatch } from "react-redux";
import { initProductState, postProduct, updateUser } from "app/axios/api.action";
import ChangeUserType from "./Users/ChangeUserType";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import ChangeProductType, { STATUS_LABEL } from "./Products/ChangeProductType";
import ChangeProductTypeTableHeader from "./Products/ChangeProductTypeTableHeader";

export interface ColumnProductTable {
	id: "id" | "title" | "excerpt" | "content" | "actions" | "type" | "status";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface ProductTableProps {
	// columns: readonly ColumnProductTable[];
	rows: IProperty[];
}

// "PUBLISH" | "DRAFT" | "DELETED" | "REJECTED" | "PENDING" | "BLOCKED" | null
export const LIST_STATUS: ListBoxItemType[] = [
	{ name: "PUBLISH" },
	{ name: "DRAFT" },
	{ name: "DELETED" },
	{ name: "REJECTED" },
	{ name: "PENDING" },
	{ name: "BLOCKED" },
];

const ProductTable: FC<ProductTableProps> = ({ rows }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [openDelete, setOpenDelete] = React.useState(false);
	const [rowSelected, setRowSelected]: any = React.useState(null);
	const [page, setPage] = React.useState(0);
	const [filterTableHeader, setFilterTableHeader] = React.useState<{ status: STATUS_LABEL | null }>({ status: null });
	const [rowsPerPage, setRowsPerPage] = React.useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleChangeStatus = (row: IProperty, status: STATUS_LABEL) => {
		dispatch(postProduct({ id: row.id, status: status }));
	};

	const handleChangeStatusInTableHeader = (status: STATUS_LABEL) => {
		setFilterTableHeader({ ...filterTableHeader, status: status });
	};

	const columns: ColumnProductTable[] = [
		// { id: "id", label: "ID", minWidth: 170 },
		{ id: "title", label: "Title", minWidth: 100 },
		// { id: "excerpt", label: "Excerpt", minWidth: 100 },
		// { id: "content", label: "Content", minWidth: 100 },
		{ id: "type", label: "Type de bien & Catégorie", minWidth: 100 },
		{ id: "status", label: "Status", minWidth: 100 },
		{ id: "actions", label: "Actions" },
	];

	if (!columns && !rows) {
		return null;
	}

	type STATUS_TEXT = "PENDING" | "BLOCKED" | "REJECTED" | "DRAFT" | "PUBLISH" | "PENDING";
	const getStatus = (status: STATUS_TEXT) => {
		const className: string = "text-white p-1 px-3 rounded-lg";
		switch (status) {
			case "BLOCKED":
				return <span className={`${className} bg-red-500`}>Blocqué</span>;

			case "REJECTED":
				return <span className={`${className} bg-red-500`}>Refusé</span>;

			case "DRAFT":
				return <span className={`${className} bg-yellow-500`}>Brouillon</span>;

			case "PUBLISH":
				return <span className={`${className} bg-green-500`}>Publie</span>;

			case "PENDING":
				return <span className={`${className} bg-blue-500`}>En attente</span>;

			default:
				return <span className={`${className} bg-red-500`}>status</span>;
		}
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
					<TableHead className="bg-gray-500">
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
									{column.id === "status" && (
										<>
											<br />
											{/* <ChangeProductTypeTableHeader
												lists={LIST_STATUS}
												selectedIndex={LIST_STATUS.findIndex((item) => item.name === filterTableHeader.status)}
												handleChange={(status: STATUS_LABEL) => handleChangeStatusInTableHeader(status)}
											/> */}
										</>
									)}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
							const { id, title, description, category, status, images, featured_image, location, location_description } = row;
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={id}>
									{/* align={column.align} */}
									{/* {column.format && typeof value === "number" ? column.format(value) : value} */}
									<TableCell>
										<div className="flex justify-start items-center p-2 cursor-pointer  ">
											<div className="post-image-container mr-2" style={{ width: 200, height: 200 }}>
												<img
													src={featured_image ? featured_image : "https://via.placeholder.com/150"}
													alt="image"
													style={{ width: "100%", height: "100%" }}
												/>
											</div>
											<div>
												<h4 className="text-xl">{title}</h4>
												<p>{description}</p>
												<p>{`${location_description}, ${location.name}, ${location.city && location.city.name}`}</p>

												<div className="m2-2">{getStatus(status as STATUS_TEXT)}</div>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<div className="flex">
											{category.parent && (
												<>
													<span className="mr- 2">{category.parent?.name}</span>
													{" , "}
												</>
											)}
											<span className="mr- 2">{category.name}</span>
										</div>
									</TableCell>

									<TableCell>
										<ChangeProductType
											lists={LIST_STATUS}
											selectedIndex={LIST_STATUS.findIndex((item) => item.name === row.status)}
											handleChange={(row: IProperty, status: STATUS_LABEL) => handleChangeStatus(row, status)}
											row={row}
										/>
									</TableCell>
									<TableCell>
										<ProductTableAction
											row={row}
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
			<ConfirmDialog handleClose={() => setOpenDelete(false)} open={openDelete} row={rowSelected} />
		</Paper>
	);
};

export default ProductTable;
