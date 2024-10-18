import { Pagination } from "@mui/material";
import React, { FC, SyntheticEvent, useState } from "react";

export interface TableDynamicProps {
	headers: string[];
	data: any[];
	rowsPerPage?: number;
	renderActions: (row: any) => React.ReactNode;
}

const TableDynamic: FC<TableDynamicProps> = ({ headers, data, renderActions, rowsPerPage = 5 }) => {
	const [currentPage, setCurrentPage] = useState(1);

	const handleChangePage = (event: any, newPage: number) => {
		setCurrentPage(newPage);
	};

	const indexOfLastRow = currentPage * rowsPerPage;
	const indexOfFirstRow = indexOfLastRow - rowsPerPage;
	const currentData = data.slice(indexOfFirstRow, indexOfLastRow);

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-white dark:bg-neutral-800 border border-gray-200">
				<thead>
					<tr>
						{headers.map((header, index) => (
							<th
								key={index}
								className="px-4 py-2 bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-white text-left text-sm font-semibold"
							>
								{header}
							</th>
						))}
						{renderActions != undefined && (
							<th className="px-4 py-2 bg-gray-100 text-gray-800 dark:bg-neutral-800 dark:text-white text-left text-sm font-semibold">
								Actions
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{currentData.map((row, rowIndex) => (
						<tr key={rowIndex} className="border-t border-gray-200">
							{headers.map((header, colIndex) => (
								<td key={colIndex} className="px-4 py-2 text-gray-600 text-sm">
									{row[header]}
								</td>
							))}
							{renderActions && <td className="px-4 py-2">{renderActions(row)}</td>}
						</tr>
					))}
				</tbody>
			</table>

			{/* Pagination */}
			<div className="flex justify-center mt-4">
				<Pagination
					count={Math.ceil(data.length / rowsPerPage)}
					page={currentPage}
					onChange={handleChangePage}
					color="primary"
				/>
			</div>
		</div>
	);
};

export default TableDynamic;
