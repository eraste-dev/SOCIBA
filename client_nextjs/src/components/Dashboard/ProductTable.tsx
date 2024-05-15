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
		{ id: "id", label: "ID", minWidth: 170 },
		{ id: "title", label: "Title", minWidth: 100 },
		{ id: "excerpt", label: "Excerpt", minWidth: 100 },
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
		switch (status) {
			case "BLOCKED":
				return "Blocqué";

			case "REJECTED":
				return "Refusé";

			case "DRAFT":
				return "Brouillon";

			case "PUBLISH":
				return "Publie";

			case "PENDING":
				return "En attente";

			default:
				return status;
		}
	};

	return (
		<Paper sx={{ width: "100%", overflow: "hidden" }}>
			<TableContainer sx={{ maxHeight: 440 }}>
				<Table stickyHeader aria-label="sticky table">
					<TableHead>
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
							const { id, title, description, category, status } = row;
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={id}>
									<TableCell>
										{/* align={column.align} */}
										{/* {column.format && typeof value === "number" ? column.format(value) : value} */}
										{id}
									</TableCell>
									<TableCell>{title}</TableCell>
									<TableCell>{description}</TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{category.name}</TableCell>
									<TableCell>{getStatus(status as STATUS_TEXT)}</TableCell>
									<TableCell> </TableCell>
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
		</Paper>
	);
};

export default ProductTable;
