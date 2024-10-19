import React, { FC, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { IProduct, IProductImage } from "app/reducer/products/product";
import { useHistory } from "react-router-dom";
import ConfirmDialog from "components/Dialog/ConfirmDialog";
import { useDispatch, useSelector } from "react-redux";
import { isAdmin, postProduct } from "app/axios/actions/api.action";
import { ListBoxItemType } from "components/NcListBox/NcListBox";
import ChangeProductType, { STATUS_LABEL } from "./Products/ChangeProductType";
import { _f } from "utils/money-format";
import { convertPayloadToFormData } from "containers/PageDashboard/Posts/posts.constantes";
import { AuthAction } from "app/reducer/auth/auth";
import ProductTableRow from "./PostTableRow";
import { mapIProductToProductRequest } from "containers/PageDashboard/Posts/posts.constantes";
import TableDynamic from "components/Table/TableDynamic";
import ProductCard13 from "./ProductCard13";
import ProductTableAction from "./ProductTableAction";

export interface ColumnProductTable {
	id: "post" | "actions" | "type" | "status";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

// "PUBLISH" | "DRAFT" | "DELETED" | "REJECTED" | "PENDING" | "BLOCKED" | null
export const LIST_STATUS: ListBoxItemType[] = [
	{ name: "PUBLISH" },
	{ name: "DRAFT" },
	// { name: "DELETED" },
	// { name: "REJECTED" },
	{ name: "PENDING" },
	{ name: "BLOCKED" },
];

export type STATUS_TEXT = "PENDING" | "BLOCKED" | "REJECTED" | "DRAFT" | "PUBLISH" | "PENDING";

export interface ProductTableProps {
	// columns: readonly ColumnProductTable[];
	rows: IProduct[];
}

const ProductTable: FC<ProductTableProps> = ({ rows }) => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [openDelete, setOpenDelete] = React.useState(false);
	const [rowSelected, setRowSelected]: any = React.useState(null);
	const user = useSelector(AuthAction.data)?.user;
	const [page, setPage] = React.useState(0);
	const [filterTableHeader, setFilterTableHeader] = React.useState<{
		status: STATUS_LABEL | null;
	}>({ status: null });
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [isHover, setIsHover] = useState(false);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const handleChangeStatus = (row: IProduct, status: STATUS_LABEL) => {
		const formData: FormData = convertPayloadToFormData(
			mapIProductToProductRequest({ ...row, status: status })
		);
		dispatch(postProduct(formData));
	};

	const handleChangeStatusInTableHeader = (status: STATUS_LABEL) => {
		setFilterTableHeader({ ...filterTableHeader, status: status });
	};

	const columns: ColumnProductTable[] = [
		{ id: "post", label: "Annonce", minWidth: 100 },
		// { id: "status", label: "Status", minWidth: 50 },
		// { id: "actions", label: "Actions" },
	];

	if (!columns && !rows) {
		return null;
	}

	const getStatus = (status: STATUS_TEXT): JSX.Element => {
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

	const getFeatureImage = (images: IProductImage[]) => {
		return images[0]?.image || "https://via.placeholder.com/150";
	};

	if (false) {
		return (
			<Paper sx={{ width: "100%", overflow: "hidden" }}>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableHead className="bg-gray-500">
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ maxWidth: column.minWidth }}
									>
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
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => (
									<ProductTableRow
										key={row.id}
										getFeatureImage={getFeatureImage}
										getStatus={getStatus}
										row={row}
										handleChangeStatus={handleChangeStatus}
										setOpenDelete={setOpenDelete}
										setRowSelected={setRowSelected}
									/>
								))}
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
				<ConfirmDialog
					handleClose={() => setOpenDelete(false)}
					open={openDelete}
					row={rowSelected}
				/>
			</Paper>
		);
	}

	const headers = ["Annonce", "Status"];

	const renderActions = (row: IProduct) => (
		<div className="flex space-x-2">
			<ProductTableAction
				row={row}
				handleOpenDelete={() => {
					setOpenDelete(true);
					setRowSelected(row);
				}}
			/>
		</div>
	);

	return (
		<div className="">
			<TableDynamic
				headers={columns.map((column) => column.label)}
				data={rows.map((row) => ({
					id: row.id,
					Annonce: <ProductCard13 isHover={isHover} setIsHover={setIsHover} row={row} />,
				}))}
				renderActions={renderActions}
			/>
		</div>
	);
};

export default ProductTable;
