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
import { useHistory } from "react-router-dom";
import { route } from "routers/route";
import ProductTableAction from "./ProductTableAction";
import ConfirmDialog from "components/Dialog/ConfirmDialog";

export interface ColumnProductTable {
	id: "id" | "title" | "excerpt" | "content" | "actions" | "type" | "categorie" | "status";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

export interface ProductTableProps {
	// columns: readonly ColumnProductTable[];
	rows: IProperty[];
}

const ProductTable: FC<ProductTableProps> = ({ rows }) => {
	const history = useHistory();
	const [openDelete, setOpenDelete] = React.useState(false);
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

	const columns: ColumnProductTable[] = [
		// { id: "id", label: "ID", minWidth: 170 },
		{ id: "title", label: "Title", minWidth: 100 },
		// { id: "excerpt", label: "Excerpt", minWidth: 100 },
		// { id: "content", label: "Content", minWidth: 100 },
		{ id: "type", label: "Type de bien", minWidth: 100 },
		{ id: "categorie", label: "Catégorie", minWidth: 100 },
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
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead className="bg-gray-500">
						<TableRow>
							{columns.map((column) => (
								<TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
									{column.label}
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
										<div className="flex justify-start items-center p-2 cursor-pointer ">
											<div className="post-image-container mr-2" style={{ width: 70, height: 70 }}>
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
											</div>
										</div>
									</TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{getStatus(status as STATUS_TEXT)}</TableCell>
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
